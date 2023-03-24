"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _express = _interopRequireDefault(require("express"));
var _todoController = _interopRequireDefault(require("../modules/todos/todoController"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
const router = _express.default.Router();
const {
  list,
  create,
  delete: deleteTodo
} = new _todoController.default();
router.get("/list", list);
router.post("/create", create);
router.get("/delete/:id", deleteTodo);
var _default = router;
exports.default = _default;