import { Component, Input } from '@angular/core';

/** Header for the Set Editor App. */
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input() isIntro = false;
  @Input() fileName = '';
  @Input() numObjects = 0;
}
