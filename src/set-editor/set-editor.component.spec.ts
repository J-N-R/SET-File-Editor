import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of as observableOf } from 'rxjs';

import SetEditorComponent from './set-editor.component';
import { ElectronService } from '../shared/electron.service';

describe('SetEditorComponent', () => {
  let component: SetEditorComponent;
  let fixture: ComponentFixture<SetEditorComponent>;
  let router: Router;
  let electronService: ElectronService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [ElectronService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetEditorComponent);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    electronService = TestBed.inject(ElectronService);
    fixture.detectChanges();
  });

  it('has a loading state', () => {
    const loadingEl = fixture.nativeElement.querySelector('mat-spinner');
    expect(loadingEl).toBeDefined();
  });

  it('reads from query parameters', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue(getTestUrl());
    component.ngOnInit();

    expect(component.isSA2Format).toEqual(true);
    expect(component.fileName).toEqual('testFileName.bin');
    expect(component.fileType).toEqual('S');
    expect(component.stage).toEqual(13);
  });

  it('attempts to read from file if path is detected', () => {
    spyOnProperty(router, 'url', 'get').and.returnValue(getTestUrl(true));
    spyOn(electronService, 'readFile').and.returnValue(observableOf([]));
    component.ngOnInit();

    const mockSetFile = {
      fileName: 'testFileName.bin',
      isSA2Format: true,
      stage: 13,
      setObjects: [],
      filePath: 'testPath',
    }
    expect(electronService.readFile).toHaveBeenCalledWith(mockSetFile);
  });
});

function getTestUrl(hasFilePath = false): string {
  return [
    '/',
    '?isSA2Format=true',
    '&fileName=testFileName',
    '&fileType=S',
    '&stage=13',
    hasFilePath ? '&filePath=testPath' : [],
  ].flat().join('');
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
