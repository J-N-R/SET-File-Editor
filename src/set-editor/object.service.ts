import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { SetObject } from '../shared/interfaces';
import { CATEGORIZED_OBJECTS } from '../shared/object-categories';
import { SA2_LEVELS } from '../shared/sa2-levels';
import { SA2Object } from '../shared/objects';

/** Handles SET object storage, manipulation, and creation. */
@Injectable({
  providedIn: 'root',
})
export class ObjectService {
  private objectList: SetObject[] = [];
  private nextID = 1;

  private readonly objectSubject = new ReplaySubject<SetObject[]>();
  readonly objectsEmitter: Observable<SetObject[]> = this.objectSubject;

  addBlankObject() {
    const object = {
      id: this.nextID,
      type: SA2Object.RING,
    }
    this.nextID++;
    this.objectList.push(object);
    this.objectSubject.next(this.objectList);
  }

  deleteObject(id: number) {
    this.objectList = this.objectList.filter((object) => object.id !== id);
    this.objectSubject.next(this.objectList);
  }

  setObjectList(objectList: SetObject[]) {
    if (this.nextID <= objectList.length) {
      this.nextID = objectList.length + 1;
    }
    this.objectList = objectList;
    this.objectSubject.next(this.objectList);
  }

  // Retrieves an object's levels already categorized.
  getLevelObjects(stage: number): Map<string, Set<SA2Object>> {
    const levelObjects = SA2_LEVELS.get(stage);
    if (!levelObjects) {
      console.error('Stage: "' + stage + '" not found.');
      return new Map([
        [
          'Unknown Stage Detected',
          new Set<SA2Object>([SA2Object.DMYOBJ]),
        ]
      ]);
    }

    // Go through every object in a level, and find the category it belongs to.
    // This generates our own subset of categories for the UI to display.
    const filteredObjectGroups = new Map<string, Set<SA2Object>>();
    for (const object of levelObjects) {
      let found = false;
      for (const [groupName, objectGroup] of CATEGORIZED_OBJECTS) {
        if (objectGroup.has(object)) {
          found = true;
          if (!filteredObjectGroups.has(groupName)) {
            filteredObjectGroups.set(groupName, new Set<SA2Object>([object]));
          }
          else {
            filteredObjectGroups.get(groupName)!.add(object);
          }
          break;
        }
      }
      if (!found) {
        if (!filteredObjectGroups.has('Uncategorized')) {
          filteredObjectGroups.set('Uncategorized', new Set<SA2Object>([object]));
        }
        else {
          filteredObjectGroups.get('Uncategorized')!.add(object);
        }
      }
    }
    
    return filteredObjectGroups;
  }
}
