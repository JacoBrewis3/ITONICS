import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { NgxsModule, provideStates, provideStore } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';
import { WorldState } from './store/state/world.state';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideRouter(routes), 
    importProvidersFrom(NgxsModule.forRoot([WorldState]))
  ] 
};
