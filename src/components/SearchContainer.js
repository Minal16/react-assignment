import { connectWithState } from '../rx/connectWithState';
import actions from '../actions';
import actionToStream from '../rx/actionToStream';
import Search from './Search';

const selector = (state) => ({
  filter:    state.filter,
  setFilter: actionToStream(actions.setFilter$),
});

const SearchContainer = connectWithState(selector)(Search);

export default SearchContainer;
