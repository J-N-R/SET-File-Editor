import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { ObjectGroup, SetObject } from '../shared/interfaces';
import { CATEGORIZED_OBJECTS } from '../shared/object-categories';
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
      object: SA2Object.RING,
      x: 0,
      y: 0,
      z: 0,
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

  getLevelObjects(levelMap: Map<SA2Object, number>): ObjectGroup[] {
    const filteredObjectGroup: ObjectGroup[] = [];
    CATEGORIZED_OBJECTS.forEach((objectGroup) => {
      const filteredList = objectGroup.objects.filter((object) => levelMap.has(object));
      filteredObjectGroup.push({
        name: objectGroup.name,
        objects: filteredList,
      });
    });
    return filteredObjectGroup;
  }
}
