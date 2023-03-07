import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialog } from '@angular/material/dialog';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VirtualScrollerModule } from '@iharbeck/ngx-virtual-scroller';
import { debounceTime, first } from 'rxjs/operators';

import { MOCK_OBJECTS } from '../shared/mock-objects';
import { SA2Object } from '../shared/objects';
import { CoordinateStyle, SetFile, SetObject, SortingOption } from '../shared/interfaces';
import { SetObjectComponent } from './set-object.component';
import { ConfirmationDialogComponent } from './confirmation-dialog.component';
import { HeaderComponent } from '../shared/header/header.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { ObjectService } from './object.service';
import { ElectronService } from '../shared/electron.service';

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
    MatDialogModule,
    MatProgressSpinnerModule,
    SetObjectComponent,
    VirtualScrollerModule,
  ],
})
export default class SetEditorComponent implements OnInit {
  fileName = '';
  fileType = '';
  loading = true;
  isSA2Format = false;
  stage = 13;
  numOfObjects = 0;
  coordinateStyle: CoordinateStyle = 'game';
  levelObjectCategories = new Map<string, Set<SA2Object>>();

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
      const fileName = queryParams.get('fileName')!.split('.')[0];
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
            this.numOfObjects = objectList.length;
            this.levelObjectCategories = this.objectService.getLevelObjects(
                this.stage);
            this.objectService.setObjectList(this.levelObjectCategories,
                this.stage, objectList);
          }
          else {
            console.error('Error trying to read the file.');
          }
          this.loading = false;
          this.changeDetectorRef.detectChanges();
      });
    }
    else {
      this.levelObjectCategories = this.objectService.getLevelObjects(
          this.stage);
      this.objectService.setObjectList(this.levelObjectCategories, this.stage,
          MOCK_OBJECTS);
      this.numOfObjects = MOCK_OBJECTS.length;
      this.loading = false;
    }
  }

  addObject() {
    this.objectService.addBlankObject(this.levelObjectCategories, this.stage);
    this.numOfObjects++;
  }

  clearObjects() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
        {autoFocus: false, width: '360px'});

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.objectService.clearObjectList();
        this.numOfObjects = 0;
      }
    });
  }

  saveFile() {
    this.objectsEmitter.pipe(debounceTime(0), first()).subscribe(
      (objectList) => {
        this.electronService.saveFile({
          fileName: this.fileName,
          isSA2Format: this.isSA2Format,
          setObjects: objectList,
          stage: this.stage,
          coordinateStyle: this.coordinateStyle,
        }).pipe(first()).subscribe((result) => {
          const dialogRef = this.dialog.open(ConfirmationDialogComponent,
            {autoFocus: false, width: '360px'});
          if (result) {
            dialogRef.componentInstance.hasCompletedTask = true;
          }
          else {
            dialogRef.componentInstance.error = true;
          }
        });
    })
  }

  closeFile() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent,
      {autoFocus: false, width: '360px'});

    dialogRef.afterClosed().subscribe((confirmation) => {
      if (confirmation) {
        this.objectService.clearObjectList();
        this.router.navigate(['']);
      }
    });
  }

  deleteObject(event: number) {
    this.numOfObjects--;
    this.objectService.deleteObject(event);
  }

  trackById(index: number, object: SetObject): number {
    return object.id;
  }

  setSortingOption(sortingOption: SortingOption) {
    this.objectService.setSortingOption(sortingOption);
  }

  setCoordinateStyle(coordinateStyle: CoordinateStyle) {
    this.coordinateStyle = coordinateStyle;
    this.objectService.setCoordinateStyle(coordinateStyle);
  }
}
