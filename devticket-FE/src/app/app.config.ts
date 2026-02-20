import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';

import { routes } from './app.routes';
import { ticketReducer } from './store/ticket/ticket.reducer';
import { TicketEffects } from './store/ticket/ticket.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideStore({ tickets: ticketReducer }),
    provideEffects([TicketEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: false }),
  ],
};
