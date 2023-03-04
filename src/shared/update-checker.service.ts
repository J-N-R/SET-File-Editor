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
