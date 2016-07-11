// / ---- ASYNC ----
//
// const fetchData = (dispatch) => fetch(CLIENTS_DATA_URL)
//   .then(response => response.json())
//   .then(json => dispatch(receivedInitialClientsData(json)))
//   .catch(err => dispatch(receivedInitialClientsData(undefined, err)));
//
// export const fetchClients = () => (dispatch, getState) => {
//   if (Date.now() - getState().clients.ts < OUTDATED_LOADING) return Promise.resolve();
//   dispatch(clientsDataLoading());
//   return fetchData(dispatch);
// };
//
//
// UserActions.fetch$.concatMap(userId => {
//   return Rx.Observable.ajax(`/users/${userId}`)
//     .retryWhen(err$ => err$.delay(1000).take(10));
// });

import fetch from 'isomorphic-fetch';
import Rx from 'rxjs';
// import { CLIENTS_DATA_URL } from '../utils/constants';

const CLIENTS_DATA_URL = 'http://jsonplaceholder.typicode.com/users';

const fetchPromiseGenerator = () => fetch(CLIENTS_DATA_URL);

// export const responseStream$ = Rx.Observable.fromPromise(fetchPromise);
// export const jsonStream$ = Rx.Observable.fromPromise(response.json());
// this will return stream - the output should be another

// map(() => {
//   Rx.Observable.fromPromise(fetchPromise)
//     .map(response => Rx.Observable.fromPromise(response.json()))
//     .map(data => console.log(data));
// });

const dataStream$ = Rx.Observable.fromPromise(fetchPromiseGenerator())
  .flatMap(
    response => {
      if (response.ok) return Rx.Observable.fromPromise(response.json());
      return Rx.Observable.throw(Error(response.statusText));
    }
  );

export const getStream = () => dataStream$;
