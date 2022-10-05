import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { QueryParams, SetObject } from '../shared/interfaces';

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

    if (queryParams.has('fileName')) {
      this.fileName = queryParams.get('fileName')!;
    }
    if (queryParams.has('isSA2Format')) {
      this.isSA2Format = queryParams.get('isSA2Format')! === 'true';
    }
    if (queryParams.has('fileType')) {
      this.fileType = queryParams.get('fileType')!;
    }

    this.objectService.setObjectList(OBJECTS);
    this.objectsEmitter.subscribe((setObjects) => {
      this.numOfObjects = setObjects.length;
    });
  }

}