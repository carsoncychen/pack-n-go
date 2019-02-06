#!/usr/bin/env node

const func = require('../lib/index.js');
const inquirer = require('inquirer');

const questions = [
  {
    type: 'list',
    name: 'frontend',
    message: 'What are you using for front end?',
    choices: [
      'React',
      'Vue',
      'None'
    ]
  },
  {
    type: 'list',
    name: 'backend',
    message: 'What are you using for back end?',
    choices: [
      'Express',
      'Node',
      'None'
    ]
  },
  {
    type: 'list',
    name: 'database',
    message: 'What are you using for database?',
    choices: [
      'PSQL',
      'MongoDB',
      'Mongoose',
      'None'
    ]
  },
  {
    type: 'list',
    name: 'css',
    message: 'What are you using for styling?',
    choices: [
      'CSS',
      'SASS',
      'LESS'
    ]
  }
]

if (!func.checkForPackageJson()) {
  console.log('Requires package.json file, please set up the file and try again.')
  process.exit();
} else {
  inquirer.prompt(questions)
    .then((answers) => {
      func.processAnswers(answers).then((newRules) => {
        func.createWebPack(newRules)
      });
    })
}


