import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { first, take } from 'rxjs/operators';

import { ObjectService } from './object.service';

import { SetObject } from '../shared/interfaces';
import { SA2Object } from '../shared/objects';

/**
 * TODOS: Test object sorting, test category setting, test display info
 * setting, and clearing objects.
 **/
describe('ObjectService', () => {
  let service: ObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectService);
  });

  it('adds an object', (done: DoneFn) => {
    const mockObject: SetObject = getTestObject();
    service.setObjectList(LEVEL_OBJECT_GROUPS, CITY_ESCAPE_ID, [mockObject]);

    service.objectsEmitter.pipe(first()).subscribe((objectList) => {
      expect(objectList).toEqual([mockObject]);
      done();
    });
  });

  it('deletes an object', (done: DoneFn) => {
    const mockObject: SetObject = getTestObject();
    
    // Causes first emission.
    service.setObjectList(LEVEL_OBJECT_GROUPS, CITY_ESCAPE_ID, [mockObject]);

    // Causes second emission.
    service.deleteObject(MOCK_ID);

    // Skip first emission.
    let firstEmission = true;
    service.objectsEmitter.subscribe((objectList) => {
      if (firstEmission) {
        firstEmission = false;
      }
      else {
        expect(objectList).toEqual([]);
        done();
      }
    });
  });

  it('sets new list', (done: DoneFn) => {
    const mockObject1: SetObject = getTestObject();
    const mockObject2: SetObject = getTestObject();
    service.setObjectList(LEVEL_OBJECT_GROUPS, CITY_ESCAPE_ID, [mockObject1, mockObject2]);
    
    service.objectsEmitter.pipe(first()).subscribe((objectList) => {
      expect(objectList).toEqual([mockObject1, mockObject2]);
      done();
    });
  });
});

const MOCK_ID = 1;
const CITY_ESCAPE_ID = 13;
const LEVEL_OBJECT_GROUPS = new Map<string, Set<SA2Object>>();

function getTestObject(): SetObject {
  return {
    id: MOCK_ID,
    type: SA2Object.DMYOBJ,
    x: '1',
    y: '1',
    z: '1',
    xRot: '1',
    yRot: '1',
    zRot: '1',
  }
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
