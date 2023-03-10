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



// Legal jargon.
/*************************************************************************
 * Copyright 2023 Google LLC
 * 
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy
 * of the License at
 * 
 *  https://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations
 * under the License.
 *************************************************************************/
