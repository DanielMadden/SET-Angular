import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-set-card-back',
  templateUrl: './set-card-back.component.html',
  styleUrls: ['./set-card-back.component.scss'],
})
export class SetCardBackComponent {
  constructor() {}

  @Input() slideForButtons: boolean = false;
}
