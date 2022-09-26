import { Component, OnInit } from '@angular/core';

import { OBJECTS } from '../shared/mock-objects';
import { ObjectService } from './object.service';

@Component({
  selector: 'app-set-editor',
  templateUrl: './set-editor.component.html',
  styleUrls: ['./set-editor.component.scss']
})
export class SetEditorComponent implements OnInit {
  readonly objectsEmitter = this.objectService.objectsEmitter;

  constructor(private readonly objectService: ObjectService) { }

  ngOnInit() {
    this.objectService.setObjectList(OBJECTS);
  }

}
