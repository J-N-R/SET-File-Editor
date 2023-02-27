import { Component, Input, EventEmitter, Output, OnInit, ChangeDetectionStrategy } from '@angular/core';

import { SetObject, SetLabel } from '../shared/interfaces';
import { SA2Object } from '../shared/objects';
import { CATEGORIZED_OBJECTS } from '../shared/object-categories';
import { SA2_LABELS } from 'src/shared/object-labels';

import { CommonModule, KeyValue } from '@angular/common';
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
export class SetObjectComponent implements OnInit {
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter();

  @Input() object: SetObject = {
    id: 0,
    type: SA2Object.DMYOBJ,
  };
  @Input() levelObjectGroups = new Map<string, Set<SA2Object>>();
  @Input() stage: number = 13;

  filteredObjectGroups = new Map<string, Set<SA2Object>>();
  userInput = '';
  internalName = '';
  categoryClass = '';
  customVariableClass = '';
  setLabel: SetLabel = {};

  ngOnInit() {
    this.userInput = this.object.type;
    this.internalName = SA2_OBJECTS.get(this.userInput.toLowerCase())![0];
    this.setCategory();
    this.setCustomVariables();
    this.setObjectLabels();
  }

  filterOptions() {
    this.filteredObjectGroups.clear();

    for (const [groupName, objectGroup] of this.levelObjectGroups) {
      const filteredObjects = new Set<SA2Object>();
      for (const object of objectGroup) {
        if (object.toLowerCase().includes(this.userInput.toLowerCase())) {
          filteredObjects.add(object);
        }
      }

      if (filteredObjects.size > 0) {
        this.filteredObjectGroups.set(groupName, filteredObjects);
      }
    }
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
    for (const [groupName, objectGroup] of this.levelObjectGroups) {
      if (objectGroup.has(this.object.type)) {
        this.categoryClass = CATEGORY_CLASSLIST.get(groupName) ?? '';
        break;
      }
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
  }

  sortAutocomplete() {
    this.userInput = '';
    this.filterOptions();
  }

  // Overrides keyvalue to keep object categories in original order.
  unsortedComparator(a: KeyValue<string, Set<SA2Object>>,
                     b: KeyValue<string, Set<SA2Object>>) {
    return (SORTED_CATEGORY_INDEX.get(a.key) ?? Number.MAX_VALUE) -
           (SORTED_CATEGORY_INDEX.get(b.key) ?? Number.MAX_VALUE);
  }

  resetObject() {
    this.userInput = this.object.type;
  }

  deleteObject() {
    this.deleteEvent.emit(this.object.id);
  }

  togglePanel() {
    this.object.isExpanded = !this.object.isExpanded;
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
  ['Triggers', 'trigger'],
  ['Sunglasses', 'trigger'],
  ['Ball Switch', 'trigger'],
  ['Mystic Shrine', 'shrine'],
  ['Actors', 'decoration'],
]);
const SORTED_CATEGORY_INDEX = new Map(Array.from(CATEGORIZED_OBJECTS.keys()).map((object, index) => [object, index]));
