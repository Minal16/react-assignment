import Rx from 'rxjs';
import createState from './createState';
import reducer$ from '../reducers';

// do you have more reducers?
// const reducer$ = Rx.Observable.merge(
//   CounterReducer$
// );

// if you need hydrate state with initial data
const initialState$ = Rx.Observable.of({});

export default createState(reducer$, initialState$);
