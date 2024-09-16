import { TestBed } from '@angular/core/testing';
import {
  IonThemeService,
  IonThemeOptions,
  IonThemeScheme,
  IonFormattedThemes,
} from './theme.service';
import { ionThemeInitializer } from './theme-initializer';

const MATCH_MEDIA_LIGHT_MOCK = {
  matches: false,
  addEventListener: jest.fn(),
};

const MATCH_MEDIA_DARK_MOCK = {
  matches: true,
  addEventListener: jest.fn(),
};

window.matchMedia = jest.fn().mockImplementation(() => MATCH_MEDIA_LIGHT_MOCK);

describe('IonThemeService', () => {
  let service: IonThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [IonThemeService, ionThemeInitializer()],
    });
    service = TestBed.get(IonThemeService);

    localStorage.clear();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get theme from localStorage', () => {
    const theme: IonFormattedThemes = {
      key: IonThemeOptions.DEFAULT,
      label: 'Ion (light)',
      scheme: IonThemeScheme.LIGHT,
    };
    localStorage.setItem('ion-theme', JSON.stringify(theme));

    expect(service.theme).toEqual(theme);
  });

  it('should set theme to localStorage and apply it', () => {
    const theme: IonFormattedThemes = {
      key: IonThemeOptions.ORANGE,
      label: 'Brisaneto (light)',
      scheme: IonThemeScheme.LIGHT,
    };

    service.theme = theme;

    expect(localStorage.getItem('ion-theme')).toEqual(JSON.stringify(theme));
  });

  it('should get colorScheme from localStorage', () => {
    localStorage.setItem('ion-color-scheme', IonThemeScheme.DARK);

    expect(service.colorScheme).toBe(IonThemeScheme.DARK);
  });

  it('should set colorScheme to localStorage', () => {
    service.colorScheme = IonThemeScheme.LIGHT;

    expect(localStorage.getItem('ion-color-scheme')).toBe(IonThemeScheme.LIGHT);
  });

  it('should format theme options on init', () => {
    expect(service.themeOptions).toEqual([
      {
        label: 'Ion (light)',
        key: 'light',
        scheme: IonThemeScheme.LIGHT,
      },
      {
        label: 'Ion (dark)',
        key: 'dark',
        scheme: IonThemeScheme.DARK,
      },
      {
        label: 'Ion (Automático)',
        key: 'ion-default',
        scheme: 'automatic',
      },
      {
        label: 'Brisaneto (light)',
        key: 'orange-light',
        scheme: IonThemeScheme.LIGHT,
      },
      {
        label: 'Brisaneto (dark)',
        key: 'orange-dark',
        scheme: IonThemeScheme.DARK,
      },
      {
        label: 'Brisaneto (Automático)',
        key: 'orange',
        scheme: 'automatic',
      },
    ]);
  });

  it('should apply the correct theme to document body', () => {
    const theme: IonFormattedThemes = {
      key: IonThemeOptions.ORANGE,
      label: 'Brisaneto (light)',
      scheme: IonThemeScheme.LIGHT,
    };
    service.theme = theme;

    expect(document.body.getAttribute('ion-theme')).toBe(theme.key);
  });

  it.each([
    { matchMedia: MATCH_MEDIA_LIGHT_MOCK, colorScheme: IonThemeScheme.LIGHT },
    { matchMedia: MATCH_MEDIA_DARK_MOCK, colorScheme: IonThemeScheme.DARK },
  ])(
    'should set $colorScheme scheme when is in automatic mode and browser prefers-color-scheme is $colorScheme',
    ({ matchMedia, colorScheme }) => {
      window.matchMedia = jest.fn().mockImplementation(() => matchMedia);
      service.init();

      service.theme = {
        key: IonThemeOptions.ORANGE,
        label: 'Brisaneto (Automático)',
        scheme: 'automatic',
      };

      expect(service.colorScheme).toBe(colorScheme);
    }
  );

  it('should update colorScheme when browser color scheme changes', () => {
    window.matchMedia = jest
      .fn()
      .mockImplementation(() => MATCH_MEDIA_LIGHT_MOCK);

    service.init();
    service.theme = {
      key: IonThemeOptions.ORANGE,
      label: 'Brisaneto (Automático)',
      scheme: 'automatic',
    };

    expect(service.colorScheme).toBe(IonThemeScheme.LIGHT);

    service['onChangeBrowserColorScheme'](
      MATCH_MEDIA_DARK_MOCK as unknown as MediaQueryListEvent
    );

    expect(service.colorScheme).toBe(IonThemeScheme.DARK);
  });
});
