import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Ticket } from '../../shared/models/ticket.model';
import * as TicketActions from '../../store/ticket/ticket.actions';
import { selectAllTickets, selectTicketLoading, selectTicketError } from '../../store/ticket/ticket.selectors';

@Component({
  selector: 'app-ticket-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="p-6">
      <h1 class="text-2xl font-bold mb-4">Ticket List (NgRx Demo)</h1>
    
      <button
        (click)="addNewTicket()"
        class="bg-blue-500 text-white px-4 py-2 rounded mb-4 hover:bg-blue-600"
        >
        Add New Ticket
      </button>
    
      @if (loading$ | async) {
        <div class="text-gray-500">Loading tickets...</div>
      }
    
      @if (error$ | async; as error) {
        <div class="text-red-500">
          Error: {{ error }}
        </div>
      }
    
      <ul class="space-y-4">
        @for (ticket of tickets$ | async; track ticket) {
          <li
            class="border p-4 rounded shadow-sm bg-white flex justify-between items-center"
            >
            <div>
              <h3 class="font-semibold">{{ ticket.title }}</h3>
              <p class="text-gray-600">{{ ticket.description }}</p>
              <span
                class="inline-block mt-2 px-2 py-1 text-xs rounded"
              [class]="{
                'bg-green-100 text-green-800': ticket.status === 'done',
                'bg-yellow-100 text-yellow-800': ticket.status === 'in-progress',
                'bg-gray-100 text-gray-800': ticket.status === 'open'
              }"
                >
                {{ ticket.status }}
              </span>
            </div>
            <button
              (click)="deleteTicket(ticket.id)"
              class="text-red-500 hover:text-red-700"
              >
              Delete
            </button>
          </li>
        }
      </ul>
    </div>
    `,
})
export class TicketListComponent implements OnInit {
  private readonly store = inject(Store);

  tickets$: Observable<Ticket[]> = this.store.select(selectAllTickets);
  loading$: Observable<boolean> = this.store.select(selectTicketLoading);
  error$: Observable<any> = this.store.select(selectTicketError);

  ngOnInit(): void {
    this.store.dispatch(TicketActions.loadTickets());
  }

  addNewTicket(): void {
    const newTicket: Ticket = {
      id: 0,
      title: `New Ticket ${Math.floor(Math.random() * 100)}`,
      description: 'This is a randomly generated ticket for demonstration.',
      status: 'open',
    };
    this.store.dispatch(TicketActions.addTicket({ ticket: newTicket }));
  }

  deleteTicket(id: number): void {
    this.store.dispatch(TicketActions.deleteTicket({ id }));
  }
}
