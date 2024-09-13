import { Component } from '@angular/core';

import { BodyMockComponent } from '../../card/mock/body-mock.component';
import {
  BadgeType,
  BreadcrumbItem,
  CheckBoxStates,
  ChipSize,
  DropdownItem,
  FontSize,
  InfoBadgeSize,
  InfoBadgeStatus,
  InputCountSize,
  IonButtonProps,
  IonCard,
  IonLinkProps,
  MessageStatusType,
  Size,
  StatusType,
  SwitchSize,
  TooltipPosition,
  Type,
} from '../../core/types';
import { IonInputProps } from '../../core/types/input';
import { SizeType } from '../../core/types/size';
import { buttonEmitterConfig } from '../../indicator/mocks/indicator-button-config';
import { InputMockComponent } from '../../modal/mock/input.mock.component';
import { IonModalService } from '../../modal/modal.service';
import { IonNotificationService } from '../../notification/service/notification.service';
import {
  IonFormattedThemes,
  IonThemeOptions,
  IonThemeService,
} from '../theme.service';

@Component({
  selector: 'ion-teste-theme',
  template: `
    <main>
      <div class="flex">
        <ion-button
          *ngFor="let theme of ionThemeService.themeOptions"
          [label]="theme.label"
          type="secondary"
          (ionOnClick)="setTheme(theme)"
        ></ion-button>
      </div>

      <ion-divider type="text" label="accordion"></ion-divider>

      <ion-accordion
        [accordions]="accordions"
        [modeAccordion]="modeAccordion"
        [templateHeader]="customHeader"
        [templateBody]="customBody"
      >
      </ion-accordion>

      <ng-template #customHeader let-data>{{ data.name }}</ng-template>

      <ng-template #customBody let-data>
        <div class="accordion-content">
          <h3>Origem</h3>
          <p>{{ data.origin }}</p>
          <h3>Características</h3>
          <p>{{ data.characteristics }}</p>
        </div>
      </ng-template>

      <ion-divider type="text" label="alert"></ion-divider>

      <div class="flex-column">
        <ion-alert
          *ngFor="let variant of alertVariantOptions"
          [message]="variant"
          [type]="variant"
        ></ion-alert>

        <ion-alert
          *ngFor="let variant of alertVariantOptions"
          [type]="variant"
          message="alert with description"
          description="This is a description"
        ></ion-alert>
      </div>

      <ion-divider type="text" label="avatar"></ion-divider>

      <div class="flex" *ngFor="let size of avatarSizeOption">
        <ion-avatar
          type="initials"
          [size]="size"
          value="Vinicius Guedes"
        ></ion-avatar>

        <ion-avatar type="icon" [size]="size"></ion-avatar>

        <ion-avatar
          type="photo"
          [size]="size"
          image="https://64.media.tumblr.com/40e2174ab5e68b1eabbc3dfc78607cef/c1effc67d5c3a1fd-20/s540x810/9d6ce72fcddf97841e7410a0652dd9d5f018b35d.pnj"
        ></ion-avatar>
      </div>

      <ion-divider type="text" label="badge"></ion-divider>

      <div>
        <div class="flex" *ngFor="let type of badgeTypes">
          <ion-badge [type]="type" [value]="10"></ion-badge>
          <ion-badge [type]="type" label="teste"></ion-badge>
        </div>
      </div>

      <ion-divider type="text" label="breadcrumb"></ion-divider>

      <ion-breadcrumb [breadcrumbs]="breadcrumbs"></ion-breadcrumb>
      <ion-breadcrumb [breadcrumbs]="bigBreadcrumbs"></ion-breadcrumb>

      <ion-divider type="text" label="button + switch"></ion-divider>

      <div *ngFor="let size of switchSizeOptions">
        <div class="flex">
          <div
            class="flex"
            *ngFor="let attribute of object.keys(buttonAtributes)"
          >
            <span class="switch-label">{{ attribute }}</span>
            <ion-switch
              [size]="size"
              [value]="buttonAtributes[attribute]"
              (atValueChange)="handleSwitchBtn(attribute, $event)"
            ></ion-switch>
          </div>
        </div>
      </div>

      <table>
        <tr *ngFor="let size of buttonSizeOptions">
          <td *ngFor="let variant of buttonVariantOptions">
            <ion-button
              [label]="variant + ' ' + size"
              [type]="variant"
              [size]="size"
              iconType="send"
              [rightSideIcon]="buttonAtributes.rightSideIcon"
              [danger]="buttonAtributes.danger"
              [loading]="buttonAtributes.loading"
              [disabled]="buttonAtributes.disabled"
              [circularButton]="buttonAtributes.circularButton"
            ></ion-button>
          </td>
        </tr>
      </table>

      <ion-divider type="text" label="card"></ion-divider>

      <div class="flex">
        <ion-card [configuration]="cardConfiguration"></ion-card>
      </div>

      <ion-divider type="text" label="checkbox"></ion-divider>

      <table>
        <tr *ngFor="let checkBoxState of checkBoxStates">
          <td>
            <ion-checkbox
              [state]="checkBoxState"
              [label]="checkBoxState"
            ></ion-checkbox>
          </td>
          <td>
            <ion-checkbox
              [state]="checkBoxState"
              [label]="checkBoxState"
              [disabled]="true"
            ></ion-checkbox>
          </td>
        </tr>
      </table>

      <ion-divider type="text" label="chip"></ion-divider>

      <div class="flex-col">
        <div class="flex" *ngFor="let size of chipSizes">
          <ion-chip [label]="'chip ' + size" [size]="size"></ion-chip>
          <ion-chip
            [label]="'chip ' + size"
            [size]="size"
            [selected]="true"
          ></ion-chip>
          <ion-chip
            [label]="'chip ' + size"
            [size]="size"
            [disabled]="true"
          ></ion-chip>
        </div>
      </div>

      <ion-divider type="text" label="dropdown"></ion-divider>

      <div class="flex" style="height: 260px;">
        <ion-dropdown
          description="Hello, dropdown!"
          [enableSearch]="true"
          [options]="dropdownOptions"
        ></ion-dropdown>
      </div>

      <ion-divider type="text" label="icon"></ion-divider>

      <div class="flex">
        <ion-icon
          *ngFor="let color of iconColorsDemo"
          type="box"
          [size]="24"
          [color]="color"
        ></ion-icon>
      </div>

      <ion-divider type="text" label="indicator"></ion-divider>

      <ion-indicator
        [title]="'Preview'"
        value="1500"
        secondValue="5%"
        tooltipText="Texto personalizado via atributo tooltipText"
        [headerIcon]="{ type: 'box' }"
        [buttonConfig]="indicatorButtonConfig"
      ></ion-indicator>

      <ion-divider type="text" label="info badge"></ion-divider>

      <table>
        <tr *ngFor="let variant of infoBadgeVariants">
          <ng-container *ngFor="let size of infoBadgeSizes">
            <td>
              <ion-info-badge
                icon="check"
                [variant]="variant"
                [size]="size"
              ></ion-info-badge>
            </td>

            <td>
              <ion-info-badge
                [text]="variant + ' ' + size"
                [variant]="variant"
                [size]="size"
              ></ion-info-badge>
            </td>
          </ng-container>
        </tr>
      </table>

      <ion-divider type="text" label="input"></ion-divider>

      <div>
        <ion-input
          placeholder="Input demo"
          iconInput="box"
          [disabled]="inputAtributes.disabled"
          [valid]="inputAtributes.valid"
          [invalid]="inputAtributes.invalid"
          [inputButton]="inputAtributes.inputButton"
          [clearButton]="inputAtributes.clearButton"
          [readonly]="inputAtributes.readonly"
          [inputButtonConfig]="inputButtonConfig"
          maxLength="20"
          errorMsg="Tá errado aí, ó!"
        ></ion-input>

        <div class="flex">
          <ng-container *ngFor="let attribute of object.keys(inputAtributes)">
            <ion-switch
              [value]="inputAtributes[attribute]"
              (atValueChange)="handleSwitchInput(attribute, $event)"
            ></ion-switch>
            <span class="switch-label" style="margin-right: 16px;">
              {{ attribute }}
            </span>
          </ng-container>
        </div>
      </div>

      <ion-divider type="text" label="input area"></ion-divider>

      <div>
        <ion-input-area
          placeholder="Input area demo"
          [disabled]="inputAreaAtributes.disabled"
        ></ion-input-area>

        <div class="flex">
          <ng-container
            *ngFor="let attribute of object.keys(inputAreaAtributes)"
          >
            <ion-switch
              [value]="inputAreaAtributes[attribute]"
              (atValueChange)="handleSwitchInputArea(attribute, $event)"
            ></ion-switch>
            <span class="switch-label" style="margin-right: 16px;">
              {{ attribute }}
            </span>
          </ng-container>
        </div>
      </div>

      <ion-divider type="text" label="input counter"></ion-divider>

      <div class="flex-column">
        <div class="flex" *ngFor="let size of inputCountSizeOptions">
          <span>size {{ size }}: </span>
          <ion-input-counter [inputSize]="size"></ion-input-counter>
        </div>
      </div>

      <ion-divider type="text" label="input select"></ion-divider>

      <div>
        <ion-input-select
          placeholder="Input select demo"
          [disabled]="inputSelectAtributes.disabled"
          [valid]="inputSelectAtributes.valid"
        ></ion-input-select>

        <div class="flex">
          <ng-container
            *ngFor="let attribute of object.keys(inputSelectAtributes)"
          >
            <ion-switch
              [value]="inputSelectAtributes[attribute]"
              (atValueChange)="handleSwitchInputSelect(attribute, $event)"
            ></ion-switch>
            <span class="switch-label" style="margin-right: 16px;">
              {{ attribute }}
            </span>
          </ng-container>
        </div>
      </div>

      <ion-divider type="text" label="link"></ion-divider>

      <div>
        <table>
          <tr *ngFor="let size of linkSizes">
            <td>
              <ion-link
                [label]="'Link ' + size"
                [size]="size"
                [bold]="linkAtributes.bold"
                [disabled]="linkAtributes.disabled"
              ></ion-link>
            </td>

            <td>
              <ion-link
                [label]="'Link ' + size"
                [size]="size"
                [bold]="linkAtributes.bold"
                [disabled]="linkAtributes.disabled"
                icon="access"
              ></ion-link>
            </td>

            <td>
              <ion-link
                [label]="'Link ' + size"
                [size]="size"
                [bold]="linkAtributes.bold"
                [disabled]="linkAtributes.disabled"
                icon="access"
                iconSide="left"
              ></ion-link>
            </td>
          </tr>
        </table>

        <div class="flex" *ngFor="let attribute of object.keys(linkAtributes)">
          <span class="switch-label">{{ attribute }}</span>
          <ion-switch
            [value]="linkAtributes[attribute]"
            (atValueChange)="handleSwitchLink(attribute, $event)"
          ></ion-switch>
        </div>
      </div>

      <ion-divider type="text" label="message"></ion-divider>

      <div class="flex-column">
        <ion-message
          *ngFor="let status of messageStatusTypes"
          class="theme-demo-message"
          [type]="status"
          [label]="'status ' + status"
        >
        </ion-message>
      </div>

      <ion-divider type="text" label="modal"></ion-divider>

      <ion-button label="Open Modal" (ionOnClick)="openModal()"></ion-button>

      <ion-divider type="text" label="no data"></ion-divider>

      <ion-no-data></ion-no-data>

      <ion-divider type="text" label="notification"></ion-divider>

      <div class="flex">
        <ion-button
          *ngFor="let type of nofificationTypes"
          [label]="type"
          type="secondary"
          (ionOnClick)="openNotification(type)"
        ></ion-button>
      </div>

      <ion-divider type="text" label="pagination"></ion-divider>

      <div class="flex-column">
        <ion-pagination
          *ngFor="let size of paginationSizes"
          [size]="size"
          [total]="1000"
          [allowChangeQtdItems]="true"
          [itemsPerPage]="10"
          [pageSizeOptions]="[10, 20, 30, 40]"
        ></ion-pagination>
      </div>

      <ion-divider type="text" label="datepicker"></ion-divider>

      <div class="flex">
        <ion-date-picker
          [rangePicker]="true"
          [predefinedRanges]="[
            { label: 'Últimos 7 dias', duration: 'P7D' },
            { label: 'Últimos 15 dias', duration: 'P15D' },
            { label: 'Últimos 30 dias', duration: 'P30D' }
          ]"
        ></ion-date-picker>
      </div>

      <ion-divider type="text" label="popconfirm"></ion-divider>

      <div style="width: fit-content;">
        <ion-button
          label="Open Popconfirm"
          ionPopConfirm
          [ionPopConfirmCloseOnScroll]="true"
          ionPopConfirmDesc="Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs."
          ionConfirmText="Sim"
          ionCancelText="Não"
        >
        </ion-button>
      </div>

      <ion-divider></ion-divider>
    </main>
  `,
  styleUrls: ['./theme-demo.component.scss'],
})
export class ThemeDemoComponent {
  public ionThemes = IonThemeOptions;
  public object = Object;

