const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = env => ({
   mode: env.production ? 'production' : 'development',
   entry: './src/entry.js',
   plugins: [new HtmlWebpackPlugin()],
   output: {
      path: path.resolve(__dirname, './dist'),
      clean: true
   },
   devtool: 'inline-source-map',
   devServer: {
      static: './dist'
   }
})
