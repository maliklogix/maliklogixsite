module.exports = {
  apps: [{
    name: 'maliklogix',
    script: 'server.js',
    instances: 1,
    exec_mode: 'fork',           // ✅ Crucial for shared/limited VPS hosting
    max_memory_restart: '1.3G',    // ✅ Optimized for a 2GB RAM VPS (prevents premature restarts)
    env: {
      NODE_ENV: 'production',
      PORT: 3000,
    },
    // ✅ Auto restart logic if process hangs
    watch: false,
    kill_timeout: 5000,
    listen_timeout: 10000,
    restart_delay: 2000,
    max_restarts: 10,
    min_uptime: '10s',
  }]
};
