import { connect } from 'react-redux';
import Detail from './Detail';

const findClient = (id, clientsData) => clientsData.filter(client => (client._id === id))[0];

const mapStateToProps = (state) => ({
  clientData: findClient(state.selectedClient, state.clients.data),
});

const DetailContainer = connect(
  mapStateToProps
)(Detail);

export default DetailContainer;
