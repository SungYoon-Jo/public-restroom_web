const StatusOneData = document.querySelector(".status_one");
const StatusTwoData = document.querySelector(".status_two");

const handleData = async () => {
  await fetch("./test.json")
    .then((res) => res.json())
    .then((data) => {
      const { human, tissue } = data[0];

      human || tissue
        ? (StatusOneData.style.backgroundColor = "red")
        : (StatusOneData.style.backgroundColor = "rgb(171, 247, 31)");

      if (tissue) {
        const twoChild = document.createElement("li");
        twoChild.classList = "tissue_msg";
        StatusTwoData.appendChild(twoChild);
      } else {
        console.log("tissue data is not");
      }

      if (human) {
        const twoChild = document.createElement("li");
        twoChild.classList = "human_msg";
        StatusTwoData.appendChild(twoChild);
      } else {
        console.log("human data is not");
      }
    });
};

handleData();
