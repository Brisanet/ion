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

      <ion-alert message="oi"></ion-alert>

      <table>
        <tr *ngFor="let size of sizeOptions">
          <td *ngFor="let variant of variantOptions">
            <ion-button
              [label]="variant + ' ' + size"
              [type]="variant"
              [size]="size"
              [danger]="danger"
              [loading]="loading"
              [disabled]="true"
            ></ion-button>
          </td>
        </tr>
      </table>
    </main>
  `,
  styleUrls: ['./teste-theme.component.scss'],
})
export class TesteThemeComponent {
  public ionThemes = IonThemes;

  danger = false;
  loading = false;
  disabled = true;

  sizeOptions = ['sm', 'md', 'lg', 'xl'];

  variantOptions = ['primary', 'secondary', 'ghost', 'dashed'];

  constructor(private readonly ionThemeService: IonThemeService) {}

  public setTheme(theme: IonThemes): void {
    this.ionThemeService.setTheme(theme);
  }
}
