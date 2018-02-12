'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-lean-react:page', () => {
  beforeAll(() => {
    return helpers.run(path.join(__dirname, '../generators/page')).withArguments('Foo');
  });

  it('create the page files', () => {
    assert.file(['pages/Foo.js', 'pages/Foo.spec.js']);
  });
});
