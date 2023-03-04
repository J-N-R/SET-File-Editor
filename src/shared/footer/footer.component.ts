import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RELEASES_URL, VERSION } from '../content';

/** Footer for the Set Editor App. */
@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  imports: [
    CommonModule,
  ],
})
export class FooterComponent {
  @Input() isIntro = false;
  @Input() updateDetected = false;

  readonly VERSION = VERSION;
  readonly RELEASES_URL = RELEASES_URL;
}
