import app from "../server";

const SERVERPORT = process.env.PORT || 4500;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${SERVERPORT} 🚀`);

const HTTPServer = app.listen(SERVERPORT, handleListening);

const WebSocketServer = require("websocket").server;

// 데이터 라우팅 포트 설정
const webSocketServer = new WebSocketServer({
  // httpServer: HTTPServer,
  httpServer: HTTPServer,
  autoAcceptConnections: false,
});

// console.log(webSocketServer);

function originIsAllowed(origin) {
  console.log(origin);
  return true;
}

webSocketServer.on("request", function (request) {
  console.log(request);
  if (!originIsAllowed(request.origin)) {
    request.reject();
    console.log(
      new Date() + " Connection from origin " + request.origin + " rejected."
    );
    return;
  }

  connection.on("message", function (message) {
    if (message.type === "utf8") {
      console.log("Received Message: " + message.utf8Data);
      connection.sendUTF(message.utf8Data);
    } else if (message.type === "binary") {
      console.log(
        "Received Binary Message of " + message.binaryData.length + " bytes"
      );
      connection.sendBytes(message.binaryData);
    }

    console.log(message);
  });
});

// // 1. String 데이터를 정게하기 위한 임의 공간
// var arduData = {
//   human: 0,
//   tissue: 0,
// };

// // 3. 클라이언트로 수신 데이터 송신 모듈
// webSocketServer.on("connection", (ws, request) => {
//   parser.on("data", (data) => {
//     var dataToString = data.toString();
//     var goodDat = parseString(dataToString);
//     arduData.human = goodDat[0];
//     arduData.tissue = goodDat[1];
//     var sendData = `{
//       human: ${arduData.human},
//       tissue: ${arduData.tissue},
//     }`;
//     ws.send(sendData);
//   });

//   // 2. 수신 String 데이터 인덱싱
//   function parseString(data) {
//     var resultList = [];
//     var commaSplit = data.split(",");
//     var human = commaSplit[0];
//     resultList[0] = Number(human.split("<")[1]);
//     resultList[1] = Number(commaSplit[1]);
//     return resultList;
//   }
// });
