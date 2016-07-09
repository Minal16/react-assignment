import Rx from 'rxjs';

const actions = {
  clientsDataLoading$:  new Rx.Subject,
  setFilter$:           new Rx.Subject,
  selectClient$:        new Rx.Subject,
  receivedClientsData$: new Rx.Subject,
};

export default actions;
