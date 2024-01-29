import { PrismaClient } from '@prisma/client';
// connect with dbatabas url
const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

async function createDummyData() {
  const dummyData = Array.from({ length: 100 }, (_, index) => ({
    title: `Comic ${index + 1}`,
    isPaid: Math.random() < 0.5,
    price: Math.random() < 0.5 ? Math.floor(Math.random() * 1000) : null,
    onlyAdult: Math.random() < 0.5,
  }));
  await prisma.comic.deleteMany();
  await prisma.comic.createMany({
    data: dummyData,
  });
}

createDummyData()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
