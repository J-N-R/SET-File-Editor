import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { FileDialogComponent } from '../shared/file-dialog/file-dialog.component';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {

  constructor(private readonly router: Router, private readonly dialog: MatDialog) {}

  open() {

  }

  create() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      isCreatingFile: true,
    };
    dialogConfig.autoFocus = false;

    this.dialog.open(FileDialogComponent, dialogConfig);
    // this.router.navigate(['editor']);
  }

}
