import test from 'ava';
import * as rxs from '../src/actions/asyncA';

// test('fetchPromise', t => {
//   const fp = fetchPromise;
//   console.log('FP: ', fp);
//   fp.then(a => {
//     console.log('resolved: ', a);
//     t.pass();
//   })
// });

test('what$', t => {
  const stream$ = rxs.getStream();
  return stream$
    .map(
      (data) => {
        console.log('data: ', data);
        console.log('---');
        t.is(data.length, 10);
        return data;
      }
  );

});
