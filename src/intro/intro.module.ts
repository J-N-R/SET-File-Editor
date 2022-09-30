import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button'; 

import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';

import { FileService } from '../shared/file.service';

import { IntroComponent } from './intro.component';

@NgModule({
  declarations: [
    IntroComponent
  ],
  imports: [
    CommonModule,
    FooterModule,
    HeaderModule,
    MatButtonModule,
  ],
  providers: [
    FileService,
  ],
})
export class IntroModule { }
