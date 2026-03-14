import { createReducer, on } from '@ngrx/store';
import { Ticket } from '../../shared/models/ticket.model';
import * as TicketActions from './ticket.actions';

export interface TicketState {
  tickets: Ticket[];
  loading: boolean;
  error: any;
}

export const initialState: TicketState = {
  tickets: [],
  loading: false,
  error: null,
};

export const ticketReducer = createReducer(
  initialState,
  on(TicketActions.loadTickets, (state) => ({ ...state, loading: true })),


  on(TicketActions.loadTicketsSuccess, (state, { tickets }) => ({
    ...state,
    loading: false,
    tickets,
  })),


  on(TicketActions.loadTicketsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),


  on(TicketActions.addTicketSuccess, (state, { ticket }) => ({
    ...state,
    tickets: [...state.tickets, ticket],
  })),

  on(TicketActions.deleteTicketSuccess, (state, { id }) => ({
    ...state,
    tickets: state.tickets.filter((t) => t.id !== id),
  }))
  
);
