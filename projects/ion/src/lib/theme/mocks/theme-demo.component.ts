import { Component } from '@angular/core';

import { IonThemes, IonThemeService } from '../theme.service';

@Component({
  selector: 'ion-teste-theme',
  template: `
    <main>
      <div>
        <ion-button
          label="Tema claro"
          type="secondary"
          (ionOnClick)="setTheme(ionThemes.LIGHT)"
        ></ion-button>
        <ion-button
          label="Tema escuro"
          type="secondary"
          (ionOnClick)="setTheme(ionThemes.DARK)"
        ></ion-button>
      </div>

      <div class="flex-column">
        <ion-alert
          *ngFor="let variant of alertVariantOptions"
          [message]="variant"
          [type]="variant"
        ></ion-alert>

        <ion-alert
          message="alert with description"
          description="This is a description"
        ></ion-alert>
      </div>

      <div class="flex">
        <div *ngFor="let attribute of object.keys(buttonAtributes)">
          <span class="switch-label">{{ attribute }}</span>
          <ion-switch
            [value]="buttonAtributes[attribute]"
            (atValueChange)="handleSwitch(attribute, $event)"
          ></ion-switch>
        </div>
      </div>

      <table>
        <tr *ngFor="let size of sizeOptions">
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
    </main>
  `,
  styleUrls: ['./theme-demo.component.scss'],
})
export class ThemeDemoComponent {
  public ionThemes = IonThemes;
  public object = Object;

  public buttonAtributes = {
    danger: false,
    loading: false,
    disabled: false,
    rightSideIcon: true,
    circularButton: false,
  };

  sizeOptions = ['sm', 'md', 'lg', 'xl'];

  buttonVariantOptions = ['primary', 'secondary', 'ghost', 'dashed'];
  alertVariantOptions = ['success', 'warning', 'negative', 'info'];

  constructor(private readonly ionThemeService: IonThemeService) {}

  public handleSwitch(key: string, value: boolean): void {
    this.buttonAtributes[key] = value;
  }

  public setTheme(theme: IonThemes): void {
    this.ionThemeService.setTheme(theme);
  }
}
