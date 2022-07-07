import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ion-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.css']
})
export class ButtonComponent implements OnInit {
  @Input() label: string;

  constructor() { }

  ngOnInit() {
  }

}
