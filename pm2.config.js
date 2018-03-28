module.exports = {
  apps: [
    {
      name: 'server-player',
      script: './build/server/main.js',
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
