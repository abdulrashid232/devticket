import { createAction, props } from '@ngrx/store';
import { Ticket } from '../../shared/models/ticket.model';

export const loadTickets = createAction('[Ticket List] Load Tickets');

export const loadTicketsSuccess = createAction(
  '[Ticket List] Load Tickets Success',
  props<{ tickets: Ticket[] }>()
);

export const loadTicketsFailure = createAction(
  '[Ticket List] Load Tickets Failure',
  props<{ error: any }>()
);

export const addTicket = createAction(
  '[Ticket List] Add Ticket',
  props<{ ticket: Ticket }>()
);

export const addTicketSuccess = createAction(
  '[Ticket List] Add Ticket Success',
  props<{ ticket: Ticket }>()
);

export const addTicketFailure = createAction(
  '[Ticket List] Add Ticket Failure',
  props<{ error: any }>()
);

export const deleteTicket = createAction(
  '[Ticket List] Delete Ticket',
  props<{ id: number }>()
);

export const deleteTicketSuccess = createAction(
  '[Ticket List] Delete Ticket Success',
  props<{ id: number }>()
);

export const deleteTicketFailure = createAction(
  '[Ticket List] Delete Ticket Failure',
  props<{ error: any }>()
);
