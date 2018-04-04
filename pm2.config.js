module.exports = {
  apps: [
    {
      name: 'server-player',
      interpreter: '/Users/paul/dev/node',
      script: '/Users/paul/dev/inyourland-rn/build/server/main.js',
      args: 'startScenes',
      watch: true,
      env: {
        NODE_ENV: 'development',
      },
      env_production: {
        NODE_ENV: 'production',
      },
    },
  ],
}
