import { PrismaClient } from '@prisma/client';
import { userSeed } from './seedData/users.seed';
import { taskSeed } from './seedData/tasks.seed';

const prisma = new PrismaClient();

const promises = [];

promises.push(
  new Promise(async (resolve, reject) => {
    try {
      // create users
      await prisma.user.createMany({
        data: userSeed,
        skipDuplicates: true,
      });

      // create tasks
      await prisma.task.createMany({
        data: taskSeed,
        skipDuplicates: true,
      });

      resolve(true);
    } catch (e) {
      reject(e);
    }
  }),
);

Promise.all(promises)
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    console.log('Tasks Seeded successfully.');
    await prisma.$disconnect();
  });
