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
  await prisma.comic.create({
    data: {
      title: 'One Piece',
      isPaid: false,
    },
  });
}

createDummyData()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
