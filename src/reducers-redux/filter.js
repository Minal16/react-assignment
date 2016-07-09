import { SET_FILTER } from '../actions/actions-constants';

const filter = (state = '', action) => {
  if (!action || !action.type) return state;
  switch (action.type) {
    case SET_FILTER: {
      const newState = action.payload;
      return newState;
    }
    default: {
      return state;
    }
  }
};

export default filter;
