"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _client = require("@prisma/client");
const prisma = new _client.PrismaClient();
class TodoService {
  list = async query => {
    try {
      const {
        size: take = 20,
        page = 0,
        description,
        priority
      } = query;
      const skip = take * page;
      const where = {};
      if (!!description) {
        where.description = {
          contains: description
        };
      }
      if (!!priority) {
        where.priority = Number(priority);
      }
      const request = {
        // skip,
        // take,
      };
      if (Object.keys(where).length > 0) {
        request.where = where;
      }
      const todos = await prisma.todo.findMany(request);
      return todos;
    } catch (e) {
      return {
        error: e
      };
    }
  };
  create = async params => {
    try {
      const {
        description,
        priority,
        dueDate
      } = params;
      if (!description || !priority || !dueDate) {
        return {
          error: "must provide all input - description, priority, and due date"
        };
      }
      const todo = await prisma.todo.create({
        data: {
          description,
          priority: Number(priority),
          dueDate: new Date(dueDate)
        }
      });
      return todo;
    } catch (e) {
      return {
        error: e
      };
    }
  };
  delete = async id => {
    try {
      if (!Number(id) && Number(id) > 0) {
        return {
          error: "must provide id"
        };
      }
      await prisma.todo.delete({
        where: {
          id: Number(id)
        }
      });
      return {
        status: "success"
      };
    } catch (e) {
      return {
        error: e
      };
    }
  };
}
exports.default = TodoService;