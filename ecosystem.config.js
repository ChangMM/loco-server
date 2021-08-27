module.exports = {
  apps: [
    {
      name: 'loco-server',
      script: 'generated/app.js',
      watch: false,
      node_args: '-r tsconfig-paths/register', // node的启动模式
      // instances: 8, //将应用程序分布在所有CPU核心上,可以是整数或负数
      instances: 'max',
      // instance_var: 'INSTANCE_ID',
      exec_mode: 'cluster',
      env: {
        NODE_ENV: 'development',
      },

      env_test: {
        NODE_ENV: 'test',
        // PORT: 5001,

        // 执行定时任务的 ip
        HOST: '127.0.0.1',
      },
      env_production: {
        NODE_ENV: 'production',
        // PORT: 5001,

        // 执行定时任务的 ip
        HOST: '127.0.0.1',
      },
    },
  ],
}
