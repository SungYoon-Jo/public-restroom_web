"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true,
});
exports["default"] = void 0;
var _express = _interopRequireDefault(require("express"));
var _morgan = _interopRequireDefault(require("morgan"));
var _rootRouter = _interopRequireDefault(require("./routers/rootRouter"));
function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}
var app = (0, _express["default"])();
var logger = (0, _morgan["default"])("dev");
app.set("view engine", "ejs");
app.set("views", process.cwd() + "/src/views");
app.use(logger);
app.use(
  _express["default"].urlencoded({
    extended: true,
  })
);
app.use(_express["default"].json());
app.use(_express["default"]["static"]("src/public/css"));
app.use(_express["default"]["static"]("src/public/js"));
app.use(_express["default"]["static"]("src/public/images"));
app.use("/", _rootRouter["default"]);
var _default = app;

console.log(process.cwd());
console.log(__dirname);

exports["default"] = _default;
