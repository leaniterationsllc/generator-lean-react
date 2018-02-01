"use strict";
const Generator = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");

module.exports = class extends Generator {
  constructor(args, opts) {
    super(args, opts);

    // Specify it is a pure functional component.
    this.option("functional", {
      type: Boolean,
      default: false
    });

    // Component name
    this.option("name", {
      type: String
    });
  }
  prompting() {
    // Have Yeoman greet the user.
    this.log(
      yosay(
        "Welcome to the flawless " +
          chalk.red("generator-lean-react") +
          " generator!"
      )
    );

    const prompts = [];

    if (typeof this.options.name === "undefined") {
      prompts.push({
        type: "input",
        name: "name",
        message: "Component Name?",
        required: true
      });
    }
    console.log(JSON.stringify(this.options));
    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = {
        name: this.options.name,
        functional: this.options.functional,
        ...props
      };
    });
  }

  writing() {
    const { functional, name } = this.props;
    const file = functional === true ? "ComponentFn.js" : "ComponentClass.js";
    console.log("The file", file);
    this.fs.copyTpl(
      this.templatePath(file),
      this.destinationPath(`components/${name}.js`),
      {
        componentName: name
      }
    );
  }
};
