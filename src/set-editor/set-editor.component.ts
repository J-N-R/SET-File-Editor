import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { debounceTime, first } from 'rxjs/operators';
import { CommonModule, Location } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VirtualScrollerModule } from '@iharbeck/ngx-virtual-scroller';

import { MOCK_OBJECTS } from '../shared/mock-objects';
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
  loading = true;
  stage = 13;
  numOfObjects = 0;
  levelObjectGroups = new Map<string, Set<SA2Object>>();

  readonly objectsEmitter = this.objectService.objectsEmitter;

  constructor(private readonly objectService: ObjectService,
    private readonly electronService: ElectronService,
    private readonly location: Location,
    private readonly dialog: MatDialog,
    private readonly router: Router,
    readonly changeDetectorRef: ChangeDetectorRef) {}

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
    if (queryParams.has('filePath')) {
      const setFile: SetFile = {
        fileName: this.fileName,
        ...(queryParams.has('isSA2Format') && {isSA2Format: this.isSA2Format}),
        ...(queryParams.has('stage') && {stage: this.stage}),
        setObjects: [],
        filePath: queryParams.get('filePath')!,
      }
      this.electronService.readFile(setFile).pipe(first()).subscribe(
        (objectList) => {
          if (objectList) {
            this.levelObjectGroups = this.objectService.getLevelObjects(this.stage);
            this.objectService.setObjectList(this.levelObjectGroups, this.stage, objectList);
            this.numOfObjects = objectList.length;
          }
          else {
            console.error('Error trying to read the file.');
          }
          this.loading = false;
          this.changeDetectorRef.detectChanges();
      });
    }
    else {
      this.levelObjectGroups = this.objectService.getLevelObjects(this.stage);
      this.objectService.setObjectList(this.levelObjectGroups, this.stage, MOCK_OBJECTS);
      this.numOfObjects = MOCK_OBJECTS.length;
      this.loading = false;
    }
  }

  addObject() {
    this.objectService.addBlankObject(this.levelObjectGroups, this.stage);
    this.numOfObjects++;
  }

  clearObjects() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
        {autoFocus: false, height: '160px', width: '290px'});

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.objectService.clearObjectList();
        this.numOfObjects = 0;
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

  closeFile() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {autoFocus: false, height: '160px', width: '290px'});

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.objectService.clearObjectList()
        this.router.navigate(['']);
      }
    });
  }

  deleteObject(event: number) {
    this.objectService.deleteObject(event);
    this.numOfObjects--;
  }

  trackById(index: number, object: SetObject): number {
    return object.id;
  }
}
