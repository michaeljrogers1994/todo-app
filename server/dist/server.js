"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _index = _interopRequireDefault(require("./routes/index.js"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const app = (0, _express.default)();
const corsOptions = {
  origin: '*',
  credentials: true,
  //access-control-allow-credentials:true
  optionSuccessStatus: 200
};
app.use((0, _cors.default)(corsOptions));
app.use(_bodyParser.default.urlencoded({
  extended: true
}));
app.use(_bodyParser.default.json());
app.use("/api", _index.default);
app.listen(5000, () => {
  console.log("Server started on port 5000");
});