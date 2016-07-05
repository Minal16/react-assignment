import { SELECT_CLIENT } from '../actions/actions-constants';

const selectedClient = (state = '', action) => {
  if (!action || !action.type) return state;
  switch (action.type) {
    case SELECT_CLIENT: {
      const payload = !!action.payload ? action.payload : '';
      if (typeof payload === 'string') {
        const newState = payload;
        return newState;
      }
      return state;
    }
    default: {
      return state;
    }
  }
};

export default selectedClient;
