'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      description: 'Saga name'
    });
  }

  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay('Welcome to the premium ' + chalk.red('generator-lean-react') + ' generator!')
    );

    const prompts = [
      {
        type: 'input',
        name: 'store',
        message: 'Store?',
        required: true
      }
    ];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = {
        name: this.options.name,
        ...props
      };
    });
  }

  writing() {
    const { name, store } = this.props;
    const directory = `store/${store}/sagas`;
    const vars = {
      name,
      funcName: `on${name[0].toUpperCase()}${name.substring(1)}`
    };

    this.fs.copyTpl(
      this.templatePath('saga.ejs'),
      this.destinationPath(`${directory}/${name}.js`),
      vars
    );

    this.fs.copyTpl(
      this.templatePath('sagaSpec.ejs'),
      this.destinationPath(`${directory}/${name}.spec.js`),
      vars
    );
  }
};
