import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

import { FileDialogComponent } from '../shared/file-dialog/file-dialog.component';

@Component({
  standalone: true,
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss'],
  imports: [
    CommonModule,
    FileDialogComponent,
    FooterComponent,
    HeaderComponent,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class IntroComponent {

  constructor(private readonly router: Router, private readonly dialog: MatDialog) {}

  openFile() {

  }

  createFile() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      isCreatingFile: true,
    };
    dialogConfig.autoFocus = false;
    dialogConfig.height = '480px';
    dialogConfig.panelClass = 'dialog-panel';

    this.dialog.open(FileDialogComponent, dialogConfig);
  }
}
