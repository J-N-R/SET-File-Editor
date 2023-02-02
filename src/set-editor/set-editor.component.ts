import { Component, OnInit } from '@angular/core';
import { debounceTime, first } from 'rxjs/operators';

import { OBJECTS } from '../shared/mock-objects';

import { ObjectGroup } from '../shared/interfaces';
import { CITY_ESCAPE_OBJECTS } from '../shared/content';

import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

import { ObjectService } from './object.service';
import { ElectronService } from '../shared/electron.service';

import { SetObjectComponent } from './set-object.component';

@Component({
  standalone: true,
  selector: 'app-set-editor',
  templateUrl: './set-editor.component.html',
  styleUrls: ['./set-editor.component.scss'],
  imports: [
    CommonModule,
    FooterComponent,
    HeaderComponent,
    MatButtonModule,
    MatIconModule,
    SetObjectComponent,
  ],
})
export default class SetEditorComponent implements OnInit {
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
      let fileName = queryParams.get('fileName')!.split('.')[0];
      this.fileName = fileName + '.bin';
    }

    this.objectService.setObjectList(OBJECTS);
    this.objectsEmitter.subscribe((setObjects) => {
      this.numOfObjects = setObjects.length;
    });

    this.levelObjectGroups = this.objectService.getLevelObjects(CITY_ESCAPE_OBJECTS);
  }

  addObject() {
    this.objectService.addBlankObject();
  }

  saveFile() {
    this.objectsEmitter.pipe(debounceTime(0), first()).subscribe((objectList) => {
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
