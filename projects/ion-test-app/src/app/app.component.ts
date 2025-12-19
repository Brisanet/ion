import { Component, ViewChild, OnInit, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  IonSidebarComponent,
  IonStepsComponent,
  StepType,
  IonInputAreaComponent,
  IonSmartTableComponent,
  ConfigSmartTable,
  SmartTableEvent,
  IonRadioGroupComponent,
  IonTabGroupComponent,
  TabInGroup,
  IonNotificationService,
  IonMessageComponent,
  IonInputCounterComponent,
  IonDatepickerComponent,
  CalendarDirection,
  PreDefinedRangeConfig,
  IonSimpleMenuComponent,
  IonModalService,
} from 'ion';
import { IonPaginationComponent } from '../../../ion/src/lib/pagination/pagination.component';
import { Item } from 'ion/lib/core/types/sidebar';

@Component({
  standalone: true,
  template: `
    <div style="padding: 16px;">
      <p>This is a component rendered inside the modal!</p>
      @if (data) {
      <p>
        Data received: <strong>{{ data }}</strong>
      </p>
      }
      <p>You can pass data to it and receive values back.</p>
    </div>
  `,
})
class ModalExampleComponent {
  data?: string;
}

@Component({
  standalone: true,
  template: `
    <div style="padding: 16px;">
      @for (item of items; track $index) {
      <p>Linha de conteúdo número {{ $index + 1 }} para testar o scroll.</p>
      }
    </div>
  `,
})
class ModalLongContentComponent {
  items = new Array(50).fill(0);
}

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
    IonSidebarComponent,
    IonStepsComponent,
    IonStepsComponent,
    IonInputAreaComponent,
    IonSmartTableComponent,
    IonRadioGroupComponent,
    IonTabGroupComponent,
    IonInputCounterComponent,
    IonMessageComponent,
    IonDatepickerComponent,
    IonSimpleMenuComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private notificationService = inject(IonNotificationService);
  private modalService: IonModalService = inject(IonModalService);
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

  // Sidebar Logic
  sidebarShrinkMode = false;
  sidebarCloseOnSelect = false;
  sidebarItems: (Item & { options?: Item[] })[] = [
    {
      title: 'Dashboard',
      icon: 'home',
      selected: true,
      action: () => console.log('Dashboard clicked'),
    },
    {
      title: 'Users',
      icon: 'user',
      options: [
        {
          title: 'Direct Sales',
          icon: 'pencil',
          action: () => console.log('Direct Sales clicked'),
        },
        ...new Array(10).fill(0).map((_, i) => ({
          title: `Vendor ${i + 1}`,
          icon: 'user',
          action: () => console.log(`Vendor ${i + 1} clicked`),
        })),
      ],
    },
    ...new Array(10).fill(0).map((_, i) => ({
      title: `General Item ${i + 1}`,
      icon: 'pencil',
      action: () => console.log(`General Item ${i + 1} clicked`),
    })),
    {
      title: 'Complex Settings',
      icon: 'config',
      options: new Array(15).fill(0).map((_, i) => ({
        title: `Config Option ${i + 1}`,
        icon: 'config',
        action: () => console.log(`Config Option ${i + 1} clicked`),
      })),
    },
    {
      title: 'Logout',
      icon: 'out',
      action: () => console.log('Logout clicked'),
    },
  ];

  @ViewChild(IonSidebarComponent) sidebar!: IonSidebarComponent;

  handleSidebarToggle(isOpen: boolean): void {
    console.log('Sidebar toggled. Is Open:', isOpen);
  }

  toggleSidebar(): void {
    this.sidebar.toggleVisibility();
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

  // Input Area examples
  inputAreaValue = '';
  disabledInputAreaValue = 'This is disabled';

  // Smart Table HTTP Example
  private http = inject(HttpClient);

  smartTableConfig: ConfigSmartTable<any> = {
    data: [],
    columns: [
      { key: 'id', label: 'ID', sort: true },
      { key: 'firstName', label: 'Name', sort: true },
      { key: 'email', label: 'Email', sort: true },
      { key: 'username', label: 'Username', sort: true },
    ],
    pagination: {
      total: 0,
      itemsPerPage: 30,
      page: 1,
    },
    loading: false,
    actions: [
      {
        label: 'Delete',
        icon: 'trash',
        danger: true,
        call: (row: any) => this.handleDelete(row),
      },
    ],
  };

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.smartTableConfig.loading = true;
    this.http.get('https://dummyjson.com/users').subscribe((response: any) => {
      this.smartTableConfig = {
        ...this.smartTableConfig,
        data: response.users,
        pagination: {
          ...this.smartTableConfig.pagination,
          total: response.total,
        },
        loading: false,
      };
    });
  }

  handleDelete(row: any): void {
    this.smartTableConfig = {
      ...this.smartTableConfig,
      data: this.smartTableConfig.data.filter((item) => item.id !== row.id),
      pagination: {
        ...this.smartTableConfig.pagination,
        total: this.smartTableConfig.pagination.total - 1,
      },
    };
  }

  smartTableEvents(event: SmartTableEvent): void {
    console.log('Smart Table Event:', event);
  }

  // Radio Group Examples
  radioGroupValue = 'option1';
  radioGroupOptions = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Disabled Option', value: 'option3', disabled: true },
  ];

  // Tab Group Examples
  tabGroupHorizontal: TabInGroup[] = [
    { label: 'Home', selected: true, iconType: 'home' },
    { label: 'Profile', selected: false, iconType: 'user' },
    { label: 'Settings', selected: false, iconType: 'config' },
  ];

  tabGroupVertical: TabInGroup[] = [
    { label: 'Dashboard', selected: true },
    { label: 'Analytics', selected: false },
    { label: 'Reports', selected: false },
    { label: 'Users', selected: false },
  ];

  tabGroupWithBadge: TabInGroup[] = [
    { label: 'Inbox', selected: true, badge: { value: 5 } },
    { label: 'Sent', selected: false, badge: { value: 12 } },
    { label: 'Drafts', selected: false },
  ];

  tabGroupWithDisabled: TabInGroup[] = [
    { label: 'Active', selected: true },
    { label: 'Pending', selected: false },
    { label: 'Disabled', selected: false, disabled: true },
  ];

  selectedTabLabel = 'Home';

  handleTabSelected(tab: TabInGroup): void {
    console.log('Tab selected:', tab);
    this.selectedTabLabel = tab.label;
  }

  // Input Counter Examples
  counterValue = 0;
  counterWithLimits = 5;
  counterSmall = 10;

  handleCounterChange(event: { newValue: number }): void {
    console.log('Counter value changed:', event.newValue);
  }

  showNotification(type: 'success' | 'info' | 'warning' | 'error') {
    this.notificationService[type](
      'Notification Title',
      'This is a notification message'
    );
  }

  // Date Picker Examples
  CalendarDirection = CalendarDirection;
  datePickerValue: string[] = [];
  dateRangePickerValue: string[] = [];
  datePickerWithPredefinedValue: string[] = [];

  predefinedRanges: PreDefinedRangeConfig[] = [
    { label: 'Últimos 7 dias', duration: 'P7D', isFuture: false },
    { label: 'Últimos 30 dias', duration: 'P30D', isFuture: false },
    { label: 'Últimos 90 dias', duration: 'P90D', isFuture: false },
    { label: 'Próximos 7 dias', duration: 'P7D', isFuture: true },
    { label: 'Próximos 30 dias', duration: 'P30D', isFuture: true },
  ];

  handleDatePickerChange(dates: string[]): void {
    console.log('Date selected:', dates);
    this.datePickerValue = dates;
  }

  handleDateRangePickerChange(dates: string[]): void {
    console.log('Date range selected:', dates);
    this.dateRangePickerValue = dates;
  }

  handleDatePickerWithPredefinedChange(dates: string[]): void {
    console.log('Date range with predefined selected:', dates);
    this.datePickerWithPredefinedValue = dates;
  }

  disabledDateExample = (currentDate: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return currentDate < today;
  };

  simpleMenuProfile = {
    imageUrl: 'https://i.pravatar.cc/150?img=12',
    name: 'João Silva',
  };

  simpleMenuOptions: TabInGroup[] = [
    { label: 'Dashboard', selected: true, iconType: 'home' },
    { label: 'Projetos', selected: false, iconType: 'folder' },
    { label: 'Equipe', selected: false, iconType: 'user' },
    { label: 'Configurações', selected: false, iconType: 'config' },
    { label: 'Relatórios', selected: false, iconType: 'document' },
  ];

  simpleMenuLogo = {
    src: 'https://via.placeholder.com/120x40/4CAF50/FFFFFF?text=LOGO',
    alt: 'Company Logo',
  };

  handleSimpleMenuSelect(option: TabInGroup): void {
    console.log('Menu option selected:', option);
    this.simpleMenuOptions = this.simpleMenuOptions.map((opt) => ({
      ...opt,
      selected: opt.label === option.label,
    }));
  }

  handleSimpleMenuLogout(): void {
    console.log('Logout clicked');
    window.alert('Logout functionality would be triggered here');
  }

  openModal(): void {
    this.modalService
      .open(ModalExampleComponent, {
        title: 'Exemplo de Modal',
        footer: {
          primaryButton: {
            label: 'Confirmar',
          },
          secondaryButton: {
            label: 'Cancelar',
          },
        },
      })
      .subscribe((result: unknown) => {
        console.log('Modal fechado com resultado:', result);
      });
  }

  openModalWithData(): void {
    this.modalService
      .open(ModalExampleComponent, {
        title: 'Modal com Dados',
        ionParams: {
          data: 'Informação vinda do componente pai!',
        },
      })
      .subscribe((result: unknown) => {
        console.log('Modal com dados fechado:', result);
      });
  }

  openModalCustomWidth(): void {
    this.modalService.open(ModalExampleComponent, {
      title: 'Modal Largo',
      width: 800,
    });
  }

  openModalPersistent(): void {
    const modalConfig = {
      title: 'Modal Persistente',
      preventCloseOnConfirm: true,
      footer: {
        primaryButton: {
          label: 'Confirmar (Não fecha)',
        },
      },
    };

    const modalObservable = this.modalService.open(
      ModalExampleComponent,
      modalConfig
    );

    modalObservable.subscribe((result: unknown) => {
      console.log('Confirmar clicado, mas o modal continua aberto:', result);
      // Você pode fechar o modal manualmente depois se quiser
      // this.modalService.closeModal();
    });
  }

  openModalLongContent(): void {
    this.modalService.open(ModalLongContentComponent, {
      title: 'Modal com Longo Conteúdo',
    });
  }
}
