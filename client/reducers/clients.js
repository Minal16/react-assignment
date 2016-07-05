import {
  RECEIVED_INITIAL_CLIENTS_DATA,
  CLIENTS_DATA_LOADING,
} from '../actions/actions-constants';
import {
  IS_LOADING,
} from '../utils/constants';

const slug = (str) => str.replace(/\s/g, '-').toLowerCase();

const clients = (state, action) => {
  state = state || {
    data:   [],
    status: undefined,
  };
  if (!action || !action.type) return state;

  switch (action.type) {
    case RECEIVED_INITIAL_CLIENTS_DATA: {
      if (action.error) {
        const err = typeof action.error === 'object' ? action.error.message : action.error;
        return { ...state, status: err, ts: action.ts };
      }
      if (Array.isArray(action.payload)) {
        const newState = {};
        newState.data = action.payload.map(i => Object.assign({}, i));
        newState.data.map((item, index) => {
          item._id = slug(`${index} ${item.general.firstName} ${item.general.lastName}`);
          return item;
        });
        return { ...newState, status: undefined, ts: action.ts };
      }
      return state;
    }
    case CLIENTS_DATA_LOADING: {
      return { ...state, status: IS_LOADING, ts: action.ts };
    }
    default: {
      return state;
    }
  }
};

export default clients;
