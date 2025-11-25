import { Component } from '@angular/core';
import { 
  AvatarType, 
  CheckBoxStates,
  IonAvatarComponent, 
  IonBadgeComponent, 
  IonButtonComponent, 
  IonCheckboxComponent,
  IonIconComponent,
  IonInfoBadgeComponent
} from 'ion';

@Component({
  selector: 'app-root',
  imports: [IonAvatarComponent, IonBadgeComponent, IonButtonComponent, IonCheckboxComponent, IonIconComponent, IonInfoBadgeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ion-test-app';
  
  // Avatar types for template
  AvatarType = AvatarType;
}
