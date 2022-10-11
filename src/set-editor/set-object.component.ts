import { Component, Input } from '@angular/core';

import { SetObject, ObjectGroup } from '../shared/interfaces';
import { SA2Object } from '../shared/content';

@Component({
  selector: 'app-set-object',
  templateUrl: './set-object.component.html',
  styleUrls: ['./set-object.component.scss']
})
export class SetObjectComponent {
  @Input() object: SetObject = {
    id: 0,
    object: SA2Object.DMYOBJ,
    x: 0,
    y: 0,
    z: 0,
  };
  @Input() levelObjects: ObjectGroup[] = [];
}
