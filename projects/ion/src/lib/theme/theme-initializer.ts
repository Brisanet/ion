import { APP_INITIALIZER, FactoryProvider } from '@angular/core';

import { IonThemeService } from './theme.service';

/**
 * Factory provider for the IonThemeService to be initialized on app startup.
 * should be used in app.module.ts providers array
 * @returns FactoryProvider
 */
export function ionThemeInitializer(): FactoryProvider {
  return {
    provide: APP_INITIALIZER,
    deps: [IonThemeService],
    useFactory: (themeService: IonThemeService) => {
      return () => themeService.init();
    },
    multi: true,
  };
}
