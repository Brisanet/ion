import { Component } from '@angular/core';
import { IonButtonComponent, IonIconComponent } from 'ion';

@Component({
  selector: 'app-root',
  imports: [IonButtonComponent, IonIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ion-test-app';
}
