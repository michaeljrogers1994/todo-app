
import TodoService from './todoService';

const {list, create, delete: deleteTodo } = new TodoService();

export default class TodoController {
    
    list = async (req, res) => {
        const todos = await list(req.query);
        res.setHeader('Access-Control-Allow-Origin', '*');
        return res.status(200).json({todos});
    };

    create = async (req, res) => {
        const todo = await create(req.body);

        res.setHeader('Access-Control-Allow-Origin', '*');

        if (todo.error) {
            return res.status(400).json({error: todo.error})
        }

        
        return res.status(200).json({todo});
    };

    delete = async (req, res) => {
        const {id} = req.params;

        const status = await deleteTodo(id);

        res.setHeader('Access-Control-Allow-Origin', '*');
        if (status.error) {
            return res.status(400).json({error: status.error})
        }

        return res.status(200).json({status});
    };

}