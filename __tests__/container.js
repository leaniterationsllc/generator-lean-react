'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-lean-react:container', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/container'))
      .withArguments('Foo')
      .withPrompts({ componentName: 'Bar' });
  });

  it('create the container files', () => {
    assert.file(['containers/Foo.js', 'containers/Foo.spec.js']);
  });
});
