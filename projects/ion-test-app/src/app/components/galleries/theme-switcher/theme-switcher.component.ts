import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
  signal,
} from '@angular/core';
import {
  DropdownItem,
  IonFormattedThemes,
  IonSelectComponent,
  IonThemeService,
} from 'ion';

@Component({
  selector: 'app-theme-switcher',
  imports: [IonSelectComponent],
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

  onThemeSelected(selection: DropdownItem[]): void {
    const selectedKey = selection[0]?.key;
    const theme = this.themeOptions.find(({ key }) => key === selectedKey);

    if (theme) {
      this.ionThemeService.theme = theme;
      this.selectedTheme.set(theme);
    }
  }
}
