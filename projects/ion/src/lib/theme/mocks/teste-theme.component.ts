import { Component } from '@angular/core';
import { IonThemes, IonThemeService } from '../theme.service';

@Component({
  selector: 'ion-teste-theme',
  template: `
    <main>
      <div>
        <button (click)="setTheme(ionThemes.LIGHT)">Tema claro</button>
        <button (click)="setTheme(ionThemes.DARK)">Tema escuro</button>
      </div>

      <ion-alert message="oi"></ion-alert>
    </main>
  `,
  styleUrls: ['./teste-theme.component.scss'],
})
export class TesteThemeComponent {
  public ionThemes = IonThemes;

  constructor(private readonly ionThemeService: IonThemeService) {}

  public setTheme(theme: IonThemes): void {
    this.ionThemeService.setTheme(theme);
  }
}
