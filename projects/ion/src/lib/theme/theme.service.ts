import { DOCUMENT } from '@angular/common';
import { Inject, Injectable } from '@angular/core';

import { SafeAny } from '../utils/safe-any';

export enum IonThemes {
  LIGHT = 'light',
  DARK = 'dark',
}

@Injectable({ providedIn: 'root' })
export class IonThemeService {
  constructor(@Inject(DOCUMENT) private document: SafeAny) {}

  public setTheme(theme: IonThemes): void {
    this.document.body.setAttribute('ion-theme', theme);
  }
}
