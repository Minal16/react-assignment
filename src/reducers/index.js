import Rx from 'rxjs';
import actions from '../actions';
import {
  IS_LOADING,
} from '../utils/constants';
import { slugMe } from '../utils';


const reducer$ = Rx.Observable.merge(
  actions.clientsDataLoading$.map((ts) =>
    state => ({ ...state, clients: { ...state.clients, status: IS_LOADING, ts } })
  ),

  actions.setFilter$.map((val = '') =>
    state => ({ ...state, filter: val })
  ),

  actions.selectClient$.map((id = '') =>
    state => ({ ...state, selectedClient: id.toString() })
  ),

  actions.receivedClientsData$.map(({ data, error, ts }) =>
    state => {
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
    }
  ),

  actions.fetchClients$.map((id = '') =>
    state => ({ ...state, selectedClient: id.toString() })
  )

);

export default reducer$;
