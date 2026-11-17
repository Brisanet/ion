import { TestBed } from '@angular/core/testing';
import { fireEvent, screen } from '@testing-library/angular';
import { IonFormattedThemes, IonThemeService } from 'ion';
import { ThemeSwitcherComponent } from './theme-switcher.component';

const defaultTheme: IonFormattedThemes = {
  key: 'light',
  label: 'Ion (light)',
  scheme: 'light',
};

const alternateTheme: IonFormattedThemes = {
  key: 'orange-dark',
  label: 'Brisaneto (dark)',
  scheme: 'dark',
};

describe('ThemeSwitcherComponent', () => {
  let themeService: {
    themeOptions: IonFormattedThemes[];
    theme: IonFormattedThemes;
    init: jest.Mock;
  };

  beforeEach(async () => {
    themeService = {
      themeOptions: [defaultTheme, alternateTheme],
      theme: defaultTheme,
      init: jest.fn(),
    };

    await TestBed.configureTestingModule({
      imports: [ThemeSwitcherComponent],
      providers: [{ provide: IonThemeService, useValue: themeService }],
    }).compileComponents();
  });

  it('restores the default theme when the selection is empty', () => {
    const fixture = TestBed.createComponent(ThemeSwitcherComponent);
    fixture.detectChanges();

    fixture.componentInstance.onThemeSelected([alternateTheme]);
    fixture.componentInstance.onThemeSelected([]);

    expect(themeService.theme).toEqual(defaultTheme);
    expect(fixture.componentInstance.selectedTheme()).toEqual(defaultTheme);
  });

  it('restores the default theme when the active chip is clicked again', () => {
    const fixture = TestBed.createComponent(ThemeSwitcherComponent);
    fixture.detectChanges();

    fireEvent.click(screen.getByRole('button', { name: alternateTheme.label }));
    fixture.detectChanges();
    expect(themeService.theme).toEqual(alternateTheme);

    fireEvent.click(screen.getByRole('button', { name: alternateTheme.label }));
    fixture.detectChanges();

    expect(themeService.theme).toEqual(defaultTheme);
    expect(fixture.componentInstance.selectedTheme()).toEqual(defaultTheme);
  });

});
