import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetObjectComponent } from './set-object.component';

describe('SetObjectComponent', () => {
  let component: SetObjectComponent;
  let fixture: ComponentFixture<SetObjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetObjectComponent ]
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
