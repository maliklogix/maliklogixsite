const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const port = parseInt(process.env.PORT || '3000', 10);
const app = next({ dev });
const handle = app.getRequestHandler();

// ✅ Add request timeout (30s) to prevent hanging processes on Hostinger
const REQUEST_TIMEOUT = 30000;

app.prepare().then(() => {
  createServer((req, res) => {
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

    // Light keep-alive: one cheap query on an existing pooled connection.
    // Avoid $disconnect/$connect here — that churns connections and can hit Hostinger limits.
    const { prisma } = require('./lib/prisma');
    setInterval(async () => {
      try {
        await prisma.$queryRaw`SELECT 1`;
      } catch (e) {
        console.error('[Prisma] Keep-alive ping failed:', e);
      }
    }, 10 * 60 * 1000);
  });
});
