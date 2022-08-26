const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist',
    overlay: {
      warnings: true,
      errors: true,
    },
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, 'src/MyLoader/my-loader.js'),
            options: {
              flag: true,
            }
          },
        ],
      }
    ],
  },
  // // 先从node_modules下找这个loader, 再从自定义loader路径寻找
  // resolveLoader: {
  //   modules: ['node_modules', path.resolve(__dirname, 'src/MyLoader')],
  // },
};