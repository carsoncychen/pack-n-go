const fs = require('fs');
const path = require('path');


// let webpackBeginStr =
let entry
let mode
let output
let webpackConfig =
`const path = require('path')

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets:
            [
              'babel-preset-react',
              'babel-preset-env'
            ]
          }
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}
`


module.exports = {

  processAnswers: (answers) => {
    console.log(answers);

  },

  readWebPack: () => {
    fs.readFile('webpack.config.js', 'utf8', (err, data) => {
      if (err) throw err;

      console.log(data);
    })
  },

  createWebPack: () => {
    fs.writeFile('webpack.config.js', webpackConfig, (err) => {
      if (err) return console.log(err);
      module.exports.readWebPack();
    })
  }
}

