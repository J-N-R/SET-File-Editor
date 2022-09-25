import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './intro.component';
import { HeaderModule } from '../shared/header/header.module';
import { FooterModule } from '../shared/footer/footer.module';
import { MatButtonModule } from '@angular/material/button'; 

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
})
export class IntroModule { }
