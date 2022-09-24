import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetEditorComponent } from './set-editor.component';
import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';

@NgModule({
  declarations: [
    SetEditorComponent,
  ],
  imports: [
    CommonModule,
    HeaderModule,
    FooterModule,
  ]
})
export class SetEditorModule { }
