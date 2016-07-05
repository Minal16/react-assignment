import test from 'ava';
import deepFreeze from 'deep-freeze';
import clients from '../client/reducers/clients';
import {
  RECEIVED_INITIAL_CLIENTS_DATA,
  CLIENTS_DATA_LOADING,
} from '../client/actions/actions-constants';
import {
  IS_LOADING,
} from '../client/utils/constants';

test.beforeEach(t => {
  t.context.action = {
    type:    RECEIVED_INITIAL_CLIENTS_DATA,
    payload: [
      {
        general: {
          firstName: 'Some',
          lastName:  'LName',
        },
      },
      {
        general: {
          firstName: 'SomeOtherName',
          lastName:  'OtherLName',
        },
      },
    ],
    ts: Date.now(),
  };
  deepFreeze(t.context.action);
});

test('initial state', t => {
  const newState = clients(undefined, undefined);
  t.deepEqual({ status: undefined, data: [] }, newState);
});

test('setting the state', t => {
  const newState = clients(undefined, t.context.action);
  t.deepEqual(t.context.action.payload.general, newState.data.general);
  t.is(newState.data.length, t.context.action.payload.length);
  t.is(
    newState.data[0]._id,
    `0-${newState.data[0].general.firstName.toLowerCase()}-${newState.data[0].general.lastName.toLowerCase()}` //eslint-disable-line
    );
  t.truthy(newState.ts);
});

test('changing the state', t => {
  const state = { status: undefined, data: [ 'somearray' ] };
  deepFreeze(state);
  const newState = clients(state, t.context.action);
  t.deepEqual(t.context.action.payload.general, newState.data.general);
  t.is(newState.data.length, t.context.action.payload.length);
});

test('invalid data received', t => {
  const state = [
    { some: 'data' },
  ];
  deepFreeze(state);
  const action = {
    type:    RECEIVED_INITIAL_CLIENTS_DATA,
    payload: 'not array',
  };
  deepFreeze(action);
  const newState = clients(state, action);
  t.deepEqual(state, newState);
});

test('receiving data error', t => {
  const state = { status: undefined, data: [ 'somearray' ] };
  deepFreeze(state);
  const errorAction = {
    type:  RECEIVED_INITIAL_CLIENTS_DATA,
    error: 'some error',
  };
  deepFreeze(errorAction);
  const newState = clients(state, errorAction);
  t.deepEqual(state.data, newState.data, 'should not change data');
  t.is(newState.status, errorAction.error);
});

test('start loading', t => {
  const state = { status: undefined, data: [ 'somearray' ] };
  const action = {
    type: CLIENTS_DATA_LOADING,
    ts:   Date.now(),
  };
  deepFreeze(action);
  const newState = clients(state, action);
  t.deepEqual(state.data, newState.data, 'should not change data');
  t.is(newState.status, IS_LOADING);
  t.truthy(newState.ts);
});
