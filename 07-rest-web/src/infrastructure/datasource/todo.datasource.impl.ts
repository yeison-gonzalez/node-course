import { prisma } from "../../data/postgres";
import { CreateTodoDto, CustomError, TodoDatasource, TodoEntity, UpdateTodoDto } from "../../domain";

export class TodoDatasourceImpl implements TodoDatasource {
  async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
    const todo = await prisma.todo.create({
      data: createTodoDto!
    });

    return TodoEntity.fromObject(todo);
  }

  async getAll(): Promise<TodoEntity[]> {
    const todos = await prisma.todo.findMany();
    return todos.map(TodoEntity.fromObject);
  }

  async findById(id: number): Promise<TodoEntity> {
    if (!id) throw `Id argument is required`;
    const todo = await prisma.todo.findUnique({ where: { id } });
    if (!todo) throw new CustomError(`Todo with id: ${id} not found`, 404);
    return TodoEntity.fromObject(todo);
  }

  async updateById(updatedTodoDto: UpdateTodoDto): Promise<TodoEntity> {
    const todo = await this.findById(updatedTodoDto.id);
    const updatedTodo = await prisma.todo.update({
      where: { id: todo.id },
      data: updatedTodoDto!.values
    });

    return TodoEntity.fromObject(updatedTodo);
  }

  async deleteById(id: number): Promise<TodoEntity> {
    const todo = await this.findById(id);
    const deletedTodo = await prisma.todo.delete({ where: { id: todo.id } });

    return TodoEntity.fromObject(deletedTodo)
  }
}
