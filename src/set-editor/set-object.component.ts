import { Component, OnInit, Input } from '@angular/core';
import { SetObject } from '../shared/interfaces';

@Component({
  selector: 'app-set-object',
  templateUrl: './set-object.component.html',
  styleUrls: ['./set-object.component.scss']
})
export class SetObjectComponent implements OnInit {
  @Input() object: SetObject = {
    oid: 0,
    name: '',
    x: 0,
    y: 0,
    z: 0,
    xRot: 0,
    yRot: 0,
    zRot: 0,
  };

  constructor() { }

  ngOnInit(): void {
  }

}
