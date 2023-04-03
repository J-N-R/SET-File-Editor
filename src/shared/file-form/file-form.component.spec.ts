import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatRadioGroupHarness } from '@angular/material/radio/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';

import { FileFormComponent } from './file-form.component';
import { SetFile } from '../interfaces';
import { MatInputHarness } from '@angular/material/input/testing';

describe('FileFormComponent', () => {
  let loader: HarnessLoader;
  let component: FileFormComponent;
  let fixture: ComponentFixture<FileFormComponent>;
  let fileNameHarness: MatInputHarness;
  let gameVersionHarness: MatRadioGroupHarness;
  let selectMenu: MatSelectHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        RouterTestingModule
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileFormComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fileNameHarness = await loader.getHarness(MatInputHarness);
    gameVersionHarness = await loader.getHarness(MatRadioGroupHarness);
    selectMenu = await loader.getHarness(MatSelectHarness);
    fixture.detectChanges();
  });

  it('should fill form based on opened file', async () => {
    component.setFile = SET_FILE;
    component.ngOnInit();
    fixture.detectChanges();

    const fileName = await fileNameHarness.getValue();
    const isSA2Format = await gameVersionHarness.getCheckedValue();
    const stage = await selectMenu.getValueText();

    expect(fileName).toEqual('SET0013_S.bin');
    expect(isSA2Format).toEqual('true');
    expect(stage).toEqual('City Escape');
  });

  it('should set file name to (placeholder) by default', async () => {
    expect(await fileNameHarness.getValue()).toEqual('(placeholder)');
  });
});

const SET_FILE: SetFile = {
  fileName: 'SET0013_S.bin',
  setObjects: [],
  isSA2Format: true,
  stage: 13,
};



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
