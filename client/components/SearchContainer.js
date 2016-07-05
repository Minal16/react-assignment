import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { setFilter } from '../actions';
import Search from './Search';

const mapStateToProps = (state) => ({
  filter: state.filter,
});
const mapDispatechToProps = (dispatch) => (
  bindActionCreators({ setFilter }, dispatch)
);

const SearchContainer = connect(
  mapStateToProps,
  mapDispatechToProps
)(Search);

export default SearchContainer;
