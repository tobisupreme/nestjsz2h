import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryTaskDto } from './dto/query-tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  getAllTasks(queryObj: QueryTaskDto): Promise<Task[]> {
    console.log(Object.keys(queryObj).length);
    if (Object.keys(queryObj).length < 1) {
      return this.prisma.task.findMany();
    }

    return this.prisma.task.findMany({
      where: {
        status: queryObj.status,
        OR: [
          {
            title: { contains: queryObj.search },
          },
          {
            description: { contains: queryObj.search },
          },
        ],
      },
    });
  }

  createTask(createTaskDto: Task): Promise<Task> {
    return this.prisma.task.create({ data: createTaskDto });
  }

  async getTaskById(taskId: string): Promise<Task> {
    const task = await this.prisma.task.findUnique({ where: { id: taskId } });

    if (!task) {
      throw new NotFoundException('Task with provided ID not found!');
    }

    return task;
  }

  deleteTaskById(taskId: string) {
    return this.prisma.task.delete({ where: { id: taskId } });
  }

  updateTaskById(taskId: string, status: TaskStatus): Promise<Task> {
    return this.prisma.task.update({ where: { id: taskId }, data: { status } });
  }
}
