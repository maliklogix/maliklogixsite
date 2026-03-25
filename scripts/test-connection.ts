import { PrismaClient } from '@prisma/client';

async function main() {
  const prisma = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  });

  console.log('Testing connection to:', process.env.DATABASE_URL?.split('@')[1]);

  try {
    const result = await prisma.$queryRaw`SELECT 1 as connected`;
    console.log('Success! Connection established:', result);
  } catch (error) {
    console.error('Connection Failed!');
    console.error(error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
