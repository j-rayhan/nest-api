import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateTaskDto } from './dto/create-task-dto';
import { GetTaskFilterDto } from './dto/filter-task-dto';
import { TasksRepository } from './tasks.repository';
import { TaskStatus } from './tasks-status.enum';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository)
    private tasksRepository: TasksRepository,
  ) {}
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
  createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }
  async getTaskById(id: string): Promise<Task> {
    const result = await this.tasksRepository.findOne(id);
    if (!result) {
      throw new NotFoundException(`Task with ID: ${id} not found!`);
    }
    return result;
  }

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
