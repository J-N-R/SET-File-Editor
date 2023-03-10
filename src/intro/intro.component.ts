import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { NgxDropzoneModule, NgxDropzoneChangeEvent } from 'ngx-dropzone';
import { first } from 'rxjs/operators';

import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { FileFormComponent } from '../shared/file-form/file-form.component';
import { ElectronService } from '../shared/electron.service';
import { UpdateCheckerService } from 'src/shared/update-checker.service';
import { convertToSetFile } from '../shared/content';
import { SetFile } from '../shared/interfaces';
import { NOTES } from './intro.content';

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
    MatIconModule,
    NgxDropzoneModule,
  ],
})
export default class IntroComponent implements OnInit {
  isFormOpen = false;
  updateDetected = false;
  openedFile: SetFile|null = null;
  readonly NOTES = NOTES;

  constructor(private readonly electronService: ElectronService,
    private readonly updateCheckerService: UpdateCheckerService) {}

  ngOnInit() {
    this.updateCheckerService.checkForUpdate().pipe(first()).subscribe(
      (updateDetected) => {
        this.updateDetected = updateDetected;
      });
  }

  toggleForm() {
    this.isFormOpen = !this.isFormOpen;
    this.openedFile = null;
  }

  openFile() {
    this.electronService.openFile().pipe(first()).subscribe((result) => {
      if (result) {
        this.openedFile = result;
        this.isFormOpen = true;
      }
      else {
        console.warn('Open file attempted, but failed. Are you sure you\'re ' +
        'running electron?');
      }
    });
  }

  openDroppedFile(event: NgxDropzoneChangeEvent) {
    if (event.addedFiles) {
      this.openedFile = convertToSetFile(event.addedFiles[0].path);
      this.isFormOpen = true;
    }
  }
}



// Legal jargon.
/*************************************************************************
 * Copyright 2023 Google LLC
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 * 
 *  https://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *************************************************************************/
