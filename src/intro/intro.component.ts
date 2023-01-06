import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

import { FileFormComponent } from '../shared/file-form/file-form.component';

@Component({
  standalone: true,
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  imports: [
    CommonModule,
    FileFormComponent,
    FooterComponent,
    HeaderComponent,
    MatButtonModule,
  ],
})
export class IntroComponent {
  isFormOpen = false;

  constructor(private readonly router: Router) {}

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
  }
}
