// import Rx from 'rxjs';
import initialStateDefault$ from './initialStateDefault';

const createState = (reducer$, initialState$ = initialStateDefault$) =>
  initialState$
    .merge(reducer$)
    .scan((state, reducer) => reducer(state))
    .publishReplay(1)
    .refCount();

export default createState;
