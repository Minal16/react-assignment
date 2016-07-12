import Rx from 'rxjs';
import actions from '../actions';
import {
  IS_LOADING,
  CLIENTS_DATA_URL,
} from '../utils/constants';
import { slugMe } from '../utils';
import dataStreamGenerator from '../utils/dataStreamGenerator';

const reducer$ = Rx.Observable.merge(

  actions.clientsDataLoading$
  .map((ts) => state => ({ ...state, clients: { ...state.clients, status: IS_LOADING, ts } })),


  actions.setFilter$
  .map((val = '') => state => ({ ...state, filter: val })),


  actions.selectClient$
  .map((id = '') => state => ({ ...state, selectedClient: id.toString() })),


  actions.receivedClientsData$
  .map(({ data, error, ts }) => state => {
    if (error) {
      const err = typeof error === 'object' ? error.message : error;
      return { ...state, clients: { ...state.clients, status: err, ts } };
    }
    if (Array.isArray(data)) {
      const newState = {};
      newState.data = data.map(i => Object.assign({}, i));
      newState.data.map((item, index) => {
        item._id = slugMe(`${index} ${item.general.firstName} ${item.general.lastName}`);
        return item;
      });
      return { ...state, clients: { ...newState, status: undefined, ts } };
    }
    return state;
  }),


  actions.fetchClients$
  .flatMap((url = CLIENTS_DATA_URL) => {
    const ts = Date.now();
    // notify about the loading
    actions.clientsDataLoading$.next(ts);
    return dataStreamGenerator(url);
  }).map(val => {
    const ts = Date.now();
    const error = (val instanceof Error) ? val.message : undefined;
    const data = error ? undefined : val;
    // pdate state
    actions.receivedClientsData$.next({ data, error, ts });
    return (state) => state;
  })

);

export default reducer$;
