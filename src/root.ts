import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { Routes, provideRouter } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./intro/intro.component') },
  { path: 'editor', loadComponent: () => import('./set-editor/set-editor.component') },
  { path: '**', loadComponent: () => import('./intro/intro.component') },
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideHttpClient(),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
