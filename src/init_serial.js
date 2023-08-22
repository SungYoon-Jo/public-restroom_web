import app from "./server";

const SERVERPORT = process.env.PORT || 4000;

const handleListening = () =>
  console.log(`✅ Server listenting on port http://localhost:${SERVERPORT} 🚀`);

const HTTPServer = app.listen(SERVERPORT, handleListening);

const { ReadlineParser } = require("@serialport/parser-readline");
const { SerialPort } = require("serialport");
const { WebSocketServer } = require("ws");

// 직렬 방식 path, baudRate 설정
// baudRate는 하드웨어랑 맞춰야함
// 연결장치의 path를 모를땐 장치 관리자 -> 포트(COM & LPT)에 나와있음
const serialPort = new SerialPort({
  path: "COM3",
  // path: "COM4",
  baudRate: 19200,

  // baudRate: 9600,
});

// 데이터 수신
const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// 데이터 라우팅 포트 설정
const webSocketServer = new WebSocketServer({
  server: HTTPServer,
});

// 1. String 데이터를 정게하기 위한 임의 공간
var arduData = {
  human: 0,
  tissue: 0,
};

// 3. 클라이언트로 수신 데이터 송신 모듈
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

  // 2. 수신 String 데이터 인덱싱
  function parseString(data) {
    var resultList = [];
    var commaSplit = data.split(",");
    var human = commaSplit[0];
    resultList[0] = Number(human.split("<")[1]);
    resultList[1] = Number(commaSplit[1]);
    return resultList;
  }
});
