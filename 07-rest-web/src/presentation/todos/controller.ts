import { Request, Response } from "express";

const todos = [
  { id: 1, text: 'Buy test 1', createdAt: new Date() },
  { id: 2, text: 'Buy test 2', createdAt: new Date() },
  { id: 3, text: 'Buy test 3', createdAt: new Date() },
]

export class TodosController {
  constructor() { }
  
  public getTodos = (req: Request, res: Response) => {
    return res.json(todos)
  }

  public getTodoById = (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.status(400).json({ error: 'ID argument is not a number' });
    const todo = todos.find(todo => todo.id === +id);
    if (todo) return res.json(todo);
    return res.status(404).json({ error: `TODO with id:${id} not found` });
  }

  public createTodo = (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: 'Text property is required' });

    const newTodo = {
      id: todos.length + 1,
      text,
      createdAt: new Date(),
    }

    todos.push(newTodo)
    return res.json(newTodo);
  }

  public updateTodo = (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    
    if (isNaN(+id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = todos.find(todo => todo.id === +id);

    if (!text) return res.status(400).json({ error: 'Text property is required' });
    if (!todo) return res.status(404).json({ error: `TODO with id:${id} not found` });
    
    todo.text = text || todo.text;

    return res.json(todo);
  }

  public deleteTodo = (req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = todos.find(todo => todo.id === +id);
    if (!todo) return res.status(404).json({ error: `TODO with id:${id} not found` });

    todos.splice(todos.indexOf(todo), 1);

    return res.json(todo);
  }
}
