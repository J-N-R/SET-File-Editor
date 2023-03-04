import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonToggleModule, MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatChipListboxChange, MatChipsModule } from '@angular/material/chips';

import { SORTING_OPTIONS } from '../content';

/** Header for the Set Editor App. Doubles as a control center for objects. */
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonToggleModule,
    MatChipsModule,
  ],
})
export class HeaderComponent {
  @Output() save = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() clear = new EventEmitter();
  @Output() sort = new EventEmitter();
  @Output() coordinates = new EventEmitter();

  @Input() isIntro = false;
  @Input() fileName?: string;
  @Input() numOfObjects?: number;

  coordinatesStyle = 'game';
  readonly SORTING_OPTIONS = SORTING_OPTIONS;

  emitSave() {
    this.save.emit();
  }

  emitClose() {
    this.close.emit();
  }

  emitAdd() {
    this.add.emit();
  }

  emitClear() {
    this.clear.emit();
  }

  emitSort(event: MatChipListboxChange) {
    this.sort.emit(event.source.value);
  }

  emitCoordinateStyle(event: MatButtonToggleChange) {
    this.coordinates.emit(event.source.value);
  }
}
