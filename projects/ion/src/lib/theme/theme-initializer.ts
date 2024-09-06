import { APP_INITIALIZER, FactoryProvider } from '@angular/core';

import { IonThemeService } from './theme.service';

export function themingInitializer(): FactoryProvider {
  return {
    provide: APP_INITIALIZER,
    deps: [IonThemeService],
    useFactory: function initializeTheme(themeService: IonThemeService) {
      return () => themeService.init();
    },
    multi: true,
  };
}
