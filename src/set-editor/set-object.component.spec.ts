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

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
