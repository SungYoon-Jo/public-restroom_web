console.log("mobileWifi.js loaded");

const StatusMainData = document.querySelector(".status_main");
const humanwifiData = document.querySelector(".human_wifiData");
const tissuewifiData = document.querySelector(".tissue_wifiData");

var humanNum = Number(humanwifiData.textContent);
var tissueNum = Number(tissuewifiData.textContent);

setInterval(() => {
  location.reload();
}, 5000);

// data test
// humanNum = 1;
// tissueNum = 200;

var tissueBoundary = 350;

humanNum === 1
  ? (humanwifiData.style.display = "block")
  : (humanwifiData.style.display = "none");

tissueNum < tissueBoundary
  ? (tissuewifiData.style.display = "block")
  : (tissuewifiData.style.display = "none");

if (humanNum === 1 || tissueNum < tissueBoundary) {
  StatusMainData.style.backgroundColor = "#d50c0c";
  StatusMainData.style.backgroundImage = "url(/no.png)";
} else {
  StatusMainData.style.backgroundColor = "#5ed124";
  StatusMainData.style.backgroundImage = "url(/potty.png)";
}

console.log(`인체감지 센서:${humanNum} 휴지 센서값: ${tissueNum}`);
