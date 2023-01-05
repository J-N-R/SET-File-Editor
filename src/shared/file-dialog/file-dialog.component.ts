import { Component, Input, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';

/** 
 * Dialog that opens when a user wants to save, open,
 * or create a file.
 */
@Component({
  standalone: true,
  selector: 'app-file-dialog',
  templateUrl: './file-dialog.component.html',
  styleUrls: ['./file-dialog.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class FileDialogComponent implements OnInit {
  @Input() isSavingFile = false;
  @Input() isCreatingFile = false;

  error = false;
  title = '';
  form = new FormGroup({
    fileName: new FormControl('', Validators.required),
    isSA2Format: new FormControl(null, Validators.required),
    fileType: new FormControl('', Validators.required),
  });
  readonly sa1Formats = SA1_FORMATS;
  readonly sa2Formats = SA2_FORMATS;

  get fileName() {
    return this.form.get('fileName');
  }

  get isSA2Format() {
    return this.form.get('isSA2Format');
  }

  get fileType() {
    return this.form.get('fileType');
  }

  get queryParams() {
    const queryParams: QueryParams = {};

    if (this.fileName) {
      queryParams.fileName = this.fileName.value!;
    }
    if (this.isSA2Format) {
      queryParams.isSA2Format = String(this.isSA2Format.value!);
    }
    if (this.fileType) {
      queryParams.fileType = this.fileType.value!;
    }
    
    return queryParams;
  }

  constructor(
      private dialogRef: MatDialogRef<FileDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: FileDialogInput) {
    if ((data.isCreatingFile === undefined && data.isSavingFile === undefined) ||
        (data.isCreatingFile && data.isSavingFile) ||
        (!data.isCreatingFile && !data.isSavingFile)) {
      this.error = true;
    }
    if (data.isCreatingFile) {
      this.isCreatingFile = data.isCreatingFile;
    }
    if (data.isSavingFile) {
      this.isSavingFile = data.isSavingFile;
    }
  }

  ngOnInit() {
    this.title = this.isSavingFile ? 'Save File' : 'Create File';
  }
}

const SA1_FORMATS = [
  'Unsupported',
];

const SA2_FORMATS = [
  'Normal',
  'Decorative',
  'Hard Mode',
];

interface FileDialogInput {
  isCreatingFile?: boolean,
  isSavingFile?: boolean,
};

/** Query Params sent from intro to editor page. */
interface QueryParams {
  fileName?: string,
  isSA2Format?: string,
  fileType?: string,
};

// https://blog.angular-university.io/angular-material-dialog/
