import test from 'ava';
import createState from '../client/rxjs/createState';
// import Rx from 'rxjs-es/Rx';
import Rx from 'rxjs';


test.only('creates state$ with initialState$', t => {
  const reducer$ = new Rx.Subject();
  const initialState$ = Rx.Observable.of({ counter: -10 });
  const reducer = state => ({ ...state, counter: state.counter + 1 });
  const state$ = createState(reducer$, initialState$);

  state$.toArray().subscribe(results => {
    t.deepEqual(results, [
      { counter: -10 },
      { counter: -9 },
      { counter: -8 },
      { counter: -7 },
    ]);
  }, () => {});

  reducer$.next(reducer);
  reducer$.next(reducer);
  reducer$.next(reducer);
  reducer$.complete();
});
