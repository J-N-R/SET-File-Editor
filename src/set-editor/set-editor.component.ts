import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { debounceTime, first } from 'rxjs/operators';
import { CommonModule, Location } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VirtualScrollerModule } from '@iharbeck/ngx-virtual-scroller';

import { OBJECTS } from '../shared/mock-objects';
import { SA2Object } from '../shared/objects';
import { SetFile, SetObject } from '../shared/interfaces';

import { ObjectService } from './object.service';
import { ElectronService } from '../shared/electron.service';

import { SetObjectComponent } from './set-object.component';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';

/** Main object editing page. */
@Component({
  standalone: true,
  selector: 'app-set-editor',
  templateUrl: './set-editor.component.html',
  styleUrls: ['./set-editor.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    CommonModule,
    ConfirmationDialogComponent,
    FooterComponent,
    HeaderComponent,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressSpinnerModule,
    SetObjectComponent,
    VirtualScrollerModule,
  ],
})
export default class SetEditorComponent implements OnInit {
  fileName = '';
  isSA2Format = false;
  fileType = '';
  loading = false;
  stage = 13;
  numOfObjects = 0;
  levelObjectGroups = new Map<string, Set<SA2Object>>();

  readonly objectsEmitter = this.objectService.objectsEmitter;

  constructor(private readonly objectService: ObjectService,
    private readonly electronService: ElectronService,
    private readonly location: Location,
    private readonly dialog: MatDialog,
    readonly changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit() {
    const queryParams = new URLSearchParams(this.location.path().split('?')[1]);
    this.objectService.setObjectList(OBJECTS);

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
    if (queryParams.has('filePath')) {
      this.loading = true;
      const setFile: SetFile = {
        fileName: this.fileName,
        ...(queryParams.has('isSA2Format') && {isSA2Format: this.isSA2Format}),
        ...(queryParams.has('stage') && {stage: this.stage}),
        setObjects: [],
        filePath: queryParams.get('filePath')!,
      }
      this.electronService.readFile(setFile).pipe(first()).subscribe(
        (objectList) => {
          this.loading = false;
          if (objectList) {
            this.objectService.setObjectList(objectList);
          }
          else {
            console.error('Error trying to read the file.');
          }
          this.changeDetectorRef.detectChanges();
      });
    }

    this.objectsEmitter.subscribe((setObjects) => {
      this.numOfObjects = setObjects.length;
    });

    this.levelObjectGroups = this.objectService.getLevelObjects(this.stage);
  }

  addObject() {
    this.objectService.addBlankObject();
  }

  clearObjects() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
        {autoFocus: false, height: '160px', width: '290px'});

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

  trackById(index: number, object: SetObject): number {
    return object.id;
  }
}
