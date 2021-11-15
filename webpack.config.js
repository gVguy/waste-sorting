const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanTerminalPlugin = require('clean-terminal-webpack-plugin')

module.exports = env => ({
   mode: env.production ? 'production' : 'development',
   entry: './src/entry.js',
   plugins: [new HtmlWebpackPlugin(), new CleanTerminalPlugin()],
   output: {
      path: path.resolve(__dirname, './dist'),
      clean: true
   },
   devtool: 'inline-source-map',
   devServer: {
      static: './dist'
   },
   stats: {
      preset: 'errors-warnings'
   }
})
