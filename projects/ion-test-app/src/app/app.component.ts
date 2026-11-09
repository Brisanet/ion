import {
  Component,
  ViewChild,
  inject,
} from '@angular/core';
import { Subject } from 'rxjs';
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
  IonSwitchComponent,
  IonPopConfirmDirective,
  IonNoDataComponent,
  IonSidebarComponent,
  IonStepsComponent,
  StepType,
  IonInputAreaComponent,
  IonRadioGroupComponent,
  IonTabGroupComponent,
  TabInGroup,
  IonNotificationService,
  IonMessageComponent,
  IonInputCounterComponent,
  IonSimpleMenuComponent,
  IonModalService,
  SidebarItem,
  IonIndicatorComponent,
  IonIndicatorButtonType,
  IonSelectComponent,
  DropdownItem,
  IonPaginationComponent,
  IonCardComponent,
  IonCardHeaderComponent,
  IonCardFooterComponent,
  IonNavbarComponent,
} from 'ion';
import { CardBodyComponent } from './card-body.component';
import { ColorGalleryComponent } from './components/galleries/color-gallery/color-gallery-component';
import { IconGalleryComponent } from './components/galleries/icon-gallery/icon-gallery.component';
import { TypographyGalleryComponent } from './components/galleries/typography-gallery/typography-gallery';
import { BnFormGalleryComponent } from './components/galleries/bn-form-gallery/bn-form-gallery-component';
import { DatePickerGalleryComponent } from './components/galleries/date-picker-gallery/date-picker-gallery-component';
import { SmartTableGalleryComponent } from './components/galleries/tables-galleries/smart-table-gallery/smart-table-gallery-component';
import { TableGalleryComponent } from './components/galleries/tables-galleries/table-gallery/table-gallery-component';

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
    IonSwitchComponent,
    IonPopoverDirective,
    IonPopConfirmDirective,
    IonNoDataComponent,
    IonSidebarComponent,
    IonStepsComponent,
    IonStepsComponent,
    IonInputAreaComponent,
    IonRadioGroupComponent,
    IonTabGroupComponent,
    IonInputCounterComponent,
    IonMessageComponent,
    IonCardComponent,
    IonCardHeaderComponent,
    IonCardFooterComponent,
    CardBodyComponent,
    IconGalleryComponent,
    IonSimpleMenuComponent,
    IonIndicatorComponent,
    IonSelectComponent,
    IonNavbarComponent,
    ColorGalleryComponent,
    TypographyGalleryComponent,
    BnFormGalleryComponent,
    DatePickerGalleryComponent,
    SmartTableGalleryComponent,
    TableGalleryComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
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

  tooltipContext = {
    name: 'Dynamic Content',
    value: 123,
  };

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
    { label: 'Marea', value: 'marea' },
    { label: 'Opala', value: 'opala' },
  ];

  selectOptionsDistributionCenters = [
    { label: 'CD Ceará/Pereiro', key: 'cd-ceara-pereiro' },
    { label: 'CD Piauí/Teresina', key: 'cd-piaui-teresina' },
    { label: 'CDR Fortaleza/Metropolitana', key: 'cdr-fortaleza' },
    { label: 'CDR Juazeiro do Norte', key: 'cdr-juazeiro' },
    { label: 'CD Bahia/Salvador', key: 'cd-bahia-salvador' },
    { label: 'CD Pernambuco/Recife', key: 'cd-pernambuco-recife' },
  ];

  selectOverflowValue = [
    'cd-ceara-pereiro',
    'cd-piaui-teresina',
    'cdr-fortaleza',
    'cdr-juazeiro',
  ];

  handleSelectChange(event: DropdownItem[]): void {
    console.log('Select changed:', event);
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
