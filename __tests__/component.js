'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-lean-react:component', () => {
  describe('with fn option', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/component'))
        .withOptions({ fn: true })
        .withPrompts({ name: 'Foo' });
    });

    it('create the component files', () => {
      assert.file(['components/Foo.js']);
    });

    it('it is a functional component', () => {
      assert.fileContent('components/Foo.js', /const Foo = \(\) => \{/);
    });
  });

  describe('with name option', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/component'))
        .withOptions({ name: 'Foo' })
        .withPrompts({ fn: false });
    });

    it('create the component files', () => {
      assert.file(['components/Foo.js']);
    });

    it('it is a functional component', () => {
      assert.fileContent('components/Foo.js', /class Foo extends Component/);
    });
  });
});
