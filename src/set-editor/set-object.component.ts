import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

import { SetObject, ObjectGroup } from '../shared/interfaces';
import { SA2Object } from '../shared/objects';

import { CommonModule } from '@angular/common';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { FormsModule } from '@angular/forms';

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
  ],
})
export class SetObjectComponent implements OnInit {
  @Output() deleteEvent: EventEmitter<number> = new EventEmitter();

  @Input() object: SetObject = {
    id: 0,
    object: SA2Object.DMYOBJ,
    x: 0,
    y: 0,
    z: 0,
  };
  @Input() levelObjectGroups: ObjectGroup[] = [];

  filteredObjectGroups: ObjectGroup[] = [];
  userInput = '';

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

  setObject() {
    if (SA2_OBJECT_LIST.has(this.userInput as SA2Object)) {
      this.object.object = this.userInput as SA2Object;
    }
  }

  sortAutocomplete() {
    this.userInput = '';
    this.filterOptions();
  }

  resetObject() {
    this.userInput = this.object.object;
  }

  deleteObject() {
    this.deleteEvent.emit(this.object.id);
  }

  ngOnInit() {
    this.userInput = this.object.object;
  }
}

const SA2_OBJECT_LIST = new Set(Object.values(SA2Object));
