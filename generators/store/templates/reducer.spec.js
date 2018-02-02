import { combineReducers } from 'redux';
import <%= storeName %>, * as from<%= storeName %> from '..';

const reducer = combineReducers({
  <%= storeName %>,
});

describe('<%= componentName %>', () => {
  let defaultState;

  beforeEach(() => {
    defaultState = {};
  });

  test('default state', () => {
    let empty;
    const state = reducer(empty, { type: 'NOOP' });

    expect(state).toEqual(defaultState);
  });
});