import { Component, Input, EventEmitter, Output, ChangeDetectionStrategy } from '@angular/core';

import { SetObject } from '../shared/interfaces';
import { SA2Object } from '../shared/objects';
import { CATEGORIZED_OBJECTS } from '../shared/object-categories';
import { ObjectService } from './object.service';

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
export class SetObjectComponent {
  @Output() delete = new EventEmitter<number>();

  @Input() levelObjectGroups = new Map<string, Set<SA2Object>>();
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

  userInput = '';
  filteredObjectGroups = new Map<string, Set<SA2Object>>();

  constructor(private readonly objectService: ObjectService) {}

  ngOnInit() {
    this.userInput = this.object.type;
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

  setObject() {
    const newObjectType = LOWERCASE_TO_OBJECT.get(this.userInput.toLowerCase());
    if (this.userInput && newObjectType) {
      this.object.type = newObjectType;
      this.object.displayInfo = {
        ...this.objectService.getDisplayInfo(this.levelObjectGroups,
            this.stage, newObjectType),
        isExpanded: true,
      };
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

  emitDelete() {
    this.delete.emit(this.object.id);
  }

  togglePanel() {
    if (this.object.displayInfo) {
      this.object.displayInfo.isExpanded = !this.object.displayInfo.isExpanded;
    }
  }
}

/**
 * Map used for select autocomplete search.
 * Keyed by object name lowercased and returns original object and object name.
 */
const LOWERCASE_TO_OBJECT = new Map(Object.entries(SA2Object).map(
    ([internalName, objectType]) => [objectType.toLowerCase(), objectType]
));
const SORTED_CATEGORY_INDEX = new Map(Array.from(CATEGORIZED_OBJECTS.keys())
    .map((object, index) => [object, index]));
