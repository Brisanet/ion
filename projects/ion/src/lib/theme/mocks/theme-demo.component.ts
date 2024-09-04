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

      <div *ngFor="let attribute of object.keys(buttonAtributes)">
        <span class="switch-label">{{ attribute }}</span>
        <ion-switch
          [value]="buttonAtributes[attribute]"
          (atValueChange)="handleSwitch(attribute, $event)"
        ></ion-switch>
      </div>

      <ion-alert message="oi"></ion-alert>

      <table>
        <tr *ngFor="let size of sizeOptions">
          <td *ngFor="let variant of variantOptions">
            <ion-button
              [label]="variant + ' ' + size"
              [type]="variant"
              [size]="size"
              iconType="send"
              [rightSideIcon]="buttonAtributes.rightSideIcon"
              [danger]="buttonAtributes.danger"
              [loading]="buttonAtributes.loading"
              [disabled]="buttonAtributes.disabled"
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
  };

  sizeOptions = ['sm', 'md', 'lg', 'xl'];

  variantOptions = ['primary', 'secondary', 'ghost', 'dashed'];

  constructor(private readonly ionThemeService: IonThemeService) {}

  public handleSwitch(key: string, value: boolean): void {
    this.buttonAtributes[key] = value;
  }

  public setTheme(theme: IonThemes): void {
    this.ionThemeService.setTheme(theme);
  }
}
