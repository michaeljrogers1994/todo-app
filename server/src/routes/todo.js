import express from "express";
import TodoController from "../modules/todos/todoController"
import bodyParser from "body-parser";

const router = express.Router();
const { list, create, delete: deleteTodo } = new TodoController();

router.get("/list", list);
router.post("/create", create);
router.get("/delete/:id", deleteTodo);
export default router;