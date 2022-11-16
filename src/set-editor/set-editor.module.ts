import { NgModule } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';

import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';

import { ObjectService } from './object.service';
import { ElectronService } from '../shared/electron.service';

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
    MatAutocompleteModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  providers: [
    ElectronService,
    Location,
    ObjectService,
  ],
})
export class SetEditorModule { }
