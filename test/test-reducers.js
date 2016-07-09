import test from 'ava';
import actions from '../src/actions';
import reducer$ from '../src/reducers';
import {
  IS_LOADING,
} from '../src/utils/constants';
import clients from '../assets/clients.json';

test('setFilter$', t => {
  const initialState = {};
  const valWanted = [
    { filter: 'somefilter' },
    { filter: 'elsefilter' },
    { filter: '' },
  ];
  reducer$.subscribe(fn => {
    t.deepEqual(fn(initialState), valWanted.shift());
  });

  actions.setFilter$.next('somefilter');
  actions.setFilter$.next('elsefilter');
  actions.setFilter$.next();
});

test('clientsDataLoading$', t => {
  const initialState = {};
  const ts = Date.now();
  const valWanted = [
    { clients: { status: IS_LOADING, ts } },
  ];
  reducer$.subscribe(fn => {
    t.deepEqual(fn(initialState), valWanted.shift());
  });

  actions.clientsDataLoading$.next(ts);
});

test('clientsDataLoading$ previous data', t => {
  const ts = Date.now();
  const initialState = {
    clients: { status: undefined, ts: ts - 10000, data: [] },
    filter:  'somefilter',
  };
  const valWanted = [
    {
      clients: { status: IS_LOADING, ts, data: initialState.clients.data },
      filter:  initialState.filter,
    },
  ];
  reducer$.subscribe(fn => {
    t.deepEqual(fn(initialState), valWanted.shift());
  });

  actions.clientsDataLoading$.next(ts);
});

test('selectClient$', t => {
  const initialState = {};
  const valWanted = [
    { selectedClient: 'someid' },
    { selectedClient: '' },
    { selectedClient: '' },
    { selectedClient: 'elseId' },
  ];
  reducer$.subscribe(fn => {
    t.deepEqual(fn(initialState), valWanted.shift());
  });

  actions.selectClient$.next('someid');
  actions.selectClient$.next('');
  actions.selectClient$.next();
  actions.selectClient$.next('elseId');
});

test('receivedClientsData$', t => {
  const initialState = {};
  const ts = Date.now();

  reducer$.subscribe(fn => {
    const clientsState = fn(initialState).clients;
    t.is(clientsState.data.length, clients.length);
    t.truthy(clientsState.data[0]._id);
    t.is(clientsState.ts, ts);
    t.is(clientsState.status, undefined);
    t.is(clientsState.error, undefined);
  });

  const error = undefined;
  actions.receivedClientsData$.next({ data: clients, error, ts });
});
