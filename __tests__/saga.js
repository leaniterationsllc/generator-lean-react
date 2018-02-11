'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-lean-react:saga', () => {
  beforeAll(() => {
    return helpers
      .run(path.join(__dirname, '../generators/saga'))
      .withArguments('foo')
      .withPrompts({ store: 'blah' });
  });

  it('creates files', () => {
    assert.file(['store/blah/sagas/foo.js']);
  });
});
