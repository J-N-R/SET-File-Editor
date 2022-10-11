import { Component, OnInit, Input } from '@angular/core';

import { SetObject } from '../shared/interfaces';
import { SA2Object } from '../shared/content';

@Component({
  selector: 'app-set-object',
  templateUrl: './set-object.component.html',
  styleUrls: ['./set-object.component.scss']
})
export class SetObjectComponent implements OnInit {
  @Input() object: SetObject = {
    id: 0,
    object: SA2Object.DMYOBJ,
    x: 0,
    y: 0,
    z: 0,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
