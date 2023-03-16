import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetObjectComponent } from './set-object.component';

describe('SetObjectComponent', () => {
  let component: SetObjectComponent;
  let fixture: ComponentFixture<SetObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetObjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * TODO: Test that changes here are reflected in the object list.
   * (Modifying, Deleting, etc)
   * TODO: Test that setting object returns it back to proper capitalized name.
   * TODO: Test that labels work properly.
   * TODO: Test that labels work properly with different stages.
   **/
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
