'use strict';
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');

describe('generator-lean-react:store', () => {
  describe('with name prompt', () => {
    beforeAll(() => {
      return helpers
        .run(path.join(__dirname, '../generators/store'))
        .withPrompts({ name: 'foo' });
    });

    it('create the store file structure', () => {
      assert.file(['store/foo/actions/index.js']);
      assert.file(['store/foo/_constants.js']);
      assert.file(['store/foo/reducers/index.js']);
      assert.file(['store/foo/__tests__/reducer.spec.js']);
      assert.file(['store/foo/index.js']);
      assert.file(['store/foo/sagas/index.js']);
      assert.file(['store/foo/selectors/index.js']);
    });
  });
});
