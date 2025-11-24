import { Component } from '@angular/core';
import { IonButtonComponent } from 'ion';

@Component({
  selector: 'app-root',
  imports: [IonButtonComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ion-test-app';
}
