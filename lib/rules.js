module.exports = {
  reactLoader:
  `
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:
            [
              '@babel/preset-react',
              '@babel/preset-env'
            ]
          }
        }
      }`,
  sassLoader:
  `
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }`,
  cssLoader:
    `
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader']
      }`,
  lessLoader:
    `
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'less-loader']
      }`,
}
