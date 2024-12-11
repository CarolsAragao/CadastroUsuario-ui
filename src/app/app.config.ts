import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { MessageService } from 'primeng/api';

export const appConfig: ApplicationConfig = {
  providers: [
      provideZoneChangeDetection({ eventCoalescing: true }), 
      provideRouter(routes),
      importProvidersFrom(BrowserAnimationsModule, HttpClientModule),
      MessageService,
      provideAnimationsAsync(),
        providePrimeNG({ 
            theme: {
                preset: Aura
            }
        })
    ]  
};