  public accordions = [
    {
      name: 'Grupo 01: pastores e boiadeiros, exceto os suíços',
      origin:
        'Embora tenham surgido em diferentes países e ocasiões, essas raças têm em comum o fato de serem desenvolvidas a partir de cruzamentos seletivos com o objetivo de atenuar o instinto de predador com o rebanho. Assim, passaram a juntar as ovelhas sem o ímpeto de atacá-las.',
      characteristics:
        'Os pastores e os boiadeiros são inteligentes, ativos e adoram ter tarefas para cumprir. Não à toa, são muito usados pela polícia e pelos bombeiros, como é o caso do cachorro boiadeiro-australiano. Também são carinhosos e se adaptam bem à família. As raças mais conhecidas são: Pastor Alemão, Pastor de Shetland, Border Collie e Welsh Corgi Pembroke.',
    },
    {
      name: 'Grupo 02: Pinscher e Schnauzer, molossoides, cães de montanha e boiadeiros suíços',
      origin:
        'Os cães desse grupo também foram desenvolvidos para ajudar no rebanho. No entanto, enquanto os pastores e os boiadeiros eram usados para reunir os animais, essas raças serviam para proteger o rebanho de outros predadores. Além disso, eram usados para trabalhos pesados, como puxar carroças.',
      characteristics:
        'Aprendizes vorazes, esses cães trabalhadores são fortes, ativos e muito inteligentes. Por isso, embora se adaptem bem ao convívio familiar, alguns deles precisam gastar bastante energia. O instinto é de defesa, como é o caso do cachorro Boxer. Os mais conhecidos são: Doberman, Rottweiler, Boxer, Fila, São Bernardo, Schnauzer e Pinscher.',
    },
  ];

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

