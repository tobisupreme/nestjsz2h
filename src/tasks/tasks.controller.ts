import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreateTaskDto } from './dto/tasks.dto';
import { Task, TaskStatus } from './tasks.model';
import { TasksService } from './tasks.service';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.tasksService.createTask(createTaskDto);
  }

  @Get(':id')
  getTaskById(@Param('id') taskId: string): Task {
    return this.tasksService.getTaskById(taskId);
  }

  @Patch(':id/status')
  updateTaskById(
    @Param('id') taskId: string,
    @Body('status') status: TaskStatus,
  ): Task {
    return this.tasksService.updateTaskById(taskId, status);
  }

  @Delete(':id')
  deleteTaskById(@Param('id') taskId: string): void {
    return this.tasksService.deleteTaskById(taskId);
  }
}
