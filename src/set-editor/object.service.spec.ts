import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { first, take } from 'rxjs/operators';

import { ObjectService } from './object.service';

import { SetObject } from '../shared/interfaces';
import { SA2Object } from '../shared/objects';

describe('ObjectService', () => {
  let service: ObjectService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ObjectService);
  });

  it('adds an object', (done: DoneFn) => {
    const mockObject: SetObject = getTestObject();
    service.addObject(mockObject);

    service.objectsEmitter.pipe(first()).subscribe((objectList) => {
      expect(objectList).toEqual([mockObject]);
      done();
    });
  });

  it('deletes an object', (done: DoneFn) => {
    const mockObject: SetObject = getTestObject();
    
    // Causes first emission.
    service.addObject(mockObject);

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
    service.setObjectList([mockObject1, mockObject2]);
    
    service.objectsEmitter.pipe(first()).subscribe((objectList) => {
      expect(objectList).toEqual([mockObject1, mockObject2]);
      done();
    });
  });
});

const MOCK_ID = 1;

function getTestObject(): SetObject {
  return {
    id: MOCK_ID,
    type: SA2Object.DMYOBJ,
    x: 1,
    y: 1,
    z: 1,
    xRot: 1,
    yRot: 1,
    zRot: 1,
  }
}
