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
      'Angular',
      'jQuery',
      'ejs',
      'None'
    ]
  },
  {
    type: 'list',
    name: 'backend',
    message: 'What are you using for back end?',
    choices: [
      'Express',
      'Flask',
      'Django',
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

inquirer.prompt(questions)
.then((answers) => {
  func.processAnswers(answers);
})
