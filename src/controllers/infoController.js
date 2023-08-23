const ip = require("ip");
const addr = ip.address();
// console.log(addr);

export const getHome = (req, res) => {
  return res.render("home", { pageTitle: "Home" });
};

export const getData = (req, res) => {
  return res.render("data", { pageTitle: "Data" });
};

export const postData = (req, res) => {};
