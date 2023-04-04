import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ion-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css'],
})
export class IonSelectComponent implements OnInit {
  placeholder = 'choose';

  ngOnInit(): void {
    this.placeholder = 'sada';
  }
}
