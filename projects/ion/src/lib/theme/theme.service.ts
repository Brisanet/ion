import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

export enum IonThemes {
  LIGHT = 'light',
  DARK = 'dark',
  AUTOMATIC = 'automatic',
}

@Injectable({ providedIn: 'root' })
export class IonThemeService {
  private nativeTheme: IonThemes;

  public get theme(): IonThemes | null {
    return localStorage.getItem('ion-theme') as IonThemes | null;
  }

  public set theme(theme: IonThemes) {
    const selectedTheme =
      theme === IonThemes.AUTOMATIC ? this.nativeTheme : theme;
    this.applyTheme(selectedTheme);
    localStorage.setItem('ion-theme', theme);
  }

  constructor(@Inject(DOCUMENT) private document: Document) {}

  public init(): void {
    this.listenToNativeThemeChanges();

    const storedTheme = this.theme;
    this.theme = storedTheme || IonThemes.LIGHT;
  }

  private applyTheme(theme: IonThemes): void {
    this.document.body.setAttribute('ion-theme', theme);
  }

  private listenToNativeThemeChanges(): void {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.updateNativeTheme(mediaQuery.matches);

    mediaQuery.addEventListener('change', (event) => {
      this.updateNativeTheme(event.matches);
      if (this.theme === IonThemes.AUTOMATIC) {
        this.applyTheme(this.nativeTheme);
      }
    });
  }

  private updateNativeTheme(isDark: boolean): void {
    this.nativeTheme = isDark ? IonThemes.DARK : IonThemes.LIGHT;
  }
}
