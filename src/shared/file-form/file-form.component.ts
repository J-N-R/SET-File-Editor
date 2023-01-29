import { Component, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

/** Dialog that opens when a user wants to open or create a file. */
@Component({
  standalone: true,
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class FileFormComponent {
  @Output() cancelEvent = new EventEmitter();

  error = false;
  title = 'Create File';
  form = new FormGroup({
    fileName: new FormControl(''),
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

  cancel() {
    this.cancelEvent.emit();
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
