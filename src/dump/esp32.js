var socket = io();
var msgform = document.getElementById("msgform");
// socket.on 함수로 서버에서 전달하는 신호를 수신
socket.on("usercount", (count) => {
  console.log(count);
  //   var userCounter = document.getElementById("usercount");
  //   userCounter.innerText = "현재 " + count + "명이 서버에 접속해있습니다.";
});

// 메시지 수신시 HTML에 메시지 내용 작성
socket.on("message", (msg) => {
  //   var messageList = document.getElementById("messages");
  //   var messageTag = document.createElement("li");
  //   messageTag.innerText = msg;
  //   messageList.appendChild(messageTag);
  console.log(msg);
});

msgform.onsubmit = (e) => {
  e.preventDefault();
  var msginput = document.getElementById("msginput");

  // socket.emit으로 서버에 신호를 전달
  socket.emit("message", msginput.value);

  msginput.value = "";
};
