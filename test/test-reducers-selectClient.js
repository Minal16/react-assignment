import test from 'ava';
import deepFreeze from 'deep-freeze';
import clients from '../client/reducers/selectedClient';
import { SELECT_CLIENT } from '../client/actions/actions-constants';

test('initial state', t => {
  const newState = clients(undefined, undefined);
  t.is('', newState);
});

test('setting the state', t => {
  const action = {
    type:    SELECT_CLIENT,
    payload: 'someId',
  };
  const newState = clients(undefined, action);
  t.is(action.payload, newState);
});

test('changing the state', t => {
  const state = 'someId';
  deepFreeze(state);
  const action = {
    type:    SELECT_CLIENT,
    payload: 'differentId',
  };
  const newState = clients(state, action);
  t.is(action.payload, newState);
});

test('resetting the state', t => {
  const state = 'someId';
  deepFreeze(state);
  const action = {
    type:    SELECT_CLIENT,
    payload: undefined,
  };
  const newState = clients(state, action);
  t.is('', newState);
});

test('resetting the state with empty string', t => {
  const state = 'someId';
  deepFreeze(state);
  const action = {
    type:    SELECT_CLIENT,
    payload: '',
  };
  const newState = clients(state, action);
  t.is('', newState);
});

test('invalid data', t => {
  const state = 1;
  deepFreeze(state);
  const action = {
    type:    SELECT_CLIENT,
    payload: { some: 'object' },
  };
  const newState = clients(state, action);
  t.is(state, newState);
});
