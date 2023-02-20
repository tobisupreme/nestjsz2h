import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { Task, TaskStatus, User } from '@prisma/client';
import { GetUser } from 'src/auth/getUser.decorator';
import { QueryTaskDto } from './dto/query-tasks.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(
    @Query() queryObj: QueryTaskDto,
    @GetUser() user: User,
  ): Promise<Task[]> {
    return await this.tasksService.getAllTasks(queryObj, user);
  }

  @Post()
  async createTask(
    @Body() createTaskDto: Task,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.createTask(user, createTaskDto);
  }

  @Get(':id')
  async getTaskById(
    @Param('id') taskId: string,
    @GetUser() user: User,
  ): Promise<Task> {
    return await this.tasksService.getTaskById(taskId, user);
  }

  @Patch(':id/status')
  async updateTaskById(
    @Param('id') taskId: string,
    @Body('status') status: TaskStatus,
    @GetUser() user: User,
  ) {
    return await this.tasksService.updateTaskById(taskId, status, user);
  }

  @Delete(':id')
  async deleteTaskById(@Param('id') taskId: string, @GetUser() user: User) {
    return await this.tasksService.deleteTaskById(taskId, user);
  }
}
