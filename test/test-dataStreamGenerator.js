import test from 'ava';
import dataStreamGenerator from '../src/utils/dataStreamGenerator';
const CLIENTS_DATA_URL = 'http://jsonplaceholder.typicode.com/users';

test('dataStreamGenerator', t => {
  const ds$ = dataStreamGenerator(CLIENTS_DATA_URL);
  return ds$.do((data) => {
    t.is(data.length, 10);
  });
});

test('dataStreamGenerator - error', t => {
  const ds$ = dataStreamGenerator('http://somenonexistenturlshjshdj.com');
  return ds$.do((err) => {
    t.true(err instanceof Error);
  });
});
