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
  IonDividerComponent,
  IonSkeletonComponent,
  IonSpinnerComponent,
  IonAlertComponent,
  IonBreadcrumbComponent,
  IonChipComponent,
  IonChipGroupComponent,
  ChipInGroup,
  IonRadioComponent,
  IonTooltipDirective,
  TooltipPosition,
  TooltipTrigger,
  IonInputComponent,
  IonHeadingComponent,
  IonLinkComponent,
  IonTripleToggleComponent,
  IonSwitchComponent,
  IonTagComponent,
} from 'ion';
import { IonPaginationComponent } from '../../../ion/src/lib/pagination/pagination.component';

@Component({
  selector: 'app-root',
  imports: [
    IonAvatarComponent,
    IonBadgeComponent,
    IonButtonComponent,
    IonCheckboxComponent,
    IonIconComponent,
    IonInfoBadgeComponent,
    IonAccordionComponent,
    IonDividerComponent,
    IonSkeletonComponent,
    IonSpinnerComponent,
    IonAlertComponent,
    IonBreadcrumbComponent,
    IonChipComponent,
    IonChipGroupComponent,
    IonRadioComponent,
    IonPaginationComponent,
    IonTooltipDirective,
    IonInputComponent,
    IonHeadingComponent,
    IonTagComponent,
    IonLinkComponent,
    IonTripleToggleComponent,
    IonSwitchComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ion-test-app';

  // Avatar types for template
  AvatarType = AvatarType;

  // Chip Group Data
  chipGroupBasic: ChipInGroup[] = [
    { label: 'Chip 1', selected: false },
    { label: 'Chip 2', selected: false },
    { label: 'Chip 3', selected: false },
  ];

  chipGroupMultiple: ChipInGroup[] = [
    { label: 'Option A', selected: false, multiple: true },
    { label: 'Option B', selected: false, multiple: true },
    { label: 'Option C', selected: false, multiple: true },
  ];

  chipGroupRequired: ChipInGroup[] = [
    { label: 'Required 1', selected: true },
    { label: 'Required 2', selected: false },
  ];

  radioValue = false;

  // Tooltip enums for template
  TooltipPosition = TooltipPosition;
  TooltipTrigger = TooltipTrigger;

  // Input examples
  basicInputValue = '';
  emailInputValue = '';
  passwordInputValue = '';
  searchInputValue = '';
  inputWithMaxLength = '';

  handleInputButtonClick(): void {
    console.log('Input button clicked!');
  }

  // Triple Toggle examples
  tripleToggleValue: any = undefined;
  tripleToggleWithIconsValue: any = true;

  handleTripleToggleChange(value: any): void {
    console.log('Triple toggle value changed:', value);
  }

  // Switch examples
  switchValue = false;
  switchSmValue = false;
  switchMdValue = true;
  switchLgValue = false;

  handleSwitchChange(value: boolean): void {
    console.log('Switch value changed:', value);
  }
}
