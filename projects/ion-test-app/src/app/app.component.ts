import { Component } from '@angular/core';
import { AvatarType, IonAvatarComponent, IonBadgeComponent, IonButtonComponent, IonIconComponent } from 'ion';

@Component({
  selector: 'app-root',
  imports: [IonAvatarComponent, IonBadgeComponent, IonButtonComponent, IonIconComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ion-test-app';
  
  // Avatar types for template
  AvatarType = AvatarType;
}
