import test from 'ava';
import deepFreeze from 'deep-freeze';
import clients from '../src/reducers/filter';
import { SET_FILTER } from '../src/actions/actions-constants';

test('initial state', t => {
  const newState = clients(undefined, undefined);
  t.is('', newState);
});

test('setting the state', t => {
  const action = {
    type:    SET_FILTER,
    payload: 'ab',
  };
  const newState = clients(undefined, action);
  t.is(action.payload, newState);
});

test('changing the state', t => {
  const state = 'xy';
  deepFreeze(state);
  const action = {
    type:    SET_FILTER,
    payload: 'abc',
  };
  const newState = clients(state, action);
  t.is(action.payload, newState);
});
