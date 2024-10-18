import { Component, OnInit } from '@angular/core';

import { BodyMockComponent } from '../../card/mock/body-mock.component';
import {
  BadgeType,
  BreadcrumbItem,
  CheckBoxStates,
  ChipSize,
  IonButtonProps,
  IonCard,
  IonLinkProps,
  Size,
  StatusType,
  SwitchSize,
  TooltipPosition,
  Type,
} from '../../core/types';
import { IonInputProps } from '../../core/types/input';
import { IonSelectProps } from '../../core/types/select';
import { SizeType } from '../../core/types/size';
import { buttonEmitterConfig } from '../../indicator/mocks/indicator-button-config';
import { InputMockComponent } from '../../modal/mock/input.mock.component';
import { IonModalService } from '../../modal/modal.service';
import { IonNotificationService } from '../../notification/service/notification.service';
import { SIDEBAR_WITH_FOOTER_PROPS } from '../../sidebar/mocks/sidebarWithFooter.component';
import { ConfigTable } from '../../table/utilsTable';
import { SafeAny } from '../../utils/safe-any';
import {
  IonFormattedThemes,
  IonThemeScheme,
  IonThemeService,
} from '../theme.service';

@Component({
  selector: 'ion-teste-theme',
  templateUrl: './theme-demo.component.html',
  styleUrls: ['./theme-demo.component.scss'],
})
export class ThemeDemoComponent implements OnInit {
  public object = Object;

