const ip = require("ip");
const addr = ip.address();

export const getHome = (req, res) => {
  console.log(addr);

  res.render("home", { pageTitle: "Home" });
};

export const getData = (req, res) => {
  res.render("data", { pageTitle: "Data" });
};

export const postData = (req, res) => {
  const receivedData = req.body.data;
};
