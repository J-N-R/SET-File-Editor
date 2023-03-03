import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

/** Used to double-check if a user wants to perform an action. */
@Component({
  selector: 'app-confirmation-dialog',
  standalone: true,
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
  ],
})
export class ConfirmationDialogComponent {
  @Input() hasCompletedTask = false;
  @Input() error = false;
}
