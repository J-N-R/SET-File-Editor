import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { OBJECTS } from '../shared/mock-objects';
import { ObjectService } from './object.service';

@Component({
  selector: 'app-set-editor',
  templateUrl: './set-editor.component.html',
  styleUrls: ['./set-editor.component.scss']
})
export class SetEditorComponent implements OnInit {
  fileName = '';
  isSA2Format = false;
  fileType = '';
  numOfObjects = 0;

  readonly objectsEmitter = this.objectService.objectsEmitter;

  constructor(private readonly objectService: ObjectService,
    private readonly location: Location) {}

  ngOnInit() {
    const queryParams = new URLSearchParams(this.location.path().split('?')[1]);

    console.log(...queryParams.keys());

    console.log(this.location.path());

    if (queryParams.has('isSA2Format')) {
      this.isSA2Format = queryParams.get('isSA2Format')! === 'true';
    }
    if (queryParams.has('fileType')) {
      this.fileType = queryParams.get('fileType')!;
    }
    if (queryParams.has('fileName')) {
      let fileName = queryParams.get('fileName')!;
      fileName = fileName.split('.')[0];

      if (this.fileType !== '') {
        this.fileName = fileName + FILE_NAME_SUFFIX.get(this.fileType) + '.bin';
      }
      else {
        this.fileName = fileName + '.bin';
      }
    }

    this.objectService.setObjectList(OBJECTS);
    this.objectsEmitter.subscribe((setObjects) => {
      this.numOfObjects = setObjects.length;
    });
  }
}

// Suffixes to add to file name to make it SA2 compatible.
// May add an option for 'custom' in the future with no suffix.
const FILE_NAME_SUFFIX = new Map([
  ['Normal', '_S'],
  ['Decorative', '_U'],
  ['Hard Mode', '_HD_S'],
]);