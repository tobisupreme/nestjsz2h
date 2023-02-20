import { PrismaClient } from '@prisma/client';
import { taskSeed } from './seedData/tasks.seed';

const prisma = new PrismaClient();

const promises = [];

promises.push(
  new Promise(async (resolve, reject) => {
    try {
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
