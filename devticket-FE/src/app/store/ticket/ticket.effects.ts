import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { TicketService } from '../../core/services/ticket.service';
import * as TicketActions from './ticket.actions';

@Injectable()
export class TicketEffects {
  private readonly actions$ = inject(Actions);
  private readonly ticketService = inject(TicketService);

  loadTickets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.loadTickets),
      mergeMap(() =>
        this.ticketService.getTickets().pipe(
          map((tickets) => TicketActions.loadTicketsSuccess({ tickets })),
          catchError((error) => of(TicketActions.loadTicketsFailure({ error })))
        )
      )
    )
  );

  addTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.addTicket),
      mergeMap(({ ticket }) =>
        this.ticketService.addTicket(ticket).pipe(
          map((newTicket) => TicketActions.addTicketSuccess({ ticket: newTicket })),
          catchError((error) => of(TicketActions.addTicketFailure({ error })))
        )
      )
    )
  );

  deleteTicket$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TicketActions.deleteTicket),
      mergeMap(({ id }) =>
        this.ticketService.deleteTicket(id).pipe(
          map(() => TicketActions.deleteTicketSuccess({ id })),
          catchError((error) => of(TicketActions.deleteTicketFailure({ error })))
        )
      )
    )
  );
}
