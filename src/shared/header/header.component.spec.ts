import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let component: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderComponent ]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('only displays title on intro page', () => {
    component.isIntro = true;
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css(TITLE));
    expect(titleEl).toBeDefined();
    expect(titleEl.classes[CENTERED]).toBeDefined();
  });

  it('displays title, fileName, and object count on editor page', () => {
    component.isIntro = false;
    component.fileName = FILE_NAME;
    component.numOfObjects = NUM_OBJECTS;
    fixture.detectChanges();

    const titleEl = fixture.debugElement.query(By.css(TITLE));
    expect(titleEl).toBeDefined();
    expect(titleEl.classes[CENTERED]).toBeUndefined();

    const fileNameEl = fixture.debugElement.query(By.css(FILE_NAME_DISPLAY));
    expect(fileNameEl).toBeDefined();
    expect(fileNameEl.nativeElement.innerText).toBe(FILE_NAME);

    const objectsEl = fixture.debugElement.query(By.css(NUM_OBJECTS_DISPLAY));
    expect(objectsEl).toBeDefined();
    expect(objectsEl.nativeElement.innerText).toBe(`${NUM_OBJECTS} Objects`);
  });
});

const TITLE = '.mat-display-2';
const FILE_NAME_DISPLAY = '.file-name';
const NUM_OBJECTS_DISPLAY = '.objects';
const NUM_OBJECTS = 1;
const FILE_NAME = 'test file name';
const CENTERED = 'center';
