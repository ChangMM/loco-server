const webpack = require('webpack')
const path = require('path')
const nodeExternals = require('webpack-node-externals')
const StartServer = require('tie-webpack-start-server')

const cwd = process.cwd()
const app = path.join(cwd, 'generated', 'app.ts')

module.exports = {
  entry: ['webpack/hot/poll?100', app],
  watch: true,
  target: 'node',
  externals: [
    nodeExternals({
      whitelist: ['webpack/hot/poll?100'],
    }),
  ],
  module: {
    rules: [
      {
        test: /.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'development',
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      '@typings': path.resolve(__dirname, 'typings/'),
      '@hook': path.resolve(__dirname, 'hook/'),
      '@shared': path.resolve(__dirname, 'shared/'),
      '@middleware': path.resolve(__dirname, 'middleware/'),
      '@graphql-middleware': path.resolve(__dirname, 'graphql-middleware/'),
      '@plugin': path.resolve(__dirname, 'plugin/'),
      '@module': path.resolve(__dirname, 'module/'),
      '@generated': path.resolve(__dirname, 'generated/'),
      '@ability': path.resolve(__dirname, 'ability/'),
    },
  },
  plugins: [new webpack.HotModuleReplacementPlugin(), new StartServer({ name: 'server.js' })],
  output: {
    path: path.join(cwd, 'generated'),
    filename: 'server.js',
  },
}
