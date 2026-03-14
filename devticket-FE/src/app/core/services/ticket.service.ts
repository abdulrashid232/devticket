import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Ticket } from '../../shared/models/ticket.model';

@Injectable({
  providedIn: 'root',
})
export class TicketService {
  private tickets: Ticket[] = [
    { id: 1, title: 'Learn NgRx', description: 'Understand the basics of Store, Actions, and Reducers', status: 'open' },
    { id: 2, title: 'Implement Store', description: 'Set up the NgRx store in the application', status: 'in-progress' },
    { id: 3, title: 'Create Effects', description: 'Handle side effects with NgRx Effects', status: 'open' },
  ];

  getTickets(): Observable<Ticket[]> {
    return of(this.tickets).pipe(delay(1000));
  }

  addTicket(ticket: Ticket): Observable<Ticket> {
    const newTicket = { ...ticket, id: this.tickets.length + 1 };
    this.tickets = [...this.tickets, newTicket];
    return of(newTicket).pipe(delay(500));
  }

  deleteTicket(id: number): Observable<number> {
    this.tickets = this.tickets.filter((t) => t.id !== id);
    return of(id).pipe(delay(500));
  }
}
