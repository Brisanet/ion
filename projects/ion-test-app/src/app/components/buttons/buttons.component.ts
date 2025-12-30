import { Component } from '@angular/core';
import { IonButtonComponent, IonIconComponent } from 'ion';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [IonButtonComponent, IonIconComponent],
  templateUrl: './buttons.component.html',
  styleUrls: ['./buttons.component.scss'],
})
export class ButtonsComponent {}
