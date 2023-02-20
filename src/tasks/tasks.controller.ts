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
import { Task, TaskStatus } from '@prisma/client';
import { QueryTaskDto } from './dto/query-tasks.dto';
import { TasksService } from './tasks.service';

@ApiTags('Tasks')
@Controller('tasks')
@UseGuards(AuthGuard())
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks(@Query() queryObj: QueryTaskDto): Promise<Task[]> {
    return await this.tasksService.getAllTasks(queryObj);
  }

  @Post()
  async createTask(@Body() createTaskDto: Task): Promise<Task> {
    return await this.tasksService.createTask(createTaskDto);
  }

  @Get(':id')
  async getTaskById(@Param('id') taskId: string): Promise<Task> {
    return await this.tasksService.getTaskById(taskId);
  }

  @Patch(':id/status')
  async updateTaskById(
    @Param('id') taskId: string,
    @Body('status') status: TaskStatus,
  ) {
    return await this.tasksService.updateTaskById(taskId, status);
  }

  @Delete(':id')
  async deleteTaskById(@Param('id') taskId: string) {
    return await this.tasksService.deleteTaskById(taskId);
  }
}
