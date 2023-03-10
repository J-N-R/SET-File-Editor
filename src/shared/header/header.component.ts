import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule, MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';

import { SORTING_OPTIONS } from '../content';

/** Header for the Set Editor App. Doubles as a control center for objects. */
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonToggleModule,
    MatChipsModule,
  ],
})
export class HeaderComponent {
  @Output() save = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() clear = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() coordinates = new EventEmitter();

  @Input() isIntro = false;
  @Input() fileName?: string;
  @Input() numOfObjects?: number;

  coordinatesStyle = 'game';
  readonly SORTING_OPTIONS = SORTING_OPTIONS;

  emitSave() {
    this.save.emit();
  }

  emitClose() {
    this.close.emit();
  }

  emitAdd() {
    this.add.emit();
  }

  emitClear() {
    this.clear.emit();
  }

  emitSort(event: MatChipListboxChange) {
    this.sort.emit(event.source.value);
  }

  emitCoordinateStyle(event: MatButtonToggleChange) {
    this.coordinates.emit(event.source.value);
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
