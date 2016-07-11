import test from 'ava';
import deepFreeze from 'deep-freeze';
import { findInObj, slugMe } from '../src/utils';
import { IS_ERROR } from '../src/utils/constants';

test('findInObj - plain object', t => {
  const obj = {
    prop1: 'val1',
    prop2: 'aval2i',
  };
  deepFreeze(obj);
  t.true(findInObj(obj, 'val1'));
  t.true(findInObj(obj, 'VAL2'));
  t.false(findInObj(obj, 'nothere'));
});

test('findInObj - nested object', t => {
  const obj = {
    prop1: 'val1',
    prop2: 'aval2i',
    prop3: {
      nprop1: 'nestedv1',
      nprop2: 'nestedv2',
    },
  };
  deepFreeze(obj);
  t.true(findInObj(obj, 'tedv2'));
  t.true(findInObj(obj, 'TEDV1'));
  t.false(findInObj(obj, 'nothere'));
});

// ---

test('slugMe', t => {
  const txtIn = 'hello Some TEXT here';
  const txtWant = 'hello-some-text-here';
  t.is(slugMe(txtIn), txtWant);
});

// ---

// export const clientsDataModify = (state, data, error, ts) => (
//   {
//     ...state,
//     clients: {
//       ...state.clients,
//       data,
//       ts,
//       status: error ? 'IS_ERROR' : undefined,
//       error,
//     },
//   }
// );

// test.only('clientsDataModify data', t => {
//   const state = { filter: 'ahoj' };
//   const data = [ 1, 2, 3 ];
//   const ts = Date.now();
//   const wanna = Object.assign(
//     {},
//     state,
//     { clients: { data, ts, status: undefined, error: undefined } }
//   );
//   t.deepEqual(clientsDataModify(state, data, undefined, ts), wanna);
// });
//
// test.only('clientsDataModify data', t => {
//   const state = { filter: 'ahoj', clients: { data: [ 1, 2, 3 ] } };
//   const err = 'some error';
//   const ts = Date.now();
//   const wanna = Object.assign(
//     {},
//     state
//   );
//   wanna.clients = { data: state.clients.data, status: IS_ERROR, error: err, ts };
//   t.deepEqual(clientsDataModify(state, undefined, err, ts), wanna);
// });
