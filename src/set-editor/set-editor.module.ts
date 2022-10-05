import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';

import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';

import { ObjectService } from './object.service';
import { FileService } from '../shared/file.service';

import { SetObjectComponent } from './set-object.component';
import { SetEditorComponent } from './set-editor.component';

@NgModule({
  declarations: [
    SetEditorComponent,
    SetObjectComponent,
  ],
  imports: [
    CommonModule,
    FooterModule,
    FormsModule,
    HeaderModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  providers: [
    FileService,
    Location,
    ObjectService,
  ],
})
export class SetEditorModule { }
