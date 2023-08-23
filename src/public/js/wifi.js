console.log("testWifi.js loaded");

const StatusMainData = document.querySelector(".status_main");
const humanwifiData = document.querySelector(".human_wifiData");
const tissuewifiData = document.querySelector(".tissue_wifiData");

const target = document.getElementById("target");

console.log();

var humanNum = Number(humanwifiData.textContent);
var tissueNum = Number(tissuewifiData.textContent);

setInterval(() => {
  location.reload();
}, 3000);

var tissueBoundary = 300;

humanNum === 1
  ? (humanwifiData.style.display = "block")
  : (humanwifiData.style.display = "none");

tissueNum > tissueBoundary
  ? (tissuewifiData.style.display = "block")
  : (tissuewifiData.style.display = "none");

humanNum === 1 || tissueNum > tissueBoundary
  ? (StatusMainData.style.backgroundColor = "red")
  : (StatusMainData.style.backgroundColor = "rgb(171, 247, 31)");

console.log(`인체감지 센서:${humanNum} 휴지 센서값: ${tissueNum}`);