  public accordions = Array.from({ length: 3 }, (_, i) => ({
    name: `Grupo 0${i + 1}`,
    description: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam sollicitudin, neque ut molestie accumsan, lectus nisi convallis massa, eu tincidunt tortor tortor sit amet sem. Interdum et malesuada fames ac ante ipsum primis in faucibus. Morbi lacinia condimentum nibh nec tempus. Donec aliquam nunc sed faucibus ornare. Morbi pulvinar libero ut mauris tincidunt lobortis tempus et orci. Morbi volutpat consequat justo, in imperdiet arcu. Vivamus tincidunt id nunc sit amet iaculis. Phasellus at eros neque. Aliquam egestas facilisis magna ac sagittis. Phasellus id scelerisque elit, sed convallis nisl. Aenean ut tristique ipsum. Mauris dignissim congue massa sit amet pulvinar. Suspendisse congue dignissim feugiat. Fusce sollicitudin, velit a tristique maximus, arcu mauris scelerisque lorem, ut pellentesque mi felis quis nisi. Nam in pharetra turpis. Ut gravida purus sit amet sagittis hendrerit.`,
  }));

  public alertVariantOptions: StatusType[] = [
    'success',
    'warning',
    'negative',
    'info',
  ];

  public avatarSizeOption: SizeType[] = ['xs', 'sm', 'md', 'lg'];

  public badgeTypes: BadgeType[] = [
    'primary',
    'secondary',
    'neutral',
    'negative',
  ];

  public breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', link: '/home' },
    { label: 'Recursos', link: '/recursos' },
    { label: 'Técnico', link: '/recursos/1' },
  ];
  public bigBreadcrumbs: BreadcrumbItem[] = Array.from(
    { length: 10 },
    (_, i) => ({ label: `Breadcrumb ${i}`, link: `/breadcrumb/${i}` })
  );

  public buttonSizeOptions: Size[] = ['sm', 'md', 'lg', 'xl'];
  public buttonVariantOptions: Type[] = [
    'primary',
    'secondary',
    'ghost',
    'dashed',
  ];
  public buttonAtributes: Partial<Record<keyof IonButtonProps, boolean>> = {
    danger: false,
    loading: false,
    disabled: false,
    rightSideIcon: true,
    circularButton: false,
  };

  public cardConfiguration: IonCard = {
    header: {
      title: 'Card Title',
      chips: [{ label: 'Chip 1' }, { label: 'Chip 2' }, { label: 'Chip 3' }],
      icon: 'box',
      infoTooltip: {
        ionTooltipTitle: 'This is a tooltip',
        ionTooltipPosition: TooltipPosition.BOTTOM_CENTER,
      },
    },
    body: BodyMockComponent,
    footer: {
      buttons: {
        primary: { label: 'Confirm' },
        secondary: { label: 'Cancel' },
      },
    },
  };

  public checkBoxStates: CheckBoxStates[] = [
    'enabled',
    'checked',
    'indeterminate',
  ];

  public chipSizes: ChipSize[] = ['sm', 'md'];

  public switchSizeOptions: SwitchSize[] = ['sm', 'md', 'lg'];

  public iconColorsDemo: string[] = [
    'var(--ion-primary-5)',
    'var(--ion-neutral-8)',
    'var(--ion-positive-5)',
    'var(--ion-warning-5)',
    'var(--ion-negative-5)',
    'var(--ion-info-5)',
  ];

  public indicatorButtonConfig = buttonEmitterConfig;

  public inputAtributes: Partial<Record<keyof IonInputProps, boolean>> = {
    disabled: false,
    valid: false,
    invalid: false,
    inputButton: false,
    clearButton: false,
    readonly: false,
  };
  public inputButtonConfig: IonButtonProps = {
    label: 'Button',
    size: 'md',
    type: 'secondary',
  };

  public inputAreaAtributes: Partial<Record<keyof IonInputProps, boolean>> = {
    disabled: false,
  };

  public inputSelectAtributes: Partial<
    Record<keyof IonInputProps, boolean | null>
  > = {
    disabled: false,
    valid: null,
  };

  public linkAtributes: Partial<Record<keyof IonLinkProps, boolean>> = {
    disabled: false,
    bold: false,
  };

  public selectAtributes: Partial<Record<keyof IonSelectProps, boolean>> = {
    required: false,
    loading: false,
    disabled: false,
  };

  public sidebarProps = SIDEBAR_WITH_FOOTER_PROPS;

  public tableConfig: ConfigTable<SafeAny> = {
    columns: [
      { label: 'ID', key: 'id', sort: true },
      { label: 'Name', key: 'name', sort: true },
      { label: 'Year', key: 'year', sort: true },
    ],
    data: Array.from({ length: 10 }, (_, i) => ({
      id: i + 1,
      name: `Client ${i + 1}`,
      year: Math.floor(Math.random() * 10) + 2010,
    })),
    actions: [
      { label: 'Editar', icon: 'pencil' },
      {
        label: 'Excluir',
        icon: 'trash',
        call: (row: SafeAny): void => {
          row.name += ' DELETED';
        },
        confirm: { title: 'Você realmente deseja deletar?' },
      },
    ],
  };

  constructor(
    readonly ionThemeService: IonThemeService,
    private ionModalService: IonModalService,
    private ionNotificationService: IonNotificationService
  ) {}

  public ngOnInit(): void {
    this.updateSidebarLogo();
  }

  public setTheme(theme: IonFormattedThemes): void {
    this.ionThemeService.theme = theme;
    this.updateSidebarLogo();
  }

  public handleSwitchBtn = this.createSwitchHandler(this.buttonAtributes);
  public handleSwitchInput = this.createSwitchHandler(this.inputAtributes);
  public handleSwitchInputArea = this.createSwitchHandler(
    this.inputAreaAtributes
  );
  public handleSwitchInputSelect = this.createSwitchHandler(
    this.inputSelectAtributes
  );
  public handleSwitchLink = this.createSwitchHandler(this.linkAtributes);
  public handleSwitchSelect = this.createSwitchHandler(this.selectAtributes);

  public openModal(): void {
    this.ionModalService.open(InputMockComponent, {
      title: 'Modal Title',
      alertConfig: {
        type: 'info',
        message: 'This is the title',
        description: 'Add here a description supimpa to your modal',
      },
    });
  }

  public openNotification(type: string): void {
    this.ionNotificationService[type](
      type,
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit...'
    );
  }

  private createSwitchHandler(config: Record<string, unknown>) {
    return (key: string, value: boolean): void => {
      config[key] = value;
    };
  }

  private updateSidebarLogo(): void {
    this.sidebarProps.logo =
      this.ionThemeService.theme.scheme === IonThemeScheme.DARK
        ? require('../../../../../../stories/assets/sidebar-logo-dark.svg')
        : require('../../../../../../stories/assets/sidebar-logo.svg');
  }
}
