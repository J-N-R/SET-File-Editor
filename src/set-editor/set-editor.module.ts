import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';

import { SetObjectComponent } from './set-object.component';
import { SetEditorComponent } from './set-editor.component';
import { ObjectService } from './object.service';

import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';

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
  ],
  providers: [
    ObjectService,
  ],
})
export class SetEditorModule { }
