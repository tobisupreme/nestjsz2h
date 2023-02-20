import { PrismaClient } from '@prisma/client';
import { userSeed } from './seedData/users.seed';

const prisma = new PrismaClient();

const promises = [];

promises.push(
  new Promise(async (resolve, reject) => {
    try {
      await prisma.user.createMany({
        data: userSeed,
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
    console.log('Users Seeded successfully.');
    await prisma.$disconnect();
  });
