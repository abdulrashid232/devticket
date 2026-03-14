import { Routes } from '@angular/router';
import { TicketListComponent } from './features/ticket-list/ticket-list.component';

export const routes: Routes = [
  { path: 'tickets', component: TicketListComponent },
  { path: '', redirectTo: 'tickets', pathMatch: 'full' },
];
