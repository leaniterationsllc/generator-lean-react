'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      description: 'Container name',
      required: false
    });
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the flawless ' + chalk.red('generator-lean-react') + ' generator!'
      )
    );

    const prompts = [];

    if (typeof this.options.name === 'undefined') {
      prompts.push({
        type: 'input',
        name: 'name',
        message: 'Container name?',
        required: true
      });
    }

    prompts.push({
      type: 'input',
      name: 'componentName',
      message: 'Wrapped component name?',
      required: true
    });

    prompts.push({
      type: 'input',
      name: 'storeName',
      message: 'Store Name?',
      required: true
    });

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = {
        name: this.options.name,
        ...props
      };
    });
  }

  writing() {
    const { name, componentName, storeName } = this.props;
    const file = 'Container.ejs';
    const base = 'containers';

    const vars = {
      name,
      componentName,
      storeName
    };

    this.fs.copyTpl(
      this.templatePath(file),
      this.destinationPath(`${base}/${name}.js`),
      vars
    );

    this.fs.copyTpl(
      this.templatePath('ContainerSpec.ejs'),
      this.destinationPath(`${base}/${name}.spec.js`),
      vars
    );
  }
};
