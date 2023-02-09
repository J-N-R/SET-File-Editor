import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

import { SetObject, ObjectGroup, SetLabel } from '../shared/interfaces';
import { SA2Object } from '../shared/objects';
import { CATEGORIZED_OBJECTS } from '../shared/object-categories';
import { SA2_LABELS } from 'src/shared/object_labels';

import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';
import { MatTooltipModule } from '@angular/material/tooltip';

/**
 * TODO: Use reactive forms over template-driven.
 * TODO: Replace '0' default with null and use '0' placeholder.
 **/

/** UI Element that represents a single Set Object. */
@Component({
  standalone: true,
  selector: 'app-set-object',
  templateUrl: './set-object.component.html',
  styleUrls: ['./set-object.component.scss'],
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
export class SetObjectComponent implements OnInit {
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter();

  @Input() object: SetObject = {
    id: 0,
    type: SA2Object.DMYOBJ,
    x: 0,
    y: 0,
    z: 0,
  };
  @Input() levelObjectGroups: ObjectGroup[] = [];
  @Input() stage: number = 13;

  filteredObjectGroups: ObjectGroup[] = [];
  userInput = '';
  internalName = '';
  categoryClass = '';
  customVariableClass = '';
  setLabel: SetLabel = {};

  ngOnInit() {
    this.userInput = this.object.type;
    this.internalName = SA2_OBJECTS.get(this.userInput.toLowerCase())![1];
    this.setCategory();
    this.setCustomVariables();
    this.setObjectLabels();
  }

  filterOptions() {
    this.filteredObjectGroups.length = 0;

    this.levelObjectGroups.forEach((objectGroup) => {
      const filteredObjects = new Set<SA2Object>();
      objectGroup.objects.forEach((object) => {
        if (object.toLowerCase().includes(this.userInput.toLowerCase())) {
          filteredObjects.add(object);
        }
      });

      if (filteredObjects.size > 0) {
        this.filteredObjectGroups.push({
          name: objectGroup.name,
          objects: filteredObjects,
        });
      }
    });
  }

  setCustomVariables() {
    let customVariableCount = 0;
    if (this.object.var1 !== undefined) {
      customVariableCount++;
    }
    if (this.object.var2 !== undefined) {
      customVariableCount++;
    }
    if (this.object.var3 !== undefined) {
      customVariableCount++;
    }
    switch (customVariableCount) {
      case 1:
        this.customVariableClass = 'one-variable';
        break;
      case 2:
        this.customVariableClass = 'two-variables';
        break;
      default:
        this.customVariableClass = '';
    }
  }

  setCategory() {
    const objectGroup = CATEGORIZED_OBJECTS.filter(
        (objectGroup) => objectGroup.objects.has(this.object.type)
    );
    if (objectGroup.length === 1) {
      this.categoryClass = CATEGORY_CLASSLIST.get(objectGroup[0].name) ?? '';
    }
  }

  setObject() {
    if (this.userInput &&
        SA2_OBJECTS.has(this.userInput.toLowerCase() as SA2Object)) {
      const [originalObject, originalName] = SA2_OBJECTS.get(this.userInput.toLowerCase())!;
      this.object.type = originalName as SA2Object;
      this.internalName = originalObject;
      this.setCategory();
      this.setCustomVariables();
      this.setObjectLabels();
    }
  }

  setObjectLabels() {
    if(!SA2_LABELS.has(this.object.type)) {
      this.setLabel = {};
      return;
    }

    const setLabels = SA2_LABELS.get(this.object.type)!;
    if (setLabels) {
      if (setLabels.has(-1)) {
        this.setLabel = setLabels.get(-1)!;
      }
      if (setLabels.has(this.stage)) {
        this.setLabel = {...this.setLabel, ...setLabels.get(this.stage)!};
      }
    }
    console.log(this.setLabel);
  }

  sortAutocomplete() {
    this.userInput = '';
    this.filterOptions();
  }

  resetObject() {
    this.userInput = this.object.type;
  }

  deleteObject() {
    this.deleteEvent.emit(this.object.id);
  }
}

/**
 * Map used for select autocomplete search.
 * Keyed by object name lowercased and returns original object and object name.
 */
const SA2_OBJECTS = new Map<string, string[]>(Object.entries(SA2Object).map(
  ([objectIndex, objectName]) => [objectName.toLowerCase(), [objectIndex, objectName]]
));
const CATEGORY_CLASSLIST = new Map<string, string>([
  ['Enemies', 'enemy'],
  ['Collectibles', 'collectible'],
  ['Stage Interactables', 'interactable'],
  ['Decoration', 'decoration'],
]);
