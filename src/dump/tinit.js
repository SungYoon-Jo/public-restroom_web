const express = require("express");
const bodyParser = require("body-parser");

const app = express();
const port = 4500;

app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.end("hihi?");
});

app.get("/data", (req, res) => {
  res.end("data");
  console.log("data page get");
});

app.post("/data", (req, res) => {
  const data = req.body.data;
  console.log("받은 데이터:", data);
  console.log("data page post");

  // 추가적인 작업을 수행할 수 있습니다.

  res.send("데이터를 받았습니다.");
});

app.listen(port, () => {
  console.log(`서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
