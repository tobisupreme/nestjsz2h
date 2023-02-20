import { TaskStatus } from '@prisma/client';

export class QueryTaskDto {
  status?: TaskStatus;
  search?: string;
}
