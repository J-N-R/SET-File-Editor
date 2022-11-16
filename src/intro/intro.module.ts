import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';

import { ElectronService } from '../shared/electron.service';

import { FileDialogModule } from '../shared/file-dialog/file-dialog.module';
import { IntroComponent } from './intro.component';

@NgModule({
  declarations: [
    IntroComponent
  ],
  imports: [
    CommonModule,
    FileDialogModule,
    FooterModule,
    HeaderModule,
    MatButtonModule,
  ],
  providers: [
    ElectronService,
  ],
})
export class IntroModule { }
