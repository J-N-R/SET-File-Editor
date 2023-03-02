import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

/** Header for the Set Editor App. */
@Component({
  standalone: true,
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  imports: [
    CommonModule,
  ],
})
export class HeaderComponent {
  @Output() save = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() add = new EventEmitter();
  @Output() clear = new EventEmitter();

  @Input() isIntro = false;
  @Input() fileName?: string;
  @Input() numOfObjects?: number;

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
}
