import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Task, TaskStatus, User } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { QueryTaskDto } from './dto/query-tasks.dto';

@Injectable()
export class TasksService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllTasks(queryObj: QueryTaskDto, user: User): Promise<Task[]> {
    let filter: Prisma.TaskFindManyArgs;

    if (Object.keys(queryObj).length < 1) {
      filter = { where: { User: user } };
    } else {
      filter = {
        where: {
          AND: [
            { User: user },
            {
              AND: [
                { status: queryObj.status },
                {
                  OR: [
                    {
                      title: { contains: queryObj.search },
                    },
                    {
                      description: { contains: queryObj.search },
                    },
                  ],
                },
              ],
            },
          ],
        },
      };
    }
    filter = {
      ...filter,
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    };

    return await this.prisma.task.findMany(filter);
  }

  createTask(user: User, createTaskDto: Task): Promise<Task> {
    const obj = { ...createTaskDto, userId: user.id };
    return this.prisma.task.create({
      data: obj,
      include: {
        User: {
          select: {
            username: true,
          },
        },
      },
    });
  }

  async getTaskById(taskId: string, user: User): Promise<Task> {
    const task = await this.prisma.task.findFirst({
      where: {
        id: taskId,
        User: user,
      },
    });

    if (!task) {
      throw new NotFoundException('Task with provided ID not found!');
    }

    return task;
  }

  async deleteTaskById(taskId: string, user: User) {
    await this.getTaskById(taskId, user);
    return this.prisma.task.delete({ where: { id: taskId } });
  }

  async updateTaskById(
    taskId: string,
    status: TaskStatus,
    user: User,
  ): Promise<Task> {
    await this.getTaskById(taskId, user);
    return this.prisma.task.update({
      where: { id: taskId },
      data: { status },
    });
  }
}
