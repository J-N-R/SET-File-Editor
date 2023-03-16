import { ComponentFixture, TestBed } from '@angular/core/testing';

import SetEditorComponent from './set-editor.component';

describe('SetEditorComponent', () => {
  let component: SetEditorComponent;
  let fixture: ComponentFixture<SetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /** TODO: Test that query parameters work properly. */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



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
