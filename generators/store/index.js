'use strict';
const Generator = require('yeoman-generator');
const chalk = require('chalk');
const yosay = require('yosay');

module.exports = class extends Generator {
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        'Welcome to the flawless ' + chalk.red('generator-lean-react') + ' generator!'
      )
    );

    const prompts = [];

    prompts.push({
      type: 'input',
      name: 'name',
      message: 'Store name?',
      required: true
    });

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = {
        ...props
      };
    });
  }

  writing() {
    const { name: storeName } = this.props;
    const vars = {
      storeName,
      storeCapitalized: `${storeName[0].toUpperCase()}${storeName.substring(1)}`
    };

    this.fs.copyTpl(
      this.templatePath('actions.js'),
      this.destinationPath(`store/${storeName}/actions/index.js`),
      vars
    );

    this.fs.copyTpl(
      this.templatePath('constants.js'),
      this.destinationPath(`store/${storeName}/_constants.js`),
      vars
    );

    this.fs.copyTpl(
      this.templatePath('reducer.js'),
      this.destinationPath(`store/${storeName}/reducers/index.js`),
      vars
    );

    this.fs.copyTpl(
      this.templatePath('reducerSpec.js'),
      this.destinationPath(`store/${storeName}/__tests__/reducer.spec.js`),
      vars
    );

    this.fs.copyTpl(
      this.templatePath('root.js'),
      this.destinationPath(`store/${storeName}/index.js`),
      vars
    );

    this.fs.copyTpl(
      this.templatePath('saga.js'),
      this.destinationPath(`store/${storeName}/sagas/index.js`),
      vars
    );

    this.fs.copyTpl(
      this.templatePath('selectors.js'),
      this.destinationPath(`store/${storeName}/selectors/index.js`),
      vars
    );
  }
};
