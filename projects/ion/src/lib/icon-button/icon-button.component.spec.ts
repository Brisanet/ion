import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonIconButtonComponent } from './icon-button.component';

describe('IonIconButtonComponent', () => {
  let fixture: ComponentFixture<IonIconButtonComponent>;
  let component: IonIconButtonComponent;

  const getButton = (): HTMLButtonElement =>
    fixture.nativeElement.querySelector('button');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonIconButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonIconButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLabel', 'Close');
    fixture.componentRef.setInput('icon', 'close');
    fixture.detectChanges();
  });

  describe('Rendering and default values', () => {
    it('renders the button with default attributes and classes', () => {
      const button = getButton();

      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('aria-label', 'Close');
      expect(button).toHaveAttribute('data-testid', 'icon-btn-Close');
      expect(button).not.toHaveAttribute('aria-busy');
      expect(button).not.toHaveAttribute('aria-disabled');
      expect(button).not.toBeDisabled();

      expect(button).toHaveClass(
        'ion-icon-button',
        'ion-icon-button--primary',
        'ion-icon-button--md',
        'ion-icon-button--default'
      );
      expect(button).not.toHaveClass('danger', 'loading');
    });

    it.each(['submit', 'reset'] as const)(
      'sets the native button type to %s',
      (buttonType) => {
        fixture.componentRef.setInput('buttonType', buttonType);
        fixture.detectChanges();

        expect(getButton()).toHaveAttribute('type', buttonType);
      }
    );

    it('renders the decorative icon correctly', () => {
      const button = getButton();
      const icon = button.querySelector('ion-icon');

      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon?.querySelector('svg')).toHaveAttribute(
        'id',
        'ion-icon-close'
      );
      expect(icon?.querySelector('svg')).toHaveAttribute(
        'fill',
        'currentColor'
      );
    });

    it('updates aria-label, data-testid, and icon dynamically', () => {
      fixture.componentRef.setInput('ariaLabel', 'Edit');
      fixture.componentRef.setInput('icon', 'edit');
      fixture.detectChanges();

      const button = getButton();

      expect(button).toHaveAttribute('aria-label', 'Edit');
      expect(button).toHaveAttribute('data-testid', 'icon-btn-Edit');
      expect(button.querySelector('ion-icon svg')).toHaveAttribute(
        'id',
        'ion-icon-edit'
      );
    });

    it('shows the configured tooltip when hovering over the button', () => {
      fixture.componentRef.setInput('tooltip', 'Save changes');
      fixture.detectChanges();

      getButton().dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(document.body.querySelector('ion-tooltip')).toHaveTextContent(
        'Save changes'
      );

      getButton().dispatchEvent(new MouseEvent('mouseleave'));
      fixture.detectChanges();
      expect(document.body.querySelector('ion-tooltip')).toBeNull();
    });

    it('shows the configured tooltip when the button receives focus', () => {
      fixture.componentRef.setInput('tooltip', 'Save changes');
      fixture.detectChanges();

      getButton().focus();
      fixture.detectChanges();

      expect(document.body.querySelector('ion-tooltip')).toHaveTextContent(
        'Save changes'
      );

      getButton().blur();
      fixture.detectChanges();
      expect(document.body.querySelector('ion-tooltip')).toBeNull();
    });

    it('does not show a tooltip when no text is configured', () => {
      getButton().dispatchEvent(new MouseEvent('mouseenter'));
      fixture.detectChanges();

      expect(document.body.querySelector('ion-tooltip')).toBeNull();
    });
  });

  describe('Variants and styles', () => {
    it.each(['primary', 'secondary', 'ghost', 'dashed'] as const)(
      'applies the class corresponding to type %s',
      (type) => {
        fixture.componentRef.setInput('type', type);
        fixture.detectChanges();

        expect(getButton()).toHaveClass(`ion-icon-button--${type}`);
      }
    );

    it.each([
      ['sm', 16, 'ion-icon-button--sm'],
      ['md', 16, 'ion-icon-button--md'],
      ['lg', 24, 'ion-icon-button--lg'],
    ] as const)(
      'supports size %s and sets the icon to %dpx',
      (size, iconSize, cssClass) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const svg = getButton().querySelector('ion-icon svg');

        expect(getButton()).toHaveClass(cssClass);
        expect(svg).toHaveAttribute('width', `${iconSize}px`);
        expect(svg).toHaveAttribute('height', `${iconSize}px`);
      }
    );

    it.each([
      ['default', 'ion-icon-button--default'],
      ['full', 'ion-icon-button--full'],
    ] as const)(
      'supports %s rounding',
      (rounding, cssClass) => {
        fixture.componentRef.setInput('rounding', rounding);
        fixture.detectChanges();

        expect(getButton()).toHaveClass(cssClass);
      }
    );

    it('toggles the danger class based on the input', () => {
      expect(getButton()).not.toHaveClass('danger');

      fixture.componentRef.setInput('danger', true);
      fixture.detectChanges();

      expect(getButton()).toHaveClass('danger');
    });
  });

  describe('Loading state', () => {
    it('shows the spinner, hides the icon, and keeps the button focusable while loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const button = getButton();
      const spinner = button.querySelector('ion-spinner');

      expect(button).not.toBeDisabled();
      expect(button).toHaveAttribute('aria-disabled', 'true');
      expect(button).toHaveClass('loading');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
      expect(button.querySelector('ion-icon')).toBeNull();

      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();
      button.focus();
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      expect(document.activeElement).toBe(button);
    });

    it('restores the icon and enables the button when loading returns to false', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();

      const button = getButton();

      expect(button).not.toBeDisabled();
      expect(button).not.toHaveClass('loading');
      expect(button).not.toHaveAttribute('aria-busy');
      expect(button).not.toHaveAttribute('aria-disabled');
      expect(button.querySelector('ion-spinner')).toBeNull();
      expect(button.querySelector('ion-icon')).not.toBeNull();
    });

    it.each([
      ['sm', 16],
      ['md', 16],
      ['lg', 24],
    ] as const)(
      'keeps the spinner at size %s with dimensions of %dpx',
      (size, iconSize) => {
        fixture.componentRef.setInput('size', size);
        fixture.componentRef.setInput('loading', true);
        fixture.detectChanges();

        const spinner: HTMLElement | null = getButton().querySelector(
          'ion-spinner .ion-spinner'
        );

        expect(spinner).toHaveStyle({
          width: `${iconSize}px`,
          height: `${iconSize}px`,
        });
      }
    );
  });

  describe('Interactions and events', () => {
    it('emits ionOnClick when clicked while enabled', () => {
      const clickSpy = jest.fn();
      component.ionOnClick.subscribe(clickSpy);

      getButton().click();

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('does not emit ionOnClick when disabled', () => {
      const clickSpy = jest.fn();
      component.ionOnClick.subscribe(clickSpy);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(getButton()).not.toHaveAttribute('aria-disabled');
      expect(getButton()).toBeDisabled();
      getButton().click();
      component.handleClick();

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('does not emit ionOnClick while loading', () => {
      const clickSpy = jest.fn();
      component.ionOnClick.subscribe(clickSpy);
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      getButton().click();
      component.handleClick();

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });
});