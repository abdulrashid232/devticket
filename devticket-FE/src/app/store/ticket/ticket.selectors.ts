import { createFeatureSelector, createSelector } from '@ngrx/store';
import { TicketState } from './ticket.reducer';

export const selectTicketState = createFeatureSelector<TicketState>('tickets');

export const selectAllTickets = createSelector(
  selectTicketState,
  (state) => state.tickets
);

export const selectTicketLoading = createSelector(
  selectTicketState,
  (state) => state.loading
);

export const selectTicketError = createSelector(
  selectTicketState,
  (state) => state.error
);
