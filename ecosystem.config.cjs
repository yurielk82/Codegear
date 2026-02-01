module.exports = {
  apps: [
    {
      name: 'codegear-webapp',
      script: 'npx',
      args: 'next dev -H 0.0.0.0 -p 3000',
      env: {
        NODE_ENV: 'development',
        PORT: 3000
      },
      watch: false,
      instances: 1,
      exec_mode: 'fork'
    }
  ]
}
