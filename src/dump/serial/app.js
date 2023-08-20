import http from "http";
import { WebSocket } from "ws";

/*
  <express 추가 방법>
  import express from 'express'
  const app = express()
  const server = http.createServer(app);
*/

const server = http.createServer();
// http 서버 만들기

const wss = new WebSocket.Server({ server });
// 웹소켓 서버 만들기

function handleConnection(socket) {
  console.log(socket);
}
// 요청한 클라이언트 정보 다루기위한 함수

wss.on("connection", handleConnection);
// 웹소켓 connection을 감지(이벤트 리스너), 콜백함수에 소켓(요청한 클라이언트 정보) 전달, 콜백함수 실행

server.listen(3000);
// http + ws 3000포트 서버 실행
