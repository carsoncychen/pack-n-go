const fs = require('fs');
const path = require('path');
const rulesLib = require('./rules.js');

let webpackBeginStr = `const path = require('path')

module.exports = {
  mode: 'development',
  entry: './client/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js'
  },
  module: {
    rules: [`
let webpackEndStr = `
    ]
  },
  resolve: {
    extensions: ['*', '.js', '.jsx']
  }
}`

let rules = [];
let webpackConfig;
let dependencies = {

};
let devDependencies = {
  "webpack": "^4.29.2",
  "webpack-cli": "^3.2.3"
}

module.exports = {

  checkForPackageJson: () => {
    return fs.existsSync('package.json')
  },

  processJsonDep: (parsedData, newDependencies, newDevDependencies) => {
    return {
      ...parsedData,
      "dependencies": {
        ...parsedData.dependencies,
        ...newDependencies
      },
      "devDependencies": {
        ...parsedData.devDependencies,
        ...newDevDependencies
      }
    }
  },

  checkAnswer: (answer) => {
    switch (answer) {
      case 'React':
        rules.push(rulesLib.reactLoader);
        dependencies = {
          ...dependencies,
          "react": "^16.5.2",
          "react-dom": "^16.5.2",

        }
        devDependencies = {
          ...devDependencies,
          "@babel/core": "^7.2.2",
          "@babel/preset-env": "^7.3.1",
          "@babel/preset-react": "^7.0.0",
          "babel-loader": "^8.0.5",
        }
        break;
      case 'Vue':
        // rules.push(rulesLib.vueLoader);
        break;
      case 'Express':
        dependencies = {
          ...dependencies,
          "express": "^4.16.4"
        }
        break;
      case 'PSQL':
        dependencies = {
          ...dependencies,
          "pg-promise": "^8.5.5"
        }
        break;
      case 'MongoDB':
        dependencies = {
          ...dependencies,
          "mongodb": "^3.1.13"
        }
        break;
      case 'Mongoose':
        dependencies = {
          ...dependencies,
          "mongodb": "^3.1.13",
          "mongoose": "^5.4.10"
        }
        break;
      case 'CSS':
        rules.push(rulesLib.cssLoader);
        devDependencies = {
          ...devDependencies,
          "css-loader": "^2.1.0",
          "style-loader": "^0.23.1"
        }
        break;
      case 'SASS':
        rules.push(rulesLib.sassLoader)
        devDependencies = {
          ...devDependencies,
          "css-loader": "^2.1.0",
          "style-loader": "^0.23.1",
          "sass-loader": "^7.1.0"
        }
        break;
      case 'LESS':
        rules.push(rulesLib.lessLoader);
        devDependencies = {
          ...devDependencies,
          "css-loader": "^2.1.0",
          "style-loader": "^0.23.1",
          "less-loader": "^4.1.0"
        }
        break;
      default:
        break;
    }
  },

  processAnswers: async (answers) => {
    for (let key in answers) {
      await module.exports.checkAnswer(answers[key]);
    }

    return rules;
  },

  readPackageJson: (dependencies, devDependencies) => {
    fs.readFile('package.json', 'utf8', (err, data) => {
      if (err) throw err;
      const parsedData = JSON.parse(data)
      const newJson = module.exports.processJsonDep(parsedData, dependencies, devDependencies);
      const stringed = JSON.stringify(newJson, null, '\t')
      fs.writeFile('package.json', stringed, 'utf8', (err) => {
        if (err) return console.log(err);
      })
    })
  },

  readWebPack: () => {
    fs.readFile('webpack.config.js', 'utf8', (err, data) => {
      if (err) throw err;
      // console.log(data);
    })
  },

  createWebPack: (newRules) => {
    webpackConfig = webpackBeginStr.concat(newRules, webpackEndStr);
    fs.writeFile('webpack.config.js', webpackConfig, (err) => {
      if (err) return console.log(err);
      module.exports.readWebPack();
    })
    module.exports.readPackageJson(dependencies, devDependencies);
  }
}

