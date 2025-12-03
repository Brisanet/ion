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
  IonAlertComponent,
  IonBreadcrumbComponent,
  IonChipComponent
} from 'ion';

@Component({
  selector: 'app-root',
  imports: [IonAvatarComponent, IonBadgeComponent, IonButtonComponent, IonCheckboxComponent, IonIconComponent, IonInfoBadgeComponent, IonAccordionComponent, IonAlertComponent, IonBreadcrumbComponent, IonChipComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ion-test-app';
  
  // Avatar types for template
  AvatarType = AvatarType;
}
