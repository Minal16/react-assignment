import test from 'ava';
import Rx from 'rxjs';
import actionToStream from '../src/rx/actionToStream';

test('wraps subject.next', t => {
  const action$ = new Rx.Subject;
  const action = actionToStream(action$);
  const valWanted = [
    1,
    'some',
    { some: 'object' },
  ];

  action$.subscribe(val => {
    t.deepEqual(val, valWanted.shift());
  });

  action(1);
  action('some');
  action({ some: 'object' });
});
