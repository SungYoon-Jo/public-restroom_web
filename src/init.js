// import app from "./server";

const net = require("net");

import express from "express";
const app = express();

const handleListening = (SERVERPORT) =>
  console.log(`✅ Server listenting on port http://localhost:${SERVERPORT} 🚀`);

const TCPPORT = process.env.PORT || 4500;

var arduData = {
  human: 0,
  tissue: 0,
};

const server = net.createServer((soket) => {
  console.log("클라이언트가 연결되었습니다.");

  soket.on("data", (data) => {
    const receivedData = data.toString();

    var goodDat = parseString(receivedData);

    var human = (arduData.human = goodDat[0]);
    var tissue = (arduData.tissue = goodDat[1]);
    var sendData = {
      human,
      tissue,
    };

    app.locals.data = sendData;

    console.log(sendData);
  });

  soket.on("end", () => {
    console.log("클라이언트 연결 종료");
  });

  function parseString(data) {
    var resultList = [];
    var commaSplit = data.split(",");

    var human = commaSplit[0];
    var tissue = commaSplit[1];

    resultList[0] = human.split("<")[1];
    typeof tissue === "string"
      ? (resultList[1] = tissue.split(">")[0])
      : console.log(typeof tissue);

    return resultList;
  }
});

server.listen(TCPPORT, handleListening(TCPPORT));

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

import morgan from "morgan";

const logger = morgan("dev");
const bodyParser = require("body-parser");

app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("src/public/css"));
app.use(express.static("src/public/js"));
app.use(express.static("src/public/images"));

app.get("/", (req, res) => {
  const data = app.locals.data;
  if (data) {
    const { human, tissue } = data;
    return res.render("home", { pageTitle: "Home", human, tissue });
  } else {
    console.log("no request data");
    return res.render("home", { pageTitle: "Home", human: 0, tissue: 0 });
  }
});

const SERVERPORT = process.env.PORT || 5000;

app.listen(SERVERPORT, handleListening(SERVERPORT));
