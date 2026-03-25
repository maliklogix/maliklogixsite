import { prisma } from './prisma';

/**
 * safeQuery wraps a Prisma query with automatic retry logic.
 * If the connection is lost/dropped (common on Hostinger), it attempts
 * to disconnect and reconnect once before returning the fallback.
 */
export async function safeQuery<T>(
  queryFn: () => Promise<T>,
  fallback: T
): Promise<T> {
  try {
    return await queryFn();
  } catch (error: any) {
    const errorMessage = error?.message || '';
    
    // Check if the error is related to a lost connection
    const isConnectionError = 
      errorMessage.includes("Can't reach database") ||
      errorMessage.includes('Connection refused') ||
      errorMessage.includes('closed') ||
      errorMessage.includes('socket') ||
      errorMessage.includes('P1001') ||
      errorMessage.includes('P1017');

    if (isConnectionError) {
      console.warn('[Prisma] Connection lost, attempting one-time retry...');
      try {
        // Avoid $disconnect/$connect churn on Hostinger: with low connection limits
        // it can cause pool starvation and even Prisma engine panics.
        await new Promise((r) => setTimeout(r, 200));
        // Retry the query once using the existing pool/client.
        return await queryFn();
      } catch (retryError) {
        console.error('[Prisma] Retry failed after reconnection:', retryError);
        return fallback;
      }
    }

    console.error('[Prisma] Database query error:', error);
    return fallback;
  }
}
