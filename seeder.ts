import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function createDummyData() {
  const dummyData = Array.from({ length: 10 }, (_, index) => ({
    title: `Comic ${index + 1}`,
    isPaid: Math.random() < 0.5, // 50% 확률로 true 또는 false
    price: Math.random() < 0.5 ? Math.floor(Math.random() * 1000) : null, // 50% 확률로 가격 또는 null
  }));

  for (const data of dummyData) {
    await prisma.comic.create({ data });
  }
}

createDummyData()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
