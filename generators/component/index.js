'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Specify it is a pure functional component.
    this.option('fn', {
      type: Boolean,
      default: false
    });

    // Component name
    this.option('name', {
      type: String
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
        message: 'Component Name?',
        required: true
      });
    }
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = {
        name: this.options.name,
        fn: this.options.fn,
        ...props
      };
    });
  }

  writing() {
    const { fn, name } = this.props;
    const file = fn === true ? 'ComponentFn.js' : 'ComponentClass.js';
    this.fs.copyTpl(
      this.templatePath(file),
      this.destinationPath(`components/${name}.js`),
      {
        componentName: name
      }
    );
  }
};
