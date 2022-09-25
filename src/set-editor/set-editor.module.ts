import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetEditorComponent } from './set-editor.component';
import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';
import { SetObjectComponent } from './set-object.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [
    SetEditorComponent,
    SetObjectComponent,
  ],
  imports: [
    CommonModule,
    FooterModule,
    HeaderModule,
    MatButtonModule,
    MatExpansionModule,
  ]
})
export class SetEditorModule { }