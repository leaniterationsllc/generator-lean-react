'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.argument('name', {
      type: String,
      description: 'Generator name',
      required: false
    });

    // Specify it is a pure functional component.
    this.option('fn', {
      type: Boolean,
      default: false
    });

    this.option('container', {
      type: Boolean,
      default: false
    });

    this.option('location', {
      type: String,
      default: ''
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

    // Prompts.push({
    //   type: 'input',
    //   name: 'location',
    //   message: 'Child Directory',
    //   default: ''
    // });

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = {
        name: this.options.name,
        fn: this.options.fn,
        container: this.options.container,
        location: this.options.location,
        ...props
      };
    });
  }

  writing() {
    const { fn, name, location, container } = this.props;
    const file = fn === true ? 'ComponentFn.ejs' : 'ComponentClass.ejs';
    const base = `components/${location}/${name}`;

    const vars = {
      name,
      container
    };

    this.fs.copyTpl(
      this.templatePath('index.ejs'),
      this.destinationPath(`${base}/index.js`),
      vars
    );

    this.fs.copyTpl(
      this.templatePath(file),
      this.destinationPath(`${base}/${name}.component.js`),
      vars
    );

    this.fs.copyTpl(
      this.templatePath('ComponentSpec.ejs'),
      this.destinationPath(`${base}/${name}.component.spec.js`),
      vars
    );

    // Container
    if (container === true) {
      this.fs.copyTpl(
        this.templatePath('Container.ejs'),
        this.destinationPath(`${base}/${name}.container.js`),
        vars
      );
      this.fs.copyTpl(
        this.templatePath('ContainerSpec.ejs'),
        this.destinationPath(`${base}/${name}.container.spec.js`),
        vars
      );
    }
  }
};
