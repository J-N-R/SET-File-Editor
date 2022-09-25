import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  templateUrl: './intro.component.html',
  styleUrls: ['./intro.component.scss']
})
export class IntroComponent {

  constructor(private readonly router: Router) {}

  open() {
    this.router.navigate(['editor']);
  }

  create() {
    this.router.navigate(['editor']);
  }

}
