import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntroComponent } from './intro.component';
import { HeaderModule } from '../shared/header/header.module';

@NgModule({
  declarations: [
    IntroComponent
  ],
  imports: [
    CommonModule,
    HeaderModule,
  ],
})
export class IntroModule { }
