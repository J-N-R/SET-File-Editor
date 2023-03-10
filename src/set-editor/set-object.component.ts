import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CoordinateStyle, SetObject } from '../shared/interfaces';
import { SA2Object } from '../shared/objects';
import { SA2_LEVELS } from '../shared/sa2-levels';
import { ObjectService } from './object.service';

/** Visualization of a single set object. */
@Component({
  standalone: true,
  selector: 'app-set-object',
  templateUrl: './set-object.component.html',
  styleUrls: ['./set-object.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTooltipModule,
  ],
})
export class SetObjectComponent {
  @Output() delete = new EventEmitter<number>();

  @Input() levelObjectCategories = new Map<string, Set<SA2Object>>();
  @Input() stage: number = 13;
  @Input() object: SetObject = {
    id: 0,
    type: SA2Object.DMYOBJ,
    displayInfo: {
      isExpanded: false,
      internalName: 'DMYOBJ',
      categoryClass: '',
      customVariableCount: 3,
    }
  };
  // Only here to run change detection after coordinate style change.
  @Input() coordinateStyle: CoordinateStyle = 'game';

  userInput = '';
  stageObjectList = new Set<SA2Object>();
  filteredObjectCategories = new Map<string, Set<SA2Object>>();

  constructor(private readonly objectService: ObjectService) {}

  ngOnInit() {
    this.userInput = this.object.type;
    this.stageObjectList = SA2_LEVELS.get(this.stage) ?? new Set();
  }

  filterOptions() {
    this.filteredObjectCategories.clear();

    for (const [category, objectList] of this.levelObjectCategories) {
      const filteredObjects = Array.from(objectList).filter(
        (object) => object.toLowerCase().includes(this.userInput.toLowerCase())
      );

      if (filteredObjects.length) {
        this.filteredObjectCategories.set(category, new Set(filteredObjects));
      }
    }
  }

  setObject() {
    const newObjectType = LOWERCASE_TO_OBJECT.get(this.userInput.toLowerCase());
    if (this.userInput && newObjectType &&
        this.stageObjectList.has(newObjectType)) {
      this.object.type = newObjectType;
      this.object.displayInfo = {
        ...this.objectService.getDisplayInfo(this.levelObjectCategories,
            this.stage, newObjectType),
        isExpanded: true,
      };
    }
  }

  sortAutocomplete() {
    this.userInput = '';
    this.filterOptions();
  }

  resetObject() {
    this.userInput = this.object.type;
  }

  emitDelete() {
    this.delete.emit(this.object.id);
  }

  togglePanel() {
    if (this.object.displayInfo) {
      this.object.displayInfo.isExpanded = !this.object.displayInfo.isExpanded;
    }
  }

  // Overrides keyvalue's default sorting behavior.
  noSorting(): number {
    return 0;
  }
}

/**
 * Map used for select autocomplete search. Keyed by object name lowercased and
 * returns original object and object name.
 */
const LOWERCASE_TO_OBJECT = new Map(Object.entries(SA2Object).map(
    ([internalName, objectType]) => [objectType.toLowerCase(), objectType]
));



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
