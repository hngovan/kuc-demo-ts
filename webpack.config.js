const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

const devMode = process.env.NODE_ENV !== 'production'
module.exports = {
  entry: './src/main.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [devMode ? 'style-loader' : MiniCssExtractPlugin.loader, 'css-loader']
      }
    ]
  },
  plugins: [
    ...(devMode
      ? []
      : [
          new MiniCssExtractPlugin({
            filename: '[name].[contenthash].css'
          })
        ])
  ],
  optimization: {
    minimizer: ['...', new CssMinimizerPlugin()]
  },
  resolve: {
    extensions: ['.ts', '.js']
  },
  performance: {
    hints: false,
    maxAssetSize: 512000, // 500 KiB
    maxEntrypointSize: 512000, // 500 KiB
    assetFilter: (assetFilename) => assetFilename.endsWith('.js')
  },
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist')
  }
}
