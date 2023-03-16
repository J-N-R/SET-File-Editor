import { TestBed, fakeAsync, tick } from '@angular/core/testing';
import { first } from 'rxjs/operators';

import { UpdateCheckerService } from './update-checker.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { VERSION, VERSION_URL } from './content';

/**
 * TODOS: Test object sorting, test category setting, test display info
 * setting, and clearing objects.
 **/
describe('UpdateCheckerService', () => {
  let updateCheckerService: UpdateCheckerService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    updateCheckerService = TestBed.inject(UpdateCheckerService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('returns true if an update is available', () => {
    updateCheckerService.checkForUpdate().subscribe(
      (updateDetected) => {
        expect(updateDetected).toBeTrue();
      });

    const req = httpTestingController.expectOne(VERSION_URL);
    const newerVersion = Number(VERSION) + 1;
    req.flush(newerVersion.toString());
  });

  it('returns false if an update isn\'t available', () => {
    updateCheckerService.checkForUpdate().subscribe(
      (updateDetected) => {
        expect(updateDetected).toBeFalse();
      });
  
    const req = httpTestingController.expectOne(VERSION_URL);
    req.flush(VERSION);
  });

  it('returns false if the internet isn\'t available', () => {
    updateCheckerService.checkForUpdate().subscribe(
      (updateDetected) => {
        expect(updateDetected).toBeFalse();
      });

    const req = httpTestingController.expectOne(VERSION_URL);
    req.flush('Not Found', {status: 404, statusText: 'Not Found'});
  });
});



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
