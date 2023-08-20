const express = require("express");
const app = express();

const fs = require("fs");
const mysql = require("mysql");
const path = require("path");
const bodyParser = require("body-parser");

////////////////////////////////////////////////////////////////////////////////////////////
// 상속 및 외부파일 연결

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ////////////////////////////////////////////////////////////////////////////
// router and server listen
SERVERPORT = 30001;

const HTTPServer = app.listen(SERVERPORT, () => {
  console.log(`Server start -> http://127.0.0.1:${SERVERPORT}/`);
});

// ////////////////////////////////////////////////////////////////////////////
// ws

const { DelimiterParser } = require("@serialport/parser-delimiter");
const { SerialPort } = require("serialport");
const serialPort = new SerialPort({
  path: "/dev/ttyUSB0",
  baudRate: 9600,
}).on("error", function (err) {
  console.log(err.message);
});

const parser = serialPort.pipe(new DelimiterParser({ delimiter: "\n" }));

setInterval(function () {
  SerialPort.list().then(function (port) {
    if (port.length == 0) {
      console.log("Not connected");
    } else {
      serialPort.open();
    }
  });
}, 1000);

const wsModule = require("ws");
const webSocketServer = new wsModule.Server({
  server: HTTPServer,
  //port: 30002
});

let arduData = {
  capsuleName: capsule.device_name,
  voltage: 0,
  waterTemp: 0,
  luxAdc: 0,
};

webSocketServer.on("connection", (ws, request) => {
  parser.on("data", (data) => {
    let dataToString = data.toString();
    arduData.luxAdc = parseString(dataToString)[0] / 100;
    arduData.waterTemp = parseString(dataToString)[1] / 100;
    arduData.voltage = parseString(dataToString)[2];

    let sendData = `{
            "capsuleName" : "${arduData.capsuleName}", 
            "water_temperature" : ${arduData.waterTemp}, 
            "intensity_of_illumination" : ${arduData.luxAdc}, 
            "turbidity" : ${arduData.voltage}
        }`;

    ws.send(sendData);
  });

  ws.on("message", (msg) => {
    console.log(`Send message : ${msg}`);
  });

  ws.on("error", (error) => {
    console.log(`Client err : ${error}`);
  });

  ws.on("close", () => {
    console.log(`Server Closed`);
  });
});

function parseString(data) {
  let resultList = [];

  let commaSplit = data.split(",");
  let voltage = commaSplit[0];
  resultList[0] = Number(voltage.split("{")[1]);
  resultList[1] = Number(commaSplit[1]);
  let luxAdc = commaSplit[2];
  resultList[2] = Number(luxAdc.split("}")[0]);

  return resultList;
}

///////////////////////////////////////////
// function

const registLog = require("./lib/reg_logs")(arduData, mysqlConn);
