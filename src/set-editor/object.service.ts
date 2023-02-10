import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ObjectGroup, SetObject } from '../shared/interfaces';
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

  addObject(object: SetObject) {
    object.id = this.nextID;
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

  getLevelObjects(stage: number): ObjectGroup[] {
    const levelObjects = SA2_LEVELS.get(stage);
    if (!levelObjects) {
      console.error('Stage: "' + stage + '" not found.');
      return [{
        name: 'Unknown Stage Detected',
        objects: new Set<SA2Object>([SA2Object.DMYOBJ]),
      }];
    }

    const filteredObjectGroup: ObjectGroup[] = [];
    CATEGORIZED_OBJECTS.forEach((objectGroup) => {
      const filteredList = new Set<SA2Object>();
      objectGroup.objects.forEach((object) => {
        if (levelObjects.has(object)) {
          filteredList.add(object);
        }
      })

      filteredObjectGroup.push({
        name: objectGroup.name,
        objects: filteredList,
      });
    });
    return filteredObjectGroup;
  }
}
