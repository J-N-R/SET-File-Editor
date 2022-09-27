import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { IntroModule } from '../intro/intro.module';
import { SetEditorModule } from '../set-editor/set-editor.module';

import { IntroComponent } from '../intro/intro.component';
import { SetEditorComponent } from '../set-editor/set-editor.component';

const routes: Routes = [
  { path: '', component: IntroComponent },
  { path: 'editor', component: SetEditorComponent },
  { path: '**', component: IntroComponent },
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IntroModule,
    SetEditorModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
