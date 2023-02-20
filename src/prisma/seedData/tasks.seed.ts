import { faker } from '@faker-js/faker';
import { TaskStatus } from '../../tasks/tasks.model';

type ITask = {
  id?: string;
  title: string;
  description?: string;
  status: TaskStatus;
};

const tasks: ITask[] = [
  {
    title: 'dolores',
    description: 'velit',
    status: TaskStatus.OPEN,
  },
  {
    title: 'fugiat',
    description: 'enim',
    status: TaskStatus.OPEN,
  },
  {
    title: 'quo',
    description: 'Consequatur est animi tenetur est eveniet quam.',
    status: TaskStatus.OPEN,
  },
  {
    title: 'pariatur',
    description: 'Aut enim ut est placeat qui et.',
    status: TaskStatus.OPEN,
  },
  {
    title: 'aliquam',
    description: 'maiores est dignissimos',
    status: TaskStatus.OPEN,
  },
  {
    title: 'enim',
    description:
      'Enim molestiae laudantium ratione officiis quos eveniet voluptatem quam explicabo. Dolor vel facere sit commodi iste. Reiciendis delectus modi voluptate veritatis nobis magnam.',
    status: TaskStatus.OPEN,
  },
];

export const taskSeed = tasks.map((task) => ({
  ...task,
  id: faker.datatype.uuid(),
}));
