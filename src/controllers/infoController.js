import data from "../public/js/testData.js";

export const Home = (req, res) => {
  res.render("home", { pageTitle: "Home", data });
};
