import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatExpansionPanelHarness } from '@angular/material/expansion/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';

import { SetObjectComponent } from './set-object.component';
import { SA2Object } from '../shared/objects';
import { ObjectService } from './object.service';

describe('SetObjectComponent', () => {
  let loader: HarnessLoader;
  let component: SetObjectComponent;
  let fixture: ComponentFixture<SetObjectComponent>;
  let expansionPanel: MatExpansionPanelHarness;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule],
      providers: [ObjectService],
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetObjectComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    expansionPanel = await loader.getHarness(MatExpansionPanelHarness);
    component = fixture.componentInstance;
    component.levelObjectCategories = DUMMY_CATEGORIES;
    fixture.detectChanges();
  });

  it('should accept lowercase input and convert to proper case', async () => {
    // Click open the set object panel.
    await expansionPanel.expand();

    // Type "ring" into the autocomplete.
    const autocomplete = await loader.getHarness(MatAutocompleteHarness);
    await autocomplete.clear();
    await autocomplete.enterText('ring');

    expect(component.object.type).toEqual('Ring');
  });

  it('should filter objects based on autocomplete', async () => {
    // Click open the set object panel.
    await expansionPanel.expand();

    // Type "ring" into the autocomplete.
    const autocomplete = await loader.getHarness(MatAutocompleteHarness);
    await autocomplete.clear();
    await autocomplete.enterText('ring');

    expect(component.filteredObjectCategories).toEqual(new Map([
      ['Collectables', new Set([SA2Object.RING])],
    ]));
  });

  it('should display custom variable if label is available', async () => {
    component.object.displayInfo!.setLabel = {var1: 'mock label'};
    await expansionPanel.expand();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelectorAll('mat-form-field').length).toBe(8);
  });

  it('should display label icon if label is available', async () => {
    component.object.displayInfo!.setLabel = {xRot: 'mock label'};
    await expansionPanel.expand();
    fixture.detectChanges();

    const formFields = await loader.getAllHarnesses(MatFormFieldHarness);
    const xRotation = formFields[4];

    expect(await xRotation.getLabel()).toEqual('x Rot info');
  });
});

const DUMMY_CATEGORIES = new Map<string, Set<SA2Object>>([
  ['Test category', new Set([SA2Object.DMYOBJ])],
  ['Collectables', new Set([SA2Object.RING])],
]);



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
