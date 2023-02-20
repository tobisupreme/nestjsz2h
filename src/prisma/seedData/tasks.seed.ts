import { TaskStatus } from '../../tasks/tasks.model';

export type ITask = {
  id?: string;
  title: string;
  description?: string;
  status: TaskStatus;
  userId?: string;
};

const tasks: ITask[] = [
  {
    id: '79d2cc32-f002-4438-b7a0-e6819d660c87',
    title: 'dolores',
    description: 'velit',
    status: TaskStatus.OPEN,
    userId: 'f5e6f72f-4565-4133-a35a-4aca8bc113cf',
  },
  {
    id: '36127ecf-1a29-4348-9917-8f395eeae96d',
    title: 'fugiat',
    description: 'enim',
    status: TaskStatus.OPEN,
    userId: 'f5e6f72f-4565-4133-a35a-4aca8bc113cf',
  },
  {
    id: '8c04cfd7-7d0e-481d-90f8-7d5149d2594a',
    title: 'quo',
    description: 'Consequatur est animi tenetur est eveniet quam.',
    status: TaskStatus.OPEN,
    userId: 'a69357d1-7979-4dcd-af7f-c519c97e5847',
  },
  {
    id: '6ab3222d-f1e9-40f7-b49d-8d8eb22c0632',
    title: 'pariatur',
    description: 'Aut enim ut est placeat qui et.',
    status: TaskStatus.OPEN,
    userId: 'a69357d1-7979-4dcd-af7f-c519c97e5847',
  },
  {
    id: '8c604a7b-7396-44ef-87df-6d54084a4d3d',
    title: 'aliquam',
    description: 'maiores est dignissimos',
    status: TaskStatus.OPEN,
    userId: '8fde29d4-9987-423a-8752-be0fb4521a6d',
  },
  {
    id: '3a7fc0d0-5086-4161-95cd-2f69656c89d8',
    title: 'enim',
    description:
      'Enim molestiae laudantium ratione officiis quos eveniet voluptatem quam explicabo. Dolor vel facere sit commodi iste. Reiciendis delectus modi voluptate veritatis nobis magnam.',
    status: TaskStatus.OPEN,
    userId: '8fde29d4-9987-423a-8752-be0fb4521a6d',
  },
];

export const taskSeed = tasks;
