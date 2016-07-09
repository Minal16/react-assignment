import { combineReducers } from 'redux';
import clients from './clients';
import filter from './filter';
import selectedClient from './selectedClient';

const clientsApp = combineReducers({
  clients,
  filter,
  selectedClient,
});

export default clientsApp;
