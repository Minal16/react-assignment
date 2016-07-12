import Rx from 'rxjs';
import createState from './createState';
import reducer$ from '../reducers';
import initialStateDefault$ from './initialStateDefault';

// do you have more reducers?
// const reducer$ = Rx.Observable.merge(
//   CounterReducer$
// );

// if you need hydrate state with initial data
// const initialState$ = Rx.Observable.of(
//   {
//     clients:        { data: [YOUR DATA], ts: 0, status: undefined },
//     filter:         '',
//     selectedClient: '',
//   }
// );

export default createState(reducer$, initialStateDefault$);
