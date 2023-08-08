const StatusOneData = document.querySelector(".status_one_data");
const StatusTwoData = document.querySelector(".status_two_data");

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
        twoChild.classList = "one_color";
        StatusTwoData.appendChild(twoChild);
      } else {
        console.log("tissue data is not");
      }

      if (human) {
        const twoChild = document.createElement("li");
        twoChild.classList = "two_color";
        StatusTwoData.appendChild(twoChild);
      } else {
        console.log("human data is not");
      }
    });
};

handleData();
