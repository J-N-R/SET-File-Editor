import { Component, EventEmitter, Output, OnInit } from '@angular/core';
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

  error = false;
  title = 'Create File';
  form = new FormGroup({
    fileName: new FormControl('(placeholder)'),
    isSA2Format: new FormControl(null, Validators.required),
    fileType: new FormControl('Normal'),
    stage: new FormControl(null, Validators.required),
    mode: new FormControl(null),
  });
  readonly sa1Formats = SA1_FORMATS;
  readonly sa2Formats = SA2_FORMATS;
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

  get queryParams() {
    const queryParams: QueryParams = {};

    if (this.fileName) {
      queryParams.fileName = this.fileName.value!;
    }
    if (this.isSA2Format) {
      queryParams.isSA2Format = String(this.isSA2Format.value!);
    }
    if (this.fileType) {
      queryParams.fileType = this.fileType.value!;
    }
    if (this.stage) {
      queryParams.stage = this.stage.value!;
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
      if (this.fileType?.value) {
        const fileNameFormatted = this.fileName?.value?.split('_')[0] ?? '';
        const fileNameSuffix = SA2_FILE_SUFFIXES.get(this.fileType.value) ?? '';
        this.fileName?.setValue(fileNameFormatted + fileNameSuffix + '.bin');
      }
    });
    
    // Change the fileName on stage change.
    this.stage?.valueChanges.subscribe(() => {
      if (this.stage?.value) {
        this.fileName?.enable();
        let fileName = 'SET00';
        if (this.stage.value < 10) {
          fileName += '0';
        }
        fileName += this.stage.value;
        let fileNameSuffix = this.fileName?.value?.split('_')[1] ?? '';
        fileNameSuffix = '_' + fileNameSuffix.split('.')[0];
        this.fileName?.setValue(fileName + fileNameSuffix + '.bin');
      }
    });
  }

  cancel() {
    this.cancelEvent.emit();
  }
}

const SA1_FORMATS = [
  'Unsupported',
];

const SA2_FORMATS = [
  'Normal',
  'Decorative',
];

const SA2_MODES = [
  null,
  '2 Player',
  'Hard Mode',
]

const SA2_FILE_SUFFIXES = new Map<string, string>([
  ['Normal', '_S'],
  ['Decorative', '_U'],
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
  isSA2Format?: string,
  fileType?: string,
  stage?: string,
};

interface Stage {
  name: string,
  id: number,
}

// https://blog.angular-university.io/angular-material-dialog/
