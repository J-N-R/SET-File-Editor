import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { SORTING_OPTIONS } from '../content';
import { SortingFn, SortingOption } from '../interfaces';

/** Header for the Set Editor App. Doubles as a control center for objects. */
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
    MatChipsModule,
  ],
})
export class HeaderComponent {
  @Output() save = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() clear = new EventEmitter();
  @Output() sort = new EventEmitter();

  @Input() isIntro = false;
  @Input() fileName?: string;
  @Input() numOfObjects?: number;

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

  emitSort(sortingOption: SortingOption) {
    this.sort.emit(sortingOption);
  }
}
