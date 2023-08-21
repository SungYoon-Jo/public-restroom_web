export const Home = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};

export const Test = (req, res) => {
  res.render("test", { pageTitle: "Test" });
};
