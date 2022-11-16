import { Injectable } from '@angular/core';
import { ipcRenderer } from 'electron';
import { Observable, from, of } from 'rxjs';

import { SetFile } from './interfaces';

/** Manages interfacing with the operating system using Electron. */
@Injectable({
  providedIn: 'root'
})
export class ElectronService {
  private ipcRenderer?: typeof ipcRenderer;

  constructor() {
    // Only available if running in electron
    if (this.isElectron()) {
      this.ipcRenderer = (window).require('electron').ipcRenderer;
    }
    else {
      console.log("Electron not detected. Some file features will be disabled.");
    }
  }

  isElectron(): boolean {
    return !!((window) && (window).process && (window).process.type);
  }

  openFile(): Observable<any> {
    return this.ipcRenderer ? from(this.ipcRenderer.invoke('openFile')) : of(null);
  }

  saveFile(setFile: SetFile): Observable<any> {
    return this.ipcRenderer ? from(this.ipcRenderer.invoke('saveFile', setFile)) : of(null);
  }
}
