import { ComponentFixture, TestBed } from '@angular/core/testing';

import SetEditorComponent from './set-editor.component';

describe('SetEditorComponent', () => {
  let component: SetEditorComponent;
  let fixture: ComponentFixture<SetEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetEditorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /** TODO: Test that 'add' adds a new object. */
  /** TODO: Test that 'clear' asks for permission. */
  /** TODO: Test that query parameters work properly. */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
