import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export enum IonThemeOptions {
  DEFAULT = 'ion-default',
  ORANGE = 'orange',
}

export enum IonThemeScheme {
  LIGHT = 'light',
  DARK = 'dark',
}

type IonSCSSThemeKeys = 'light' | 'dark' | 'orange-light' | 'orange-dark';

export interface IonFormattedThemes {
  key: IonSCSSThemeKeys | IonThemeOptions;
  label: string;
  scheme: IonThemeScheme;
  useBrowserScheme?: boolean;
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
  public themeOptions!: IonFormattedThemes[];

  private themeSubject = new BehaviorSubject<IonFormattedThemes | null>(null);
  private browserColorScheme!: IonThemeScheme;

  public get theme(): IonFormattedThemes | null {
    const theme = localStorage.getItem('ion-theme');
    return theme ? (JSON.parse(theme) as IonFormattedThemes) : null;
  }

  public set theme(theme: IonFormattedThemes) {
    if (JSON.stringify(theme) !== JSON.stringify(this.theme)) {
      localStorage.setItem('ion-theme', JSON.stringify(theme));
      this.applyTheme(theme);
    }
  }

  public get theme$(): Observable<IonFormattedThemes> {
    return this.themeSubject.asObservable() as Observable<IonFormattedThemes>;
  }

  public init(): void {
    this.formatThemeOptions();

    if (!this.theme) {
      this.theme = this.themeOptions[0];
    }

    this.listenToBrowserColorSchemeChanges();
    this.applyTheme();
  }

  private applyTheme(theme: IonFormattedThemes | null = this.theme): void {
    if (!theme) return;
    let key = theme.key;

    if (theme.useBrowserScheme) {
      const themeConfig = THEMES_CONFIGURATION.find(
        ({ key }) => key === theme.key,
      );
      if (themeConfig) {
        key = themeConfig.schemes[this.browserColorScheme];
      }
    }

    document.body.setAttribute('ion-theme', key);
    this.emitThemeChange(theme);
  }

  private emitThemeChange(theme: IonFormattedThemes): void {
    const newValue: IonFormattedThemes = {
      ...theme,
      scheme: theme.useBrowserScheme ? this.browserColorScheme : theme.scheme,
    };
    this.theme = newValue;
    this.themeSubject.next(newValue);
  }

  private listenToBrowserColorSchemeChanges(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.updateBrowserColorScheme(mediaQuery.matches);

    mediaQuery.addEventListener(
      'change',
      this.onChangeBrowserColorScheme.bind(this),
    );
  }

  private onChangeBrowserColorScheme(event: MediaQueryListEvent): void {
    this.updateBrowserColorScheme(event.matches);
    if (this.theme && this.theme.useBrowserScheme) {
      this.applyTheme();
    }
  }

  private updateBrowserColorScheme(isDark: boolean): void {
    this.browserColorScheme = isDark
      ? IonThemeScheme.DARK
      : IonThemeScheme.LIGHT;
  }

  private formatThemeOptions(): void {
    this.themeOptions = THEMES_CONFIGURATION.reduce((acc, config) => {
      const { key, label, schemes } = config;

      const options = Object.entries(schemes).map(([scheme, value]) => ({
        key: value,
        label: `${label} (${scheme})`,
        scheme: scheme as IonThemeScheme,
      }));
      acc.push(...options);

      if (schemes[IonThemeScheme.LIGHT] && schemes[IonThemeScheme.DARK]) {
        acc.push({
          key,
          label: `${label} (Automático)`,
          scheme: IonThemeScheme.LIGHT,
          useBrowserScheme: true,
        });
      }

      return acc;
    }, [] as IonFormattedThemes[]);
  }
}
