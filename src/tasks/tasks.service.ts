import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/filter-task-dto';
import { TaskStatus } from './tasks-status.enum';

@Injectable()
export class TasksService {

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // getTasksWithFilter(filterDto: GetTaskFilterDto): Task[] {
  //   const { status, search } = filterDto;
  //   let tasks = this.getAllTasks();
  //   if (status) {
  //     tasks = tasks.filter((task) => task.status === status);
  //   }
  //   if (search) {
  //     tasks = tasks.filter(({ title, description }) => {
  //       return (
  //         title.toLowerCase().includes(search.toLowerCase()) ||
  //         description.toLowerCase().includes(search.toLowerCase())
  //       );
  //     });
  //   }
  //   return tasks;
  // }
  // createTask(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.OPEN,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }

  // getTaskById(id: string): Task {
  //   const result = this.tasks.find((task) => task.id === id);
  //   if (!result) {
  //     throw new NotFoundException(`Task with ID: ${id} not found!`);
  //   }
  //   return result;
  // }

  // deleteTask(id: string): void {
  //   const result = this.getTaskById(id)
  //   this.tasks = this.tasks.filter((task) => task.id !== result.id); // This not a good idea!
  // }

  // updateTaskStatus(id: string, status: TaskStatus): Task {
  //   const task = this.getTaskById(id);
  //   task.status = status;
  //   return task;
  // }
}
