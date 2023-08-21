import app from "./server";

const SERVERPORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${SERVERPORT} 🚀`);

const HTTPServer = app.listen(SERVERPORT, handleListening);

const { ReadlineParser } = require("@serialport/parser-readline");
const { SerialPort } = require("serialport");
const wsModule = require("ws");

const serialPort = new SerialPort({
  // path: "COM3",
  path: "COM4",
  baudRate: 19200,

  // baudRate: 9600,
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

const webSocketServer = new wsModule.Server({
  server: HTTPServer,
  // port: "4001",
});
// console.log(webSocketServer);

var arduData = {
  human: 0,
  tissue: 0,
};
webSocketServer.on("connection", (ws, request) => {
  console.log(ws);

  parser.on("data", (data) => {
    var dataToString = data.toString();

    var goodDat = parseString(dataToString);
    arduData.human = goodDat[0];
    arduData.tissue = goodDat[1];

    var sendData = `{
      human: ${arduData.human},
      tissue: ${arduData.tissue},
    }`;

    ws.send(sendData);
  });
  function parseString(data) {
    var resultList = [];
    var commaSplit = data.split(",");
    var human = commaSplit[0];
    resultList[0] = Number(human.split("<")[1]);
    resultList[1] = Number(commaSplit[1]);

    return resultList;
  }
});

// const express = require("express");
// const app = express();
// const http = require("http");
// const server = http.createServer(app);
// const socketIo = require("socket.io");
// const io = socketIo(server);

// io.on("connection", (socket) => {
//   console.log(`Socket connected ${socket.id}`);
//   socket.on("roomjoin", (userid) => {
//     console.log(userid);
//     // socket.join(userid);
//   });
//   socket.on("message", (obj) => {
//     // 클라이언트에서 message라는 이름의 이벤트를 받았을 경우 호출
//     console.log("server received data");
//     console.log(obj);
//   });
//   socket.on("disconnect", () => {
//     // 클라이언트의 연결이 끊어졌을 때 호출
//     console.log(`Socket disconnected : ${socket.id}`);
//   });
// });

// server.listen(4000, function () {
//   console.log(`start! express server on port ${4000}`);
// });
