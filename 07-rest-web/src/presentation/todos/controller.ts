import { Request, Response } from "express";
import { prisma } from "../../data/postgres";

export class TodosController {
  constructor() { }
  
  public getTodos = async (req: Request, res: Response) => {
    const todos = await prisma.todo.findMany()
    return res.json(todos)
  }

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;
    if (isNaN(+id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = await prisma.todo.findUnique({
      where: {
        id: Number(id)
      }
    })

    if (todo) return res.json(todo);
    return res.status(404).json({ error: `TODO with id:${id} not found` });
  }

  public createTodo = async (req: Request, res: Response) => {
    const { text } = req.body;

    if (!text) return res.status(400).json({ error: 'Text property is required' });

    const todo = await prisma.todo.create({
      data: { text, completedAt: new Date() }
    });

    return res.json(todo);
  }

  public updateTodo = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { text } = req.body;
    
    if (isNaN(+id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = await prisma.todo.findFirst({
      where: { id: Number(id) }
    });

    if (!todo) return res.status(404).json({ error: `TODO with id:${id} not found` });

    if (!text) return res.status(400).json({ error: 'Text property is required' });

    const updatedTodo = await prisma.todo.update({
      where: {
        id: Number(id),
      },
      data: {
        text,
      }
    });

    return res.json(updatedTodo);
  }

  public deleteTodo = async(req: Request, res: Response) => {
    const { id } = req.params;

    if (isNaN(+id)) return res.status(400).json({ error: 'ID argument is not a number' });

    const todo = await prisma.todo.findFirst({
      where: { id: Number(id) }
    });
    
    if (!todo) return res.status(404).json({ error: `TODO with id:${id} not found` });

    const deletedTodo = await prisma.todo.delete({
      where: {
        id: Number(id)
      }
    })

    return res.json(deletedTodo);
  }
}
