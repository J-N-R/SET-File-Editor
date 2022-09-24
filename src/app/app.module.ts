import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SetEditorComponent } from '../set-editor/set-editor.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { SetEditorModule } from '../set-editor/set-editor.module';

const routes: Routes = [
  { path: '', component: SetEditorComponent}
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SetEditorModule,
    RouterModule.forRoot(routes),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
