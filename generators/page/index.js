'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      description: 'Page name',
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
        message: 'Page name?',
        required: true
      });
    }

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = {
        name: this.options.name,
        ...props
      };
    });
  }

  writing() {
    const { name } = this.props;
    const file = 'Component.ejs';
    const base = 'pages';

    this.fs.copyTpl(this.templatePath(file), this.destinationPath(`${base}/${name}.js`), {
      componentName: name
    });

    this.fs.copyTpl(
      this.templatePath('ComponentSpec.ejs'),
      this.destinationPath(`${base}/${name}.spec.js`),
      {
        componentName: name
      }
    );
  }
};
