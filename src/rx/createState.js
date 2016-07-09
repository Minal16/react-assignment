import Rx from 'rxjs';

const createState = (reducer$, initialState$ = Rx.Observable.of({})) =>
  initialState$
    .merge(reducer$)
    .scan((state, reducer) => reducer(state))
    .publishReplay(1)
    .refCount();

export default createState;
