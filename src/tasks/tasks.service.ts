import { Injectable } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/tasks.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [
    {
      id: 'f8541a78-6025-47e7-9e62-87fe1fa9b391',
      title: 'dolores',
      description: 'velit',
      status: TaskStatus.OPEN,
    },
    {
      id: 'a1dc3e4c-71f4-46ed-8511-7af84bd1ec0d',
      title: 'fugiat',
      description: 'enim',
      status: TaskStatus.OPEN,
    },
    {
      id: 'c70a3e64-1c1b-429c-8433-01d4602d08ac',
      title: 'quo',
      description: 'Consequatur est animi tenetur est eveniet quam.',
      status: TaskStatus.OPEN,
    },
    {
      id: '01e37b85-2ab1-4815-99bf-b66f0e15b99d',
      title: 'pariatur',
      description: 'Aut enim ut est placeat qui et.',
      status: TaskStatus.OPEN,
    },
    {
      id: '488e7fb0-9b0a-4dfd-a6a5-9b2dd86be99c',
      title: 'aliquam',
      description: 'maiores est dignissimos',
      status: TaskStatus.OPEN,
    },
    {
      id: 'cca776f0-ddcd-41e9-ac0f-bedf3f6929b2',
      title: 'enim',
      description:
        'Enim molestiae laudantium ratione officiis quos eveniet voluptatem quam explicabo. Dolor vel facere sit commodi iste. Reiciendis delectus modi voluptate veritatis nobis magnam.',
      status: TaskStatus.OPEN,
    },
  ];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.OPEN,
    };

    this.tasks.push(task);
    return task;
  }

  getTaskById(taskId: string): Task {
    const task = this.tasks.find((task) => task.id === taskId);
    return task;
  }

  deleteTaskById(taskId: string): void {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }

  updateTaskById(taskId: string, status: TaskStatus): Task {
    const task = this.getTaskById(taskId);
    task.status = status;
    return task;
  }
}
