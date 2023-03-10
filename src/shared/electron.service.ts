import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Observable, from, of } from 'rxjs';

import { SetFile, SetObject } from './interfaces';
import { SA2Object } from './objects';

/** Manages interfacing with the operating system using Electron. */
@Injectable({
  providedIn: 'root',
})
export class ElectronService {
  private ipcRenderer?: typeof ipcRenderer;

  constructor() {
    // Only available if running in electron
    if (this.isElectron()) {
      this.ipcRenderer = (window).require('electron').ipcRenderer;
    }
    else {
      console.warn('Electron not detected. Some file features will be ' +
      'disabled.');
    }
  }

  isElectron(): boolean {
    return !!((window) && (window).process && (window).process.type);
  }

  /** Creates an open file dialog and estimates file information. */
  openFile(): Observable<SetFile|null> {
    return this.ipcRenderer ? from(this.ipcRenderer.invoke('openFile')) :
                              of(null);
  }

  /**
   * Reads through a file and returns an object list based on given file
   * information.
   **/
  readFile(setFile: SetFile): Observable<SetObject[]|null> {
    return this.ipcRenderer ?
                  from(this.ipcRenderer.invoke('readFile', setFile)) :
                  of(null);
  }

  /** Saves a binary file from file information and a given object list. */
  saveFile(setFile: SetFile): Observable<boolean> {
    return this.ipcRenderer ?
                  from(this.ipcRenderer.invoke('saveFile', setFile)) :
                  of(null);
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
