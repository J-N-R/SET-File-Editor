import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { first } from 'rxjs/operators';

import { OBJECTS } from '../shared/mock-objects';
import { ObjectService } from './object.service';
import { ElectronService } from '../shared/electron.service';

import { ObjectGroup } from '../shared/interfaces';
import { SA2Object, ALL_OBJECTS, CITY_ESCAPE_OBJECTS } from '../shared/content';

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
  levelObjectGroups: ObjectGroup[] = [];

  readonly objectsEmitter = this.objectService.objectsEmitter;

  constructor(private readonly objectService: ObjectService,
    private readonly electronService: ElectronService,
    private readonly location: Location) {}

  ngOnInit() {
    const queryParams = new URLSearchParams(this.location.path().split('?')[1]);

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
        this.fileName = fileName + SA2_FILE_NAME_SUFFIX.get(this.fileType) + '.bin';
      }
      else {
        this.fileName = fileName + '.bin';
      }
    }

    this.objectService.setObjectList(OBJECTS);
    this.objectsEmitter.subscribe((setObjects) => {
      this.numOfObjects = setObjects.length;
    });

    this.levelObjectGroups = this.objectService.getLevelObjects(CITY_ESCAPE_OBJECTS);
  }

  handleAddClick() {
    this.objectService.addBlankObject();
  }

  handleSaveClick() {
    this.objectService.objectsEmitter.pipe(first()).subscribe((objectList) => {
      this.electronService.saveFile({
        fileName: this.fileName,
        isSA2Format: this.isSA2Format,
        setObjects: objectList,
      });
    })
  }

  onDelete(event: number) {
    this.objectService.deleteObject(event);
  }
}

// Suffixes to add to file name to make it SA2 compatible.
// May add an option for 'custom' in the future with no suffix.
const SA2_FILE_NAME_SUFFIX = new Map([
  ['Normal', '_S'],
  ['Decorative', '_U'],
  ['Hard Mode', '_HD_S'],
]);