import { enableProdMode } from '@angular/core';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';

import { AppComponent } from './app/app.component';
import { environment } from './environments/environment';

import { Routes, provideRouter } from '@angular/router';

const routes: Routes = [
  { path: '', loadComponent: () => import('./intro/intro.component').then((mod) => mod.IntroComponent) },
  { path: 'editor', loadComponent: () => import('./set-editor/set-editor.component').then((mod) => mod.SetEditorComponent) },
  { path: '**', loadComponent: () => import('./intro/intro.component').then((mod) => mod.IntroComponent) },
];

if (environment.production) {
  enableProdMode();
}

bootstrapApplication(AppComponent, {
  providers: [
    provideAnimations(),
    provideRouter(routes),
  ],
}).catch((err) => console.error(err));
