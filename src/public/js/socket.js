// 웹소켓 클라이언트 객체 생성 및 접속 IP + PORT 설정
// PORT는 서버 컴퓨터 고유 IP + PORT로 설정 해야함
var webSocket = new WebSocket(`ws://192.168.0.192:4000`);

// 웹소켓 연결 확인 이벤트 처리
webSocket.onopen = () => {
  console.log("웹소켓서버와 연결 성공");
};

// 메세지 수신 이벤트 처리
webSocket.onmessage = function (event) {
  // console.log(`서버 웹소켓에게 받은 데이터: ${event.data}`);

  const StatusMainData = document.querySelector(".status_main");
  const humanData = document.querySelector(".human_data");
  const tissueData = document.querySelector(".tissue_data");

  var human = Number.parseFloat(event.data[15]);
  var tissue = Number.parseFloat(event.data.slice(32, 35));

  // 값은 275 or 283 테스트중
  var tissueBoundary = 275;
  // var tissueBoundary = 279;

  human === 1
    ? (humanData.style.display = "block")
    : (humanData.style.display = "none");

  tissue <= tissueBoundary
    ? (tissueData.style.display = "block")
    : (tissueData.style.display = "none");

  human === 1 || tissue <= tissueBoundary
    ? (StatusMainData.style.backgroundColor = "red")
    : (StatusMainData.style.backgroundColor = "rgb(171, 247, 31)");

  console.log(human, humanData.style.display, tissue);
};

// 연결 종료 이벤트 처리
webSocket.onclose = function () {
  console.log("서버 웹소켓 연결 종료");
};

// 에러 발생 이벤트 처리
webSocket.onerror = function (event) {
  console.log(event);
};
