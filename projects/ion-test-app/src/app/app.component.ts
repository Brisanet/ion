import { Component } from '@angular/core';
import { IonBadgeComponent, IonButtonComponent, IonIconComponent } from 'ion';

@Component({
  selector: 'app-root',
  imports: [IonBadgeComponent, IonButtonComponent, IonIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ion-test-app';
}
