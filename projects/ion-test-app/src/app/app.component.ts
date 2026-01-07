import { Component, ViewChild, OnInit, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import {
  AvatarType,
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
  SidebarItem,
  IonIndicatorComponent,
  IonIndicatorButtonType,
  IonSelectComponent,
  DropdownItem,
  BnFilterComponent,
  BnFormField,
  BnSelectFormField,
  IonPaginationComponent,
  BnFormComponent,
  BnFormService,
  BnAboutComponent,
  BnWizardComponent,
  BnWizardConfig,
  IonCardComponent,
  IonCardHeaderComponent,
  IonCardFooterComponent,
  IonNavbarComponent,
  IonDrawerComponent,
  IonDrawerDirection
} from 'ion';
import { Validators } from '@angular/forms';
import { CardBodyComponent } from './card-body.component';

type FromYourRepository = {
  id?: number;
  title_like?: string;
};

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
    IonCardComponent,
    IonCardHeaderComponent,
    IonCardFooterComponent,
    CardBodyComponent,
    IonSimpleMenuComponent,
    IonIndicatorComponent,
    IonSelectComponent,
    BnFormComponent,
    BnFilterComponent,
    BnAboutComponent,
    BnWizardComponent,
    IonNavbarComponent,
    IonDrawerComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private notificationService = inject(IonNotificationService);
  private modalService: IonModalService = inject(IonModalService);
  private bnFormService = inject(BnFormService);
  private http = inject(HttpClient);
  title = 'ion-test-app';

  filterFields = signal<BnFormField[]>([
    {
      key: 'name',
      label: 'Nome',
      placeholder: 'Filtrar por nome...',
      className: 'col-6',
      required: true,
    },
    {
      key: 'gender',
      label: 'Gênero',
      type: 'triple-toggle',
      options: [
        { value: 'male', label: 'Masculino', icon: 'male' },
        { value: 'female', label: 'Feminino', icon: 'female' },
      ],
      className: 'col-6'
    },
    {
      key: 'datepickerRange',
      label: 'Date Range Picker',
      type: 'datepicker',
      rangePicker: true,
      className: 'col-md-6',
    },
    {
      key: 'teste',
      type: 'switch',
      label: 'Teste',
      className: 'col-md-3',
      size: 'lg',
    },
    {
      key: 'teste1',
      type: 'switch',
      label: 'Teste1',
      className: 'col-md-3',
      size: 'lg',
    },
    {
      type: 'select',
      key: 'city',
      className: 'col-md-8',
      label: 'Cidade',
      placeholder: 'Selecione uma cidade',
      initialValue: 'São Paulo',
      propValue: 'label',
      options: [
        { label: 'São Paulo' },
        { label: 'Rio de Janeiro' },
        { label: 'Belo Horizonte' },
      ],
    }
  ]);

  handleFilterApplied(filters: any): void {
    console.log('Filters applied:', filters);
  }

  openWizard(): void {
    const bnWizardConfig: BnWizardConfig = {
      title: 'Cadastro de Exames',
      titleIcon: 'box',
      // horizontal: true,
      onSubmit: (data) => {
        return this.http.post('https://jsonplaceholder.typicode.com/posts', data);
      },
      steps: [
        {
          title: 'Descrição',
          fields: [
            {
              key: 'nome',
              className: 'col-12',
              type: 'text',
              label: 'Nome',
              placeholder: 'Digite seu nome',
              initialValue: 'Iury',
              iconInput: 'image-user',
              iconDirection: 'left',
              validators: [Validators.required, Validators.minLength(3)],
            },
            {
              key: 'sobrenome',
              className: 'col-12',
              type: 'text',
              label: 'Sobrenome',
              placeholder: 'Digite seu sobrenome',
              onlyShowWhen: (form) =>
                form.get('nome')?.value && form.get('nome')?.valid,
              validators: [Validators.minLength(3)],
            },
          ],
        },
        {
          title: 'Configurações',
          alert: {
            message: 'Apenas campos obrigatórios',
            type: 'warning',
          },
          fields: [
            {
              key: 'ativo',
              type: 'switch',
              label: 'Ativo',
              className: 'col-6',
            },
            {
              key: 'prioridade',
              type: 'triple-toggle',
              label: 'Prioridade',
              className: 'col-6',
              options: [
                { value: 'baixa', label: 'Baixa' },
                { value: 'alta', label: 'Alta' },
              ],
            },
          ],
        },
      ],
    };

    this.modalService
      .open(BnWizardComponent, {
        title: bnWizardConfig.title,
        titleIcon: bnWizardConfig.titleIcon,
        width: 800,
        footer: {
          hide: true,
        },
        ionParams: {
          config: bnWizardConfig,
        },
      })
      .subscribe({
        next: (result) => {
          console.log('Wizard finished with result:', result);
        },
        error: (error) => {
          console.error('Wizard finished with error:', error);
        },
      });
  }

  // BnAbout config
  headerButton = {
    action: () => console.log('Header button clicked'),
    label: 'Imprimir solicitação'
  };

  pageTitle = {
    title: 'Detalhes da solicitação',
    icon: 'receipt'
  };

  aboutFields: BnFormField[] = [
    {
      key: 'solicitacao_id',
      label: 'Nº da solicitação',
      placeholder: 'Nº da solicitação',
      className: 'col-3',
      initialValue: '1234567-ABCDEF',
    },
    {
      key: 'centro_id',
      label: 'Centro de origem',
      placeholder: 'Centro de origem',
      className: 'col-3',
      initialValue: 'AAAABBBBCCC',
    },
    {
      key: 'projeto_id',
      label: 'Projeto',
      placeholder: 'Projeto',
      className: 'col-3',
      initialValue: 'Projeto ABC',
    },
    {
      key: 'setor_id',
      label: 'Setor',
      placeholder: 'Setor',
      className: 'col-3',
      initialValue: 'Logistica',
    },
    // {
    //   key: 'obs',
    //   type: 'textarea',
    //   label: 'Observação',
    //   placeholder: 'Observação',
    //   className: 'col-12',
    //   initialValue: 'Material material material  material material  material material  material material  material material  material material  material material ',
    // },
    {
      key: 'status_id',
      label: 'Status',
      placeholder: 'Status',
      className: 'col-3',
      initialValue: 'Em andamento',
    },
  ];

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

  handleInputButtonClick(value?: string): void {
    console.log('Input button clicked!', value);
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
        call: (row: any) => console.log('Edit row:', row),
      },
      {
        label: 'Delete',
        icon: 'trash',
        danger: true,
        call: (row: any) => console.log('Delete row:', row),
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
  sidebarItems: (SidebarItem & { options?: SidebarItem[] })[] = [
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
      data: this.smartTableConfig.data.filter(
        (item: any) => item.id !== row.id,
      ),
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
    (this.notificationService as any)[type](
      'Notification Title',
      'This is a notification message',
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

  // Drawer Examples
  isDrawerOpen = signal(false);
  drawerDirection = signal<IonDrawerDirection>('right');
  drawerSize = signal<number>(30);

  openDrawer(direction: IonDrawerDirection = 'right', size: number = 30): void {
    this.drawerDirection.set(direction);
    this.drawerSize.set(size);
    this.isDrawerOpen.set(true);
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
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
      modalConfig,
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

  // Indicator Examples
  indicatorWithRedirect = {
    label: 'Acessar site',
    type: IonIndicatorButtonType.Redirect,
    redirectLink: 'https://ion.brisanet.com.br/',
  };

  indicatorWithEmitter = {
    label: 'Emitir evento',
    type: IonIndicatorButtonType.Emitter,
  };

  handleIndicatorClick(): void {
    window.alert('Evento emitido pelo Indicator!');
  }

  // Select Examples
  selectOptions = [
    { label: 'Apple', key: 'apple', fruit_id: 1 },
    { label: 'Banana', key: 'banana', fruit_id: 2 },
    { label: 'Grape', key: 'grape', fruit_id: 3, disabled: true },
    { label: 'Orange', key: 'orange', fruit_id: 4 },
    { label: 'Strawberry', key: 'strawberry', fruit_id: 5 },
  ];

  selectOptionsCar = [
    { label: 'Marea', key: 'marea' },
    { label: 'Opala', key: 'opala' },
  ];

  handleSelectChange(event: DropdownItem[]): void {
    console.log('Select changed:', event);
  }

  formFields: BnFormField[] = [
    {
      key: 'nome',
      className: 'col-6',
      type: 'text',
      label: 'Nome',
      placeholder: 'Digite seu nome',
      initialValue: 'Iury',
      iconInput: 'image-user',
      iconDirection: 'left',
      validators: [
        Validators.minLength(3),
      ],
    },
    {
      key: 'sobrenome',
      className: 'col-6',
      type: 'text',
      label: 'Sobrenome',
      placeholder: 'Digite seu sobrenome',
      onlyShowWhen: () => {
        return this.formGroup.get('nome')?.value && this.formGroup.get('nome')?.valid;
      },
      validators: [
        Validators.minLength(3),
      ],
    },
    {
      key: 'email',
      className: 'col-6',
      type: 'email',
      label: 'Email',
      placeholder: 'Digite seu email',
      required: true,
      description: 'Seu email corporativo',
      validators: [
        Validators.pattern('^[a-zA-Z0-9._%+-]+@grupobrisanet.com.br$'),
      ],
    },
    {
      type: 'select',
      key: 'select',
      className: 'col-6',
      label: 'Selecione',
      placeholder: 'Selecione',
      options: this.selectOptions,
      initialValue: [1],
      propValue: 'fruit_id',
      multiple: true,
    },
    {
      type: 'select',
      key: 'car',
      className: 'col-6',
      label: 'Selecione o Carro',
      placeholder: 'Selecione',
      options: this.selectOptionsCar,
      initialValue: ['marea'],
    },
    {
      type: 'select',
      key: 'city',
      className: 'col-6',
      label: 'Selecione uma cidade',
      placeholder: 'Selecione',
      options: [],
      multiple: false,
      propValue: 'id',
      propLabel: 'title',
      enableSearch: true,
      refresh: {
        use: (field: BnSelectFormField, search?: string) =>
          this.refreshCities(field, search),
      },
    },
    {
      type: 'select',
      key: 'state',
      className: 'col-6',
      label: 'Selecione um estado',
      placeholder: 'Selecione',
      options: [],
      multiple: false,
      propValue: 'id',
      propLabel: 'title',
      enableSearch: true,
      onlyShowWhen: () => {
        return this.formGroup.get('city')?.value === 2
      },
      refresh: {
        use: (field: BnSelectFormField, search?: string) =>
          this.refreshStates(field, search),
        debounceTime: 1500,
      },
    },
    // {
    //   key: 'basicInput',
    //   className: 'col-4',
    //   label: 'Basic Input',
    //   placeholder: 'Enter text here...',
    // },
    // {
    //   key: 'searchLeft',
    //   className: 'col-4',
    //   label: 'Input with Left Icon',
    //   placeholder: 'Search...',
    //   iconInput: 'search',
    //   iconDirection: 'left',
    // },
    // {
    //   key: 'searchRight',
    //   className: 'col-4',
    //   label: 'Input with Right Icon',
    //   placeholder: 'Search...',
    //   iconInput: 'search',
    //   iconDirection: 'right',
    // },
    // {
    //   key: 'password',
    //   label: 'Password Input',
    //   placeholder: 'Enter password',
    //   type: 'password',
    // },
    // {
    //   key: 'clearable',
    //   label: 'Input with Clear Button',
    //   placeholder: 'Type to see clear button',
    //   clearButton: true,
    // },
    // {
    //   key: 'maxLength',
    //   label: 'Input with Max Length (10 chars)',
    //   placeholder: 'Max 10 characters',
    //   maxLength: 10,
    // },
    // {
    //   key: 'valid',
    //   label: 'Valid Input',
    //   placeholder: 'Valid input',
    //   initialValue: 'valid@email.com',
    // },
    // {
    //   key: 'invalid',
    //   label: 'Invalid Input with Error',
    //   placeholder: 'Invalid input',
    //   initialValue: 'invalid',
    //   validators: [Validators.required, Validators.email],
    //   errorMsg: 'Please enter a valid email',
    // },
    // {
    //   key: 'disabled',
    //   label: 'Disabled Input',
    //   placeholder: 'Disabled input',
    //   initialValue: 'Cannot edit this',
    //   disabled: true,
    // },
    // {
    //   key: 'readonly',
    //   label: 'Readonly Input',
    //   placeholder: 'Readonly input',
    //   initialValue: 'Read only value',
    //   readonly: true,
    // },
    // {
    //   key: 'withButton',
    //   label: 'Input with Button',
    //   placeholder: 'Search with button',
    //   inputButton: true,
    //   inputButtonConfig: {
    //     label: 'Search',
    //     type: 'primary',
    //     iconType: 'search',
    //   },
    //   onClickButton: (value) => this.handleInputButtonClick(value),
    // },
    // {
    //   key: 'number',
    //   label: 'Number Input',
    //   placeholder: 'Enter number',
    //   type: 'number',
    //   className: 'col-4',
    // },
    // {
    //   key: 'tripleToggle',
    //   label: 'Triple Toggle',
    //   type: 'triple-toggle',
    //   className: 'col-4',
    //   options: [
    //     { value: 'yes', label: 'Yes', icon: 'check' },
    //     { value: 'no', label: 'No', icon: 'close' },
    //   ],
    //   initialValue: 'yes',
    // },
    // {
    //   key: 'switchBasic',
    //   label: 'Basic Switch',
    //   type: 'switch',
    //   className: 'col-md-4',
    //   initialValue: true,
    // },
    // {
    //   key: 'datepickerBasic',
    //   label: 'Basic Date Picker',
    //   type: 'datepicker',
    //   className: 'col-md-4',
    // },
    // {
    //   key: 'datepickerRange',
    //   label: 'Date Range Picker',
    //   type: 'datepicker',
    //   rangePicker: true,
    //   className: 'col-md-4',
    // },
    // {
    //   key: 'datepickerPredefined',
    //   label: 'Date Range with Predefined',
    //   type: 'datepicker',
    //   rangePicker: true,
    //   predefinedRanges: [
    //     { label: 'Últimos 7 dias', duration: 'P7D', isFuture: false },
    //     { label: 'Últimos 30 dias', duration: 'P30D', isFuture: false },
    //   ],
    //   className: 'col-md-4',
    // },
    // {
    //   key: 'name',
    //   label: 'Name',
    //   placeholder: 'Enter name',
    // }
  ];

  formGroup = this.bnFormService.createFormGroup(this.formFields);

  submitForm(): void {
    console.log('Form submitted:', this.formGroup.value);
  }

  refreshCities(_field: BnSelectFormField, search?: string): Observable<any> {
    const params: FromYourRepository = {};

    if (search) {
      params.title_like = search;
    }

    console.log(search);

    return this.http.get('https://jsonplaceholder.typicode.com/posts', {
      params,
    });
  }

  refreshStates(_field: BnSelectFormField, search?: string): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  handleLeftActionOutput(event: any): void {
    console.log('Left action output:', event);
  }

  handleRightActionOutput(event: any): void {
    console.log('Right action output:', event);
  }

  handleValueChangeNavbar(event: any): void {
    console.log('Value change:', event);
  }
}
