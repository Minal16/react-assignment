import fetch from 'isomorphic-fetch';
import {
  RECEIVED_INITIAL_CLIENTS_DATA,
  SET_FILTER,
  SELECT_CLIENT,
  CLIENTS_DATA_LOADING,
} from './actions-constants';
import {
  OUTDATED_LOADING,
  CLIENTS_DATA_URL,
} from '../utils/constants';

export const receivedInitialClientsData = (json, err) => (
  {
    type:    RECEIVED_INITIAL_CLIENTS_DATA,
    payload: json,
    error:   err,
    ts:      Date.now(),
  }
);

export const clientsDataLoading = () => (
  {
    type: CLIENTS_DATA_LOADING,
    ts:   Date.now(),
  }
);

export const setFilter = (str) => (
  {
    type:    SET_FILTER,
    payload: str,
  }
);

export const selectClient = (id) => (
  {
    type:    SELECT_CLIENT,
    payload: id,
  }
);

// ---- ASYNC ----

const fetchData = (dispatch) => fetch(CLIENTS_DATA_URL)
  .then(response => response.json())
  .then(json => dispatch(receivedInitialClientsData(json)))
  .catch(err => dispatch(receivedInitialClientsData(undefined, err)));

export const fetchClients = () => (dispatch, getState) => {
  if (Date.now() - getState().clients.ts < OUTDATED_LOADING) return Promise.resolve();
  dispatch(clientsDataLoading());
  return fetchData(dispatch);
};
