import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';

import { SetObject } from '../shared/interfaces'; 

/** Handles SET object storage, manipulation, and creation. */
@Injectable({
  providedIn: 'root'
})
export class ObjectService {
  private objectList: SetObject[] = [];

  private readonly objectSubject = new ReplaySubject<SetObject[]>();
  readonly objectsEmitter: Observable<SetObject[]> = this.objectSubject;

  addObject(object: SetObject) {
    this.objectList.push(object);
    this.objectSubject.next(this.objectList);
  }

  removeObject(id: number) {
    this.objectList = this.objectList.filter((object) => object.id !== id);
    this.objectSubject.next(this.objectList);
  }

  setObjectList(objectList: SetObject[]) {
    this.objectList = objectList;
    this.objectSubject.next(this.objectList);
  }
}