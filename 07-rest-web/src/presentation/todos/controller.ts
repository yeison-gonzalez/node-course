import { Request, Response } from "express";
import { prisma } from "../../data/postgres";
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos";
import { TodoRepository } from "../../domain";

export class TodosController {
  constructor(
    private readonly todoRepository: TodoRepository,
  ) { }
  
  public getTodos = async (req: Request, res: Response) => {
    const todos = await this.todoRepository.getAll();
    return res.json(todos)
  }

  public getTodoById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
      const todo = await this.todoRepository.findById(Number(id));
      return res.json(todo);
    } catch (error) {
      return res.status(400).json({ error });
    }
  }

  public createTodo = async (req: Request, res: Response) => {
    const [error, createTodoDto] = CreateTodoDto.create(req.body);
    if (error) return res.status(400).json({ error });

    const todo = await this.todoRepository.create(createTodoDto!);
    return res.json(todo);
  }

  public updateTodo = async (req: Request, res: Response) => {
    const id = +req.params.id;
    const [error, updatedTodoDto] = UpdateTodoDto.create({...req.body, id})
    if (error) return res.status(400).json({ error });

    const updatedTodo = await this.todoRepository.updateById(updatedTodoDto!);
    return res.json(updatedTodo);
  }

  public deleteTodo = async(req: Request, res: Response) => {
    const { id } = req.params;

    const deletedTodo = await this.todoRepository.deleteById(Number(id));
    return res.json(deletedTodo);
  }
}
