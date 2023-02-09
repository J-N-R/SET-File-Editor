import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VERSION } from '../content';

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
  readonly VERSION = VERSION;
}
