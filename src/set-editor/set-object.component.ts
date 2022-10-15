import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';

import { SetObject, ObjectGroup } from '../shared/interfaces';
import { SA2Object } from '../shared/content';

@Component({
  selector: 'app-set-object',
  templateUrl: './set-object.component.html',
  styleUrls: ['./set-object.component.scss']
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
      const filteredObjects = objectGroup.objects.filter(
          (object) => object.toLowerCase().includes(this.userInput.toLowerCase()));
      
      if (filteredObjects.length > 0) {
        this.filteredObjectGroups.push({
          name: objectGroup.name,
          objects: filteredObjects,
        });
      }
    });
  }

  setObject() {
    if (SA2_OBJECT_LIST.includes(this.userInput as SA2Object)) {
      this.object.object = this.userInput as SA2Object;
    }
  }

  handleObjectClick() {
    this.userInput = '';
    this.filterOptions();
  }

  handleObjectBlur() {
    this.userInput = this.object.object;
  }

  handleDeleteClick() {
    this.deleteEvent.emit(this.object.id);
  }

  ngOnInit() {
    this.userInput = this.object.object;
  }
}

const SA2_OBJECT_LIST = Object.values(SA2Object);
