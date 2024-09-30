import { APP_INITIALIZER } from '@angular/core';

import { ionThemeInitializer } from './theme-initializer';
import { IonThemeService } from './theme.service';

describe('ionThemeInitializer', () => {
  let ionThemeService: IonThemeService;

  beforeEach(() => {
    ionThemeService = { init: jest.fn() } as unknown as IonThemeService;
  });

  it('should return a FactoryProvider with APP_INITIALIZER and multi true', () => {
    const provider = ionThemeInitializer();

    expect(provider.provide).toBe(APP_INITIALIZER);
    expect(provider.multi).toBe(true);
  });

  it('should use the IonThemeService in deps', () => {
    expect(ionThemeInitializer().deps).toContain(IonThemeService);
  });

  it('should call themeService.init in the useFactory', () => {
    const provider = ionThemeInitializer();

    const factoryFunction = provider.useFactory(ionThemeService);
    factoryFunction();

    expect(ionThemeService.init).toHaveBeenCalled();
  });
});
