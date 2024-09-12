import { Injectable } from '@angular/core';

export enum IonThemeOptions {
  DEFAULT = 'ion-default',
  ORANGE = 'orange',
}

enum IonThemeScheme {
  LIGHT = 'light',
  DARK = 'dark',
}

type IonSCSSThemeKeys = 'light' | 'dark' | 'orange-light' | 'orange-dark';

export interface IonFormattedThemes {
  key: IonSCSSThemeKeys | IonThemeOptions;
  label: string;
  scheme: IonThemeScheme | 'automatic';
}

interface IonThemeConfiguration {
  key: IonThemeOptions;
  label: string;
  schemes: Record<IonThemeScheme, IonSCSSThemeKeys>;
}

const THEMES_CONFIGURATION: IonThemeConfiguration[] = [
  {
    key: IonThemeOptions.DEFAULT,
    label: 'Ion',
    schemes: {
      [IonThemeScheme.LIGHT]: 'light',
      [IonThemeScheme.DARK]: 'dark',
    },
  },
  {
    key: IonThemeOptions.ORANGE,
    label: 'Brisaneto',
    schemes: {
      [IonThemeScheme.LIGHT]: 'orange-light',
      [IonThemeScheme.DARK]: 'orange-dark',
    },
  },
];

@Injectable({ providedIn: 'root' })
export class IonThemeService {
  public themeOptions: IonFormattedThemes[];

  private nativeColorScheme: IonThemeScheme;

  public get theme(): IonFormattedThemes | null {
    return JSON.parse(localStorage.getItem('ion-theme')) as IonFormattedThemes;
  }

  public set theme(theme: IonFormattedThemes) {
    localStorage.setItem('ion-theme', JSON.stringify(theme));
    this.applyTheme(theme);
  }

  public get colorScheme(): IonThemeScheme | null {
    return localStorage.getItem('ion-color-scheme') as IonThemeScheme;
  }

  public set colorScheme(colorScheme: IonThemeScheme) {
    localStorage.setItem('ion-color-scheme', colorScheme);
  }

  public init(): void {
    this.buildThemeOptions();

    if (!this.colorScheme) {
      this.colorScheme = IonThemeScheme.LIGHT;
    }

    if (!this.theme) {
      this.theme = this.themeOptions[0];
    }

    this.listenToNativeThemeChanges();
    this.applyTheme();
  }

  private applyTheme(theme: IonFormattedThemes = this.theme): void {
    let key = theme.key;

    if (theme.scheme === 'automatic') {
      this.colorScheme = this.nativeColorScheme;

      key = THEMES_CONFIGURATION.find(({ key }) => key === theme.key).schemes[
        this.nativeColorScheme
      ];
    }

    document.body.setAttribute('ion-theme', key);
  }

  private listenToNativeThemeChanges(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.updateNativeTheme(mediaQuery.matches);

    mediaQuery.addEventListener('change', (event) => {
      this.updateNativeTheme(event.matches);
      if (this.theme.scheme === 'automatic') {
        this.colorScheme = this.nativeColorScheme;
        this.applyTheme();
      }
    });
  }

  private updateNativeTheme(isDark: boolean): void {
    this.nativeColorScheme = isDark
      ? IonThemeScheme.DARK
      : IonThemeScheme.LIGHT;
  }

  private buildThemeOptions(): void {
    this.themeOptions = THEMES_CONFIGURATION.reduce((acc, config) => {
      const { key, label, schemes } = config;

      const options = Object.entries(schemes).map(([scheme, value]) => ({
        key: value,
        label: `${label} (${scheme})`,
        scheme: scheme as IonThemeScheme,
      }));
      acc.push(...options);

      if (schemes[IonThemeScheme.LIGHT] && schemes[IonThemeScheme.DARK]) {
        acc.push({ key, label: `${label} (Automático)`, scheme: 'automatic' });
      }

      return acc;
    }, [] as IonFormattedThemes[]);
  }
}
