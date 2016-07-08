import test from 'ava';
import deepFreeze from 'deep-freeze';
import * as actions from '../src/actions';
import {
  RECEIVED_INITIAL_CLIENTS_DATA,
  SET_FILTER,
  SELECT_CLIENT,
  CLIENTS_DATA_LOADING,
} from '../src/actions/actions-constants';

test('receivedInitialClientsData', t => {
  const json = [ { key: 'val' }, { key: 'val1' } ];
  deepFreeze(json);
  const action = actions.receivedInitialClientsData(json);
  t.is(action.type, RECEIVED_INITIAL_CLIENTS_DATA);
  t.true(Date.now() - action.ts < 3000);
  t.falsy(action.status);
});

test('receivedInitialClientsData with an error', t => {
  const json = [ { key: 'val' }, { key: 'val1' } ];
  const err = 'some error';
  deepFreeze(json);
  const action = actions.receivedInitialClientsData(json, err);
  t.is(action.type, RECEIVED_INITIAL_CLIENTS_DATA);
  t.true(Date.now() - action.ts < 3000);
  t.is(action.error, err);
});

test('isLoading', t => {
  const action = actions.clientsDataLoading();
  t.is(action.type, CLIENTS_DATA_LOADING);
  t.true(Date.now() - action.ts < 3000);
});

test('setFilter', t => {
  const str = 'abc';
  const action = actions.setFilter(str);
  t.is(action.type, SET_FILTER);
  t.is(action.payload, str);
});

test('selectClient', t => {
  const id = 'someId';
  const action = actions.selectClient(id);
  t.is(action.type, SELECT_CLIENT);
  t.is(action.payload, id);
});

test('fetchClients', t => {
  const action = actions.fetchClients();
  t.is(typeof action, 'function');
});
