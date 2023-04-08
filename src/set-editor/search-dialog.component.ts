import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonToggleModule, MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

import { ObjectService } from './object.service';
import { SA2Object } from '../shared/objects';
import { SA2_LEVELS } from '../shared/sa2-levels';

/** Used to double-check if a user wants to perform an action. */
@Component({
  selector: 'app-search-dialog',
  standalone: true,
  templateUrl: './search-dialog.component.html',
  styleUrls: ['./search-dialog.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatSlideToggleModule,
  ],
})
export class SearchDialogComponent implements OnInit {
  @Input() stage = 13;

  userInput = '';
  removeDuplicates = true;
  objectList: SearchObject[] = [];
  filteredObjectList: SearchObject[] = [];
  searchType: 'type'|'internal'|'hex' = 'type';

  constructor(private readonly objectService: ObjectService) {}

  ngOnInit() {
    const levelObjectIndex = new Map(Array.from(SA2_LEVELS.get(this.stage) ?? [])
          .map((object, index) => [object, index]));
    this.objectService.objectsEmitter.subscribe((objectList) => {
      if (this.removeDuplicates) {
        const objectSet = new Set<SA2Object>();
        objectList = objectList.filter(({type}) => {
          if (objectSet.has(type)) {
            return false;
          }
          objectSet.add(type);
          return true;
        });
      }
      this.objectList = objectList.map((setObject) => {
        let hexIndex = levelObjectIndex.get(setObject.type)?.toString(16) ?? '0';
        if (hexIndex.length < 2) {
          hexIndex = '0' + hexIndex;
        }
        const searchObject = {
          id: setObject.id,
          type: setObject.type,
          internalName: setObject.displayInfo?.internalName,
          hexIndex,
        } as SearchObject;
        return {
          ...searchObject,
          displayValue: this.getDisplayValue(searchObject),
        }
      }).sort((a, b) => a.displayValue.localeCompare(b.displayValue));
      if (!this.filteredObjectList) {
        this.filteredObjectList = this.objectList;
      }
    });
  }

  filterOptions() {
    if (!this.userInput) {
      this.filteredObjectList = this.objectList;
      return;
    }
    const hexInput = this.userInput.split('x').pop() ?? this.userInput;
    this.filteredObjectList = this.objectList.filter((searchObject) => {
        if (this.searchType === 'hex') {
          return searchObject.hexIndex?.includes(hexInput);
        }
        if (this.searchType === 'internal') {
          return searchObject.internalName?.toLowerCase()
              .includes(this.userInput.toLowerCase());
        }
        return searchObject.type.toLowerCase()
            .includes(this.userInput.toLowerCase());
    });
  }

  setSearchType(event: MatButtonToggleChange) {
    this.searchType = event.value;
    this.objectList = this.objectList.map((searchObject) => {
      return {
        ...searchObject,
        displayValue: this.getDisplayValue(searchObject)
      };
    }).sort((a, b) => a.displayValue.localeCompare(b.displayValue));
  }

  // For users who manually hit the "search" button, search using user input.
  search(): number {
    if (!this.userInput) {
      return -1;
    }
    const exactMatch = this.filteredObjectList.find(({displayValue}) =>
        displayValue?.toLowerCase() === this.userInput.toLowerCase()
    );
    const approxMatch = this.filteredObjectList.find(({displayValue}) =>
        displayValue?.toLowerCase().includes(this.userInput.toLowerCase())
    );
    return exactMatch?.id ?? approxMatch?.id ?? -1;
  }

  // Overrides keyvalue's default sorting behavior.
  noSorting(): number {
    return 0;
  }

  private getDisplayValue(searchObject: SearchObject): string {
    if (this.searchType === 'internal') {
      return searchObject.internalName ?? searchObject.type;
    }
    if (this.searchType === 'hex') {
      return [
        searchObject.internalName ?? searchObject.type,
        `(0x${searchObject.hexIndex})`,
      ].join(' ');
    }
    return searchObject.type;
  }
}

interface SearchObject {
  id: number,
  type: SA2Object,
  internalName?: string,
  hexIndex?: string,
  displayValue?: string,
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
