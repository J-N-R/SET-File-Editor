import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'

import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { first } from 'rxjs/operators';
import { SetFile } from '../interfaces';

/** Dialog that opens when a user wants to open or create a file. */
@Component({
  standalone: true,
  selector: 'app-file-form',
  templateUrl: './file-form.component.html',
  styleUrls: ['./file-form.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    ReactiveFormsModule,
    RouterModule,
  ],
})
export class FileFormComponent implements OnInit {
  @Output() cancelEvent = new EventEmitter();

  @Input() setFile: SetFile|null = null;

  error = false;
  form = new FormGroup({
    fileName: new FormControl('(placeholder)'),
    isSA2Format: new FormControl<boolean|null>(null, Validators.required),
    fileType: new FormControl('S'),
    stage: new FormControl<number|null>(null, Validators.required),
    mode: new FormControl<string|null>(null),
  });
  readonly sa1Formats = SA1_FORMATS;
  readonly sa2Formats = SA2_FILE_SUFFIXES;
  readonly sa1Stages = SA1_STAGES;
  readonly sa2Stages = SA2_STAGES;
  readonly modes = SA2_MODES;

  get fileName() {
    return this.form.get('fileName');
  }

  get isSA2Format() {
    return this.form.get('isSA2Format');
  }

  get fileType() {
    return this.form.get('fileType');
  }

  get stage() {
    return this.form.get('stage');
  }

  get mode() {
    return this.form.get('mode');
  }

  get queryParams() {
    const queryParams: QueryParams = {};

    if (this.fileName?.value) {
      queryParams.fileName = this.fileName.value;
    }
    if (this.isSA2Format?.value) {
      queryParams.isSA2Format = this.isSA2Format.value;
    }
    if (this.fileType?.value) {
      queryParams.fileType = this.fileType.value;
    }
    if (this.stage?.value) {
      queryParams.stage = this.stage.value;
    }
    if (this.setFile?.filePath) {
      queryParams.filePath = this.setFile.filePath;
    }
    
    return queryParams;
  }

  ngOnInit() {
    // Disable detailed inputs in the beginning.
    this.fileName?.disable();
    this.fileType?.disable();
    this.stage?.disable();

    // Enable fileType and stage inputs when user inputs game version.
    this.isSA2Format?.valueChanges.pipe(first()).subscribe(() => {
      this.fileType?.enable();
      this.stage?.enable();
    });

    // Change the fileName on fileType change.
    this.fileType?.valueChanges.subscribe(() => {
      if (this.fileType?.value && this.stage?.value) {
        this.setFileName(this.stage.value);
      }
    });
    
    // Change the fileName on stage change.
    this.stage?.valueChanges.subscribe(() => {
      if (this.stage?.value) {
        this.fileName?.enable();
        this.setFileName(this.stage.value);
      }
    });

    // Change the fileName on mode change.
    this.mode?.valueChanges.subscribe(() => {
      if (this.mode?.value && this.stage?.value) {
        this.setFileName(this.stage.value);
      }
    });

    // If a file was opened, prepopulate the forms.
    if (this.setFile) {
      this.fileName?.setValue(this.setFile.fileName);
      this.isSA2Format?.setValue(this.setFile.isSA2Format ?? null);
      this.stage?.setValue(this.setFile.stage ?? null);
      
      if (this.setFile.fileName.toLowerCase().includes('_u')) {
        this.fileType?.setValue('Decorative');
      }
    }
  }

  cancel() {
    this.cancelEvent.emit();
  }

  noSorting(): number {
    return 0;
  }

  private setFileName(stage: number) {
    const fileName = stage < 10 ? 'SET000' + stage : 'SET00' + stage;
    this.fileName?.setValue([
      fileName,
      this.mode?.value || [],
      this.fileType?.value || [],
    ].flat().join('_') + '.bin');
  }
}

const SA1_FORMATS = [
  'Unsupported',
];
const SA2_MODES = new Map<string|null, string>([
  [null, ''],
  ['2 Player', '2P'],
  ['Hard Mode', 'HD'],
]);
const SA2_FILE_SUFFIXES = new Map<string, string>([
  ['Normal', 'S'],
  ['Decorative', 'U'],
]);
const SA1_STAGES: Stage[] = [
  {name: 'Unsupported', id: 0},
]

/**
 * Map of external stage name to internal level id.
 * TODO: You can probably merge this and the sa2levels
 * object list with a custom interface.
*/
const SA2_STAGES: Stage[] = [
  {name: "Basic Test", id: 0},
  {name: "Green Forest", id: 3},
  {name: "White Jungle", id: 4},
  {name: "Pumpkin Hill", id: 5},
  {name: "Sky Rail", id: 6},
  {name: "Aquatic Mine", id: 7},
  {name: "Security Hall", id: 8},
  {name: "Prison Lane", id: 9},
  {name: "Metal Harbor", id: 10},
  {name: "Iron Gate", id: 11},
  {name: "Weapons Bed", id: 12},
  {name: "City Escape", id: 13},
  {name: "Radical Highway", id: 14},
  {name: "Weapons Bed 2P", id: 15},
  {name: "Wild Canyon", id: 16},
  {name: "Mission Street", id: 17},
  {name: "Dry Lagoon", id: 18},
  {name: "Sonic vs. Shadow 1", id: 19},
  {name: "Tails vs. Eggman 1", id: 20},
  {name: "Sand Ocean", id: 21},
  {name: "Crazy Gadget", id: 22},
  {name: "Hidden Base", id: 23},
  {name: "Eternal Engine", id: 24},
  {name: "Death Chamber", id: 25},
  {name: "Egg Quarters", id: 26},
  {name: "Lost Colony", id: 27},
  {name: "Pyramid Cave", id: 28},
  {name: "Tails vs. Eggman 2", id: 29},
  {name: "Final Rush", id: 30},
  {name: "Green Hill", id: 31},
  {name: "Meteor Herd", id: 32},
  {name: "Knuckles vs. Rouge", id: 33},
  {name: "Cannon's Core (Sonic)", id: 34},
  {name: "Cannon's Core (Eggman)", id: 35},
  {name: "Cannon's Core (Tails)", id: 36},
  {name: "Cannon's Core (Rouge)", id: 37},
  {name: "Cannon's Core (Knuckles)", id: 38},
  {name: "Mission Street 2P", id: 39},
  {name: "Final Chase", id: 40},
  {name: "Wild Canyon 2P", id: 41},
  {name: "Sonic Vs Shadow 2", id: 42},
  {name: "Cosmic Wall", id: 43},
  {name: "Mad Space", id: 44},
  {name: "Sand Ocean 2P", id: 45},
  {name: "Dry Lagoon 2P", id: 46},
  {name: "Pyramid Race", id: 47},
  {name: "Hidden Base 2P", id: 48},
  {name: "Pool Quest", id: 49},
  {name: "Planet Quest", id: 50},
  {name: "Deck Race", id: 51},
  {name: "Downtown Race", id: 52},
  {name: "Cosmic Wall 2P", id: 53},
  {name: "Grind Race", id: 54},
  {name: "Lost Colony 2P", id: 55},
  {name: "Eternal Engine 2P", id: 56},
  {name: "Metal Harbor 2P", id: 57},
  {name: "Iron Gate 2P", id: 58},
  {name: "Death Chamber 2P", id: 59},
];

/** Query Params sent from intro to editor page. */
interface QueryParams {
  fileName?: string,
  isSA2Format?: boolean,
  fileType?: string,
  stage?: number,
  filePath?: string,
};

interface Stage {
  name: string,
  id: number,
}

// https://blog.angular-university.io/angular-material-dialog/
