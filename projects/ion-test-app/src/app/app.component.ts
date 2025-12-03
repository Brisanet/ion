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
  IonChipComponent,
  IonChipGroupComponent,
  ChipInGroup
} from 'ion';

@Component({
  selector: 'app-root',
  imports: [IonAvatarComponent, IonBadgeComponent, IonButtonComponent, IonCheckboxComponent, IonIconComponent, IonInfoBadgeComponent, IonAccordionComponent, IonAlertComponent, IonBreadcrumbComponent, IonChipComponent, IonChipGroupComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ion-test-app';
  
  // Avatar types for template
  AvatarType = AvatarType;

  // Chip Group Data
  chipGroupBasic: ChipInGroup[] = [
    { label: 'Chip 1', selected: false },
    { label: 'Chip 2', selected: false },
    { label: 'Chip 3', selected: false }
  ];

  chipGroupMultiple: ChipInGroup[] = [
    { label: 'Option A', selected: false, multiple: true },
    { label: 'Option B', selected: false, multiple: true },
    { label: 'Option C', selected: false, multiple: true }
  ];

  chipGroupRequired: ChipInGroup[] = [
    { label: 'Required 1', selected: true },
    { label: 'Required 2', selected: false }
  ];
}
