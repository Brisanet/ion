import { Component } from '@angular/core';
import { 
  AvatarType, 
  CheckBoxStates,
  IonAvatarComponent, 
  IonBadgeComponent, 
  IonButtonComponent, 
  IonCheckboxComponent,
  IonIconComponent,
  IonInfoBadgeComponent,
  IonAccordionComponent,
  IonAlertComponent
} from 'ion';

@Component({
  selector: 'app-root',
  imports: [IonAvatarComponent, IonBadgeComponent, IonButtonComponent, IonCheckboxComponent, IonIconComponent, IonInfoBadgeComponent, IonAccordionComponent, IonAlertComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ion-test-app';
  
  // Avatar types for template
  AvatarType = AvatarType;
}
