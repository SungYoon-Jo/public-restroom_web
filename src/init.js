import app from "./server";

const SERVERPORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${SERVERPORT} 🚀`);

const HTTPServer = app.listen(SERVERPORT, handleListening);

const { ReadlineParser } = require("@serialport/parser-readline");
const { SerialPort } = require("serialport");
const wsModule = require("ws");

const serialPort = new SerialPort({
  path: "COM4",
  baudRate: 19200,

  // path: "COM3",
  // baudRate: 9600,
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

const webSocketServer = new wsModule.Server({
  server: HTTPServer,
});

var arduData = {
  human: 0,
  tissue: 0,
};
webSocketServer.on("connection", (ws, request) => {
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
