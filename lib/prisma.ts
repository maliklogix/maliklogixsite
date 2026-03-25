import { PrismaClient } from '@prisma/client';

function readDatabaseUrlFromEnv(): string | undefined {
  // Hostinger panels sometimes use mixed-case env keys; Linux env is case-sensitive.
  return (
    process.env.DATABASE_URL ||
    process.env.Database_URL ||
    process.env.DATABASEUrl ||
    process.env.DatabaseUrl
  );
}

export const isDatabaseConfigured = Boolean(readDatabaseUrlFromEnv());

const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

/**
 * Hostinger shared MySQL allows very few concurrent connections per user.
 * If `connection_limit` is missing from DATABASE_URL, Prisma can default to a
 * large pool and exhaust `max_user_connections`.
 *
 * Override with PRISMA_CONNECTION_LIMIT (e.g. "1" if you run multiple Node workers).
 */
function ensureMysqlPoolParams(url: string): string {
  if (!url || /connection_limit=/i.test(url)) {
    return url;
  }
  const limit = process.env.PRISMA_CONNECTION_LIMIT ?? '2';
  const sep = url.includes('?') ? '&' : '?';
  return `${url}${sep}connection_limit=${encodeURIComponent(limit)}&pool_timeout=20&connect_timeout=10`;
}

const rawUrl = readDatabaseUrlFromEnv();
const resolvedUrl = rawUrl ? ensureMysqlPoolParams(rawUrl) : undefined;

if (process.env.NODE_ENV === 'development' && resolvedUrl) {
  console.log(
    `[Prisma] Initializing with: ${resolvedUrl.replace(/:[^:@/]+@/, ':****@').split('@')[1] ?? 'configured'}`
  );
}

function createClient(): PrismaClient {
  return new PrismaClient({
    datasourceUrl: resolvedUrl,
    log: process.env.NODE_ENV === 'development' ? ['warn', 'error'] : ['error'],
  });
}

export const prisma: PrismaClient = globalForPrisma.prisma ?? createClient();

// Always reuse one client per Node process (dev HMR + production server / standalone).
globalForPrisma.prisma = prisma;

async function disconnectGracefully(): Promise<void> {
  try {
    await prisma.$disconnect();
  } catch {
    // ignore
  }
}

if (process.env.NODE_ENV === 'production') {
  process.once('beforeExit', disconnectGracefully);
  process.once('SIGINT', disconnectGracefully);
  process.once('SIGTERM', disconnectGracefully);
}
