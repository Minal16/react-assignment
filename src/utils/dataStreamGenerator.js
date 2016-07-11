import Rx from 'rxjs';
import 'rxjs/add/operator/catch';
import fetch from 'isomorphic-fetch';
import {
  CLIENTS_DATA_URL,
} from './constants';

const dataStreamGenerator = (url = CLIENTS_DATA_URL) => (
  Rx.Observable.fromPromise(fetch(url))
  .flatMap(response => Rx.Observable.fromPromise(response.json()))
  .catch(err => Rx.Observable.of(new Error(err)))
);

export default dataStreamGenerator;
