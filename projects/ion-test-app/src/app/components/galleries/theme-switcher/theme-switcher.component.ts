import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  IonButtonComponent,
  IonCardComponent,
  IonCardHeaderComponent,
  IonChipComponent,
  IonFormattedThemes,
  IonThemeService,
} from 'ion';

@Component({
  selector: 'app-theme-switcher',
  imports: [
    IonButtonComponent,
    IonCardComponent,
    IonCardHeaderComponent,
    IonChipComponent,
  ],
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherComponent implements OnInit {
  private ionThemeService = inject(IonThemeService);

  themeOptions: IonFormattedThemes[] = [];
  selectedTheme = signal<IonFormattedThemes | null>(null);

  ngOnInit(): void {
    if (!this.ionThemeService.themeOptions?.length) {
      this.ionThemeService.init();
    }

    this.themeOptions = this.ionThemeService.themeOptions;
    this.selectedTheme.set(this.ionThemeService.theme);
  }

  onThemeSelected(selection: IonFormattedThemes[]): void {
    const selectedTheme = selection[0];

    if (!selectedTheme || selectedTheme.key === this.selectedTheme()?.key) {
      this.restoreDefaultTheme();
      return;
    }

    this.applyTheme(selectedTheme);
  }

  private restoreDefaultTheme(): void {
    const defaultTheme = this.themeOptions[0];
    if (!defaultTheme) {
      throw new Error('Nenhum tema disponível para restaurar o padrão.');
    }

    this.applyTheme(defaultTheme);
  }

  private applyTheme(theme: IonFormattedThemes): void {
    this.ionThemeService.theme = theme;
    this.selectedTheme.set(theme);
  }
}
