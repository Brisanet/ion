import { Component } from '@angular/core';
import { Subject } from 'rxjs';
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
  IonTabComponent,
  TabSize,
  IonHeadingComponent,
  IonLinkComponent,
  IonTripleToggleComponent,
  IonTagComponent,
  IonPopoverDirective,
  PopoverPosition,
  PopoverTrigger,
  IonTableComponent,
  ConfigTable,
  Column,
  IonSwitchComponent,
  IonPopConfirmDirective,
  IonNoDataComponent,
  IonStepsComponent,
  StepType,
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
    IonTabComponent,
    IonHeadingComponent,
    IonTagComponent,
    IonLinkComponent,
    IonTripleToggleComponent,
    IonTableComponent,
    IonSwitchComponent,
    IonPopoverDirective,
    IonPopConfirmDirective,
    IonPopConfirmDirective,
    IonNoDataComponent,
    IonStepsComponent,
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

  // Table Example
  tableConfig: ConfigTable<any> = {
    data: [
      { id: 1, name: 'Meteora', type: 'CD', year: 2003 },
      { id: 2, name: 'One More Light', type: 'CD', year: 2017 },
      { id: 3, name: 'Hybrid Theory', type: 'CD', year: 2000 },
      { id: 4, name: 'Minutes to Midnight', type: 'CD', year: 2007 },
    ],
    columns: [
      { label: 'ID', key: 'id', sort: true },
      { label: 'Name', key: 'name', sort: true },
      { label: 'Type', key: 'type', sort: true },
      { label: 'Year', key: 'year', sort: true },
    ],
    actions: [
      {
        label: 'Edit',
        icon: 'pencil',
        call: (row) => console.log('Edit row:', row),
      },
      {
        label: 'Delete',
        icon: 'trash',
        danger: true,
        call: (row) => console.log('Delete row:', row),
      },
    ],
    pagination: {
      total: 4,
      itemsPerPage: 10,
      page: 1,
    },
    check: true,
  };

  // Switch examples
  switchValue = false;
  switchSmValue = false;
  switchMdValue = true;
  switchLgValue = false;

  handleSwitchChange(value: boolean): void {
    console.log('Switch value changed:', value);
  }

  // Popover enums for template
  PopoverPosition = PopoverPosition;
  PopoverTrigger = PopoverTrigger;

  // Popover examples
  popoverBodyContent =
    'This is the popover content. It can contain any text or HTML.';

  handlePopoverFirstAction(): void {
    window.alert('Popover first action clicked');
  }

  handlePopoverSecondAction(): void {
    window.alert('Popover second action clicked');
  }

  popoverPositions = Object.values(PopoverPosition);

  handlePopoverClose(): void {
    console.log('Popover closed');
  }

  // Popover External Close Control
  popoverCloseSubject = new Subject<void>();

  closePopoverManually(): void {
    this.popoverCloseSubject.next();
  }

  // Steps examples
  stepCurrent = 1;
  steps: StepType[] = [
    { label: 'Step 1' },
    { label: 'Step 2' },
    { label: 'Step 3' },
  ];

  handleStepChange(index: number) {
    console.log('Step changed:', index);
    this.stepCurrent = index;
  }
}