  public dropdownOptions: DropdownItem[] = [
    { label: 'Encomendas', selected: false, icon: 'box' },
    { label: 'Bancos', selected: false, icon: 'bank' },
    { label: 'Conquistas', selected: false, icon: 'award' },
    { label: 'Teste', selected: false, icon: 'box', disabled: true },
  ];

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

  public infoBadgeSizes: InfoBadgeSize[] = ['sm', 'md'];
  public infoBadgeVariants: InfoBadgeStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'negative',
  ];

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

  public inputCountSizeOptions: InputCountSize[] = ['sm', 'md'];

  public inputSelectAtributes: Partial<
    Record<keyof IonInputProps, boolean | null>
  > = {
    disabled: false,
    valid: null,
  };

  public linkSizes: FontSize[] = ['sm', 'md'];
  public linkAtributes: Partial<Record<keyof IonLinkProps, boolean>> = {
    disabled: false,
    bold: false,
  };

  public messageStatusTypes: MessageStatusType[] = [
    'positive',
    'negative_alert',
    'negative_erro',
    'warning',
    'info',
    'custom',
  ];

  public nofificationTypes = ['success', 'info', 'warning', 'error'];

  public paginationSizes = ['sm', 'md'];

  constructor(
    readonly ionThemeService: IonThemeService,
    private ionModalService: IonModalService,
    private ionNotificationService: IonNotificationService
  ) {}

  public setTheme(theme: IonFormattedThemes): void {
    this.ionThemeService.theme = theme;
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
}
