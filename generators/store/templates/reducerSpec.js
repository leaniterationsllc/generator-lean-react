import { combineReducers } from 'redux';
import <%= storeName %>, * as from<%= storeCapitalized %> from '..';

const reducer = combineReducers({
  <%= storeName %>,
});

describe('<%= storeName %>', () => {
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