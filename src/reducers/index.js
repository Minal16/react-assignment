import Rx from 'rxjs';
import fetch from 'isomorphic-fetch';
import actions from '../actions';
import {
  IS_LOADING,
  CLIENTS_DATA_URL,
} from '../utils/constants';
import { slugMe, clientsDataModify } from '../utils';
import dataStreamGenerator from '../utils/dataStreamGenerator';
// import clientsData from '../../assets/clients.json';

// const clientsDataModify = (state, data, error, ts) => (

const reducer$ = Rx.Observable.merge(
  actions.clientsDataLoading$.map((ts) => {
    // console.log('CLIENTSDTALOADING');
    return state => ({ ...state, clients: { ...state.clients, status: IS_LOADING, ts } });
  }
  ),

  actions.setFilter$.map((val = '') =>
    state => ({ ...state, filter: val })
  ),

  actions.selectClient$.map((id = '') =>
    state => ({ ...state, selectedClient: id.toString() })
  ),

  actions.receivedClientsData$.map(({ data, error, ts }) => {
    // console.log('RECEIVED CLIENTS DATA: ', data);
    return state => {
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
    };
  }),

  actions.fetchClients$.flatMap((url = CLIENTS_DATA_URL) => {
    const ts = Date.now();
    // console.log('FETCH CLIENTS with: ', url);
    // notify about the loading
    actions.clientsDataLoading$.next(ts);
    return dataStreamGenerator(url);
  }).map(val => {
    // console.log('GOT DATA IN REDUCER: ', val);
    const error = (val instanceof Error) ? val.message : undefined;
    // console.log('ERROR: ', error);
    const data = error ? undefined : val;
    actions.receivedClientsData$.next({ data, error, ts: Date.now() });
    // return val;
    return (state) => state;
  })

  // actions.fetchClients$.map(() => {
  //   const ts = Date.now();
  //   actions.clientsDataLoading$.next(ts);
  //   const val = clientsData;
  //   console.log('GOT DATA IN REDUCER: ', val);
  //   const error = (val instanceof Error) ? val.message : undefined;
  //   const data = error ? undefined : val;
  //   actions.receivedClientsData$.next({ data, error, ts });
  //   return (state) => state;
  // })
);

export default reducer$;


// actions.fetchClients$.map((url = CLIENTS_DATA_URL) => {
//   const ts = Date.now();
//   console.log('FETCH CLIENTS with: ', url);
//   // notify about the loading
//   actions.clientsDataLoading$.next(ts);
//   // return (state) => state;
//
//   return dataStreamGenerator(url)
//   // console.log('DS: ', rv);
//   .map(val => {
//     console.log('GOT DATA IN REDUCER');
//     const error = (val instanceof Error) ? val.message : undefined;
//     const data = error ? undefined : val;
//     actions.receivedClientsData$({ data, error, ts });
//     // return val;
//     return (state) => state;
//   });
//   // return (state) => state;
// })
