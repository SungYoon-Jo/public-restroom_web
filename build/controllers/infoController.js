"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Home = void 0;
var _testData = _interopRequireDefault(require("../public/js/testData.js"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var Home = function Home(req, res) {
  res.render("home", {
    pageTitle: "Home",
    data: _testData["default"]
  });
};
exports.Home = Home;