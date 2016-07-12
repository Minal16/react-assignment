import Rx from 'rxjs';

const initialStateDefault$ = Rx.Observable.of(
  {
    clients:        { data: [], ts: 0, status: undefined },
    filter:         '',
    selectedClient: '',
  }
);

export default initialStateDefault$;
