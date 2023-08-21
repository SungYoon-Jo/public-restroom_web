export const getHome = (req, res) => {
  res.render("home", { pageTitle: "Home" });
};

export const getData = (req, res) => {
  res.render("home", { pageTitle: "Home", receivedData });
};

export const postData = (req, res) => {
  const receivedData = req.body.data;
};
