import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FileFormComponent } from './file-form.component';

describe('FileFormComponent', () => {
  let component: FileFormComponent;
  let fixture: ComponentFixture<FileFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FileFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FileFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /** TODO: Test that form fields are disabled for certain conditions. */
  /** TODO: Test that input changes the file name. */
  /** TODO: Test that different form fields pop up for different selections. */
  /** TODO: Test that getting an opened file will prepopulate the form. */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
