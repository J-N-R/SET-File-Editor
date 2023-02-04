import { Component, OnInit } from '@angular/core';
import { debounceTime, first } from 'rxjs/operators';

import { OBJECTS } from '../shared/mock-objects';

import { ObjectGroup } from '../shared/interfaces';
import { CITY_ESCAPE_OBJECTS } from '../shared/sa2-levels';

import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

import { ObjectService } from './object.service';
import { ElectronService } from '../shared/electron.service';

import { SetObjectComponent } from './set-object.component';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';

@Component({
  standalone: true,
  selector: 'app-set-editor',
  templateUrl: './set-editor.component.html',
  styleUrls: ['./set-editor.component.scss'],
  imports: [
    CommonModule,
    ConfirmationDialogComponent,
    FooterComponent,
    HeaderComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    SetObjectComponent,
  ],
})
export default class SetEditorComponent implements OnInit {
  fileName = '';
  isSA2Format = false;
  fileType = '';
  stage = 13;
  numOfObjects = 0;
  levelObjectGroups: ObjectGroup[] = [];

  readonly objectsEmitter = this.objectService.objectsEmitter;

  constructor(private readonly objectService: ObjectService,
    private readonly electronService: ElectronService,
    private readonly location: Location,
    private readonly dialog: MatDialog) {}

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
    if (queryParams.has('stage')) {
      this.stage = Number(queryParams.get('stage')!);
    }

    this.objectService.setObjectList(OBJECTS);
    this.objectsEmitter.subscribe((setObjects) => {
      this.numOfObjects = setObjects.length;
    });

    this.levelObjectGroups = this.objectService.getLevelObjects(this.stage);
  }

  addObject() {
    this.objectService.addBlankObject();
  }

  clearObjects() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {autoFocus: false, height: '160px', width: '290px'});

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.objectService.setObjectList([]);
      }
    });
  }

  saveFile() {
    this.objectsEmitter.pipe(debounceTime(0), first()).subscribe((objectList) => {
      this.electronService.saveFile({
        fileName: this.fileName,
        isSA2Format: this.isSA2Format,
        setObjects: objectList,
        stage: this.stage,
      });
    })
  }

  onDelete(event: number) {
    this.objectService.deleteObject(event);
  }
}
