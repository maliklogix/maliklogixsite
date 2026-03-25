const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);
const app = next({ dev });
const handle = app.getRequestHandler();

// ✅ Add request timeout (30s) to prevent hanging processes on Hostinger
const REQUEST_TIMEOUT = 30000;

let keepAliveStarted = false;

app.prepare().then(() => {
  createServer((req, res) => {
    // Hostinger proxy sets x-forwarded-host, while req.headers.host might be localhost
    const forwardedHost = req.headers['x-forwarded-host'];
    const rawHost = (Array.isArray(forwardedHost) ? forwardedHost[0] : forwardedHost) || req.headers.host || '';
    const host = rawHost.split(':')[0].toLowerCase();

    // 1. Instantly intercept and redirect www traffic BEFORE Next.js or Prisma touches it
    if (host.startsWith('www.')) {
      const target = `https://${host.replace('www.', '')}${req.url}`;
      res.writeHead(301, { Location: target });
      return res.end();
    }

    // 2. Start keep-alive ONLY on the primary domain process, avoiding DB crashes on www
    if (!keepAliveStarted) {
      keepAliveStarted = true;
      const { prisma } = require('./lib/prisma');
      setInterval(async () => {
        try {
          await prisma.$queryRaw`SELECT 1`;
        } catch (e) {
          console.error('[Prisma] Keep-alive ping failed:', e);
        }
      }, 10 * 60 * 1000);
    }

    // Kill hanging requests after 30s
    req.setTimeout(REQUEST_TIMEOUT, () => {
      if (!res.writableEnded) {
        res.writeHead(503, { 'Content-Type': 'text/plain' });
        res.end('Request timeout - Server busy');
      }
    });

    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  }).listen(port, () => {
    console.log(`> Ready on port ${port}`);
  });
});
