import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { first, map, catchError } from 'rxjs/operators';

import { VERSION } from './content';

@Injectable({
  providedIn: 'root',
})
export class UpdateCheckerService {
  constructor(private readonly httpClient: HttpClient) {}

  checkForUpdate(): Observable<boolean> {
    return this.httpClient.get(VERSION_URL).pipe(first(),
      catchError((error) => VERSION), map((detectedVersion) => {
        if ((Number(detectedVersion) || 0) > Number(VERSION)) {
          return true;
        }
        return false;
    }));
  }
}

const VERSION_URL = 'https://raw.githubusercontent.com/J-N-R/' +
    'SET-File-Editor/master/VERSION.txt';



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
