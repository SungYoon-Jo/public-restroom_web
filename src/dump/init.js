import app from "./server";

const SERVERPORT = process.env.PORT || 4000;

const TPORT = process.env.PORT || 8005;

// const handleListening = () =>
//   console.log(`✅ Server listenting on port http://localhost:${PORT} 🚀`);

// app.listen(PORT, handleListening);

const HTTPServer = app.listen(SERVERPORT, () => {
  console.log(`Server start -> http://localhost:${SERVERPORT}/`);
});

const { DelimiterParser } = require("@serialport/parser-delimiter");
const { ReadlineParser } = require("@serialport/parser-readline");
const { SerialPort } = require("serialport");

const serialPort = new SerialPort({
  path: "COM4",
  baudRate: 19200,

  // path: "COM3",
  // baudRate: 9600,
});

const parser = serialPort.pipe(new ReadlineParser({ delimiter: "\r\n" }));

// const wsModule = require("ws");
// const webSocketServer = new wsModule.Server({
//   server: HTTPServer,
// });

// let db = {
//   a: 0,
//   b: 0,
// };

parser.on("data", (data) => {
  // console.log(data);
});

// console.log();

// webSocketServer.on("connection", (ws, request) => {
//   parser.on("data", (data) => {
//     let dataToString = data.toString();
//     db.a = parseString(dataToString)[0] / 100;
//     db.b = parseString(dataToString)[1] / 100;

//     let sendData = `{
//             "a" : "${db.a}",
//             "b" : ${db.b},
//         }`;

//     ws.send(sendData);
//   });

//   ws.on("message", (msg) => {
//     console.log(`Send message : ${msg}`);
//   });

//   ws.on("error", (error) => {
//     console.log(`Client err : ${error}`);
//   });

//   ws.on("close", () => {
//     console.log(`Server Closed`);
//   });

//   console.log("aaa");
// });

// function parseString(data) {
//   let resultList = [];

//   let commaSplit = data.split(",");
//   let a = commaSplit[0];
//   resultList[0] = Number(a.split("{")[1]);
//   resultList[1] = Number(commaSplit[1]);
//   let b = commaSplit[2];
//   resultList[2] = Number(b.split("}")[0]);

//   return resultList;
// }
