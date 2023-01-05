import { Component, Input } from '@angular/core';
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
  @Input() isIntro = false;
  @Input() fileName?: string;
  @Input() numOfObjects?: number;
}
