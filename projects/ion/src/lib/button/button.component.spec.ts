import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonButtonComponent } from './button.component';

describe('ButtonComponent', () => {
  let component: IonButtonComponent;
  let fixture: ComponentFixture<IonButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonButtonComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render button with custom label', () => {
    fixture.componentRef.setInput('label', 'Clique aqui');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    expect(button.textContent).toContain('Clique aqui');
  });

  it('should emit an event when clicked', () => {
    const clickSpy = jest.fn();
    component.ionOnClick.subscribe(clickSpy);

    fixture.componentRef.setInput('label', 'Test Button');
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(clickSpy).toHaveBeenCalled();
  });

  it('should not call event when is loading', () => {
    const clickSpy = jest.fn();
    component.ionOnClick.subscribe(clickSpy);

    fixture.componentRef.setInput('label', 'Test Button');
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('should not call event when is disabled', () => {
    const clickSpy = jest.fn();
    component.ionOnClick.subscribe(clickSpy);

    fixture.componentRef.setInput('label', 'Test Button');
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    button.click();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  const types: Array<'primary' | 'secondary' | 'ghost' | 'dashed'> = [
    'primary',
    'secondary',
    'ghost',
    'dashed',
  ];

  types.forEach((type) => {
    it(`should render correct type: ${type}`, () => {
      fixture.componentRef.setInput('label', 'button');
      fixture.componentRef.setInput('type', type);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains(`ion-btn-${type}`)).toBe(true);
    });
  });

  const sizes: Array<'lg' | 'md' | 'sm' | 'xl'> = ['lg', 'md', 'sm', 'xl'];

  sizes.forEach((size) => {
    it(`should render correct size: ${size}`, () => {
      fixture.componentRef.setInput('label', 'button');
      fixture.componentRef.setInput('size', size);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains(`ion-btn-${size}`)).toBe(true);
    });
  });

  describe('Icon on ButtonComponent', () => {
    it('Icon pencil on button', () => {
      fixture.componentRef.setInput('iconType', 'pencil');
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      const icon = button.querySelector('ion-icon');

      expect(icon).toBeTruthy();
      expect(icon.getAttribute('ng-reflect-type')).toBe('pencil');
    });

    it('Right side icon', () => {
      fixture.componentRef.setInput('iconType', 'pencil');
      fixture.componentRef.setInput('rightSideIcon', true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      const icon = button.querySelector('ion-icon');

      expect(icon).toBeTruthy();
      expect(button.classList.contains('right-side-icon')).toBe(true);
    });

    it('Button with circular icon', () => {
      fixture.componentRef.setInput('iconType', 'pencil');
      fixture.componentRef.setInput('circularButton', true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      const icon = button.querySelector('ion-icon');

      expect(icon).toBeTruthy();
      expect(button.classList.contains('circular-button')).toBe(true);
    });

    it('should find button by data-testid when dont have label', () => {
      const myCustomId = '1234';
      fixture.componentRef.setInput('iconType', 'pencil');
      fixture.componentRef.setInput('id', myCustomId);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector(
        `[data-testid="btn-${myCustomId}"]`
      );
      expect(button).toBeTruthy();
    });
  });

  describe('Danger ButtonComponent', () => {
    it('should render a button with the danger class when danger="true" is passed', () => {
      fixture.componentRef.setInput('label', 'button');
      fixture.componentRef.setInput('danger', true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.classList.contains('danger')).toBe(true);
    });
  });

  describe('Disabled ButtonComponent', () => {
    it('should render a disabled button when disabled="true" is passed', () => {
      fixture.componentRef.setInput('label', 'button');
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.hasAttribute('disabled')).toBe(true);
    });
  });

  describe('Expand ButtonComponent', () => {
    it('should render a expand button when expand="true" is passed', () => {
      fixture.componentRef.setInput('label', 'button');
      fixture.componentRef.setInput('expand', true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      expect(button.style.width).toBe('100%');
    });
  });

  describe('load ButtonComponent', () => {
    it('should render a loading button when loading="true" is passed and keep label', () => {
      fixture.componentRef.setInput('label', 'button');
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      const spinner = button.querySelector('.spinner');

      expect(button.classList.contains('loading')).toBe(true);
      expect(spinner).toBeTruthy();
      expect(button.textContent).toContain('button');
    });

    it('should render a loading button with message "aguarde ..."', () => {
      const loadingMessage = 'aguarde ...';
      fixture.componentRef.setInput('label', 'button');
      fixture.componentRef.setInput('loading', true);
      fixture.componentRef.setInput('loadingMessage', loadingMessage);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      const spinner = button.querySelector('.spinner');

      expect(button.classList.contains('loading')).toBe(true);
      expect(spinner).toBeTruthy();
      expect(button.textContent).toContain(loadingMessage);
    });

    it('should not show loading message when button is not loading', () => {
      const loadingMessage = "I'm loading";
      fixture.componentRef.setInput('label', 'button');
      fixture.componentRef.setInput('loading', false);
      fixture.componentRef.setInput('loadingMessage', loadingMessage);
      fixture.detectChanges();

      const button = fixture.nativeElement.querySelector('button');
      const spinner = button.querySelector('.spinner');

      expect(button.classList.contains('loading')).toBe(false);
      expect(spinner).toBeFalsy();
      expect(button.textContent).not.toContain(loadingMessage);
    });
  });

  describe('ButtonComponent with dropdown', () => {
    describe('ButtonComponent with single selection dropdown', () => {
      it('should render a single-selection dropdown when button is clicked', () => {
        const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

        fixture.componentRef.setInput('label', 'button');
        fixture.componentRef.setInput('options', options);
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('button');
        button.click();
        fixture.detectChanges();

        const dropdown = document.body.querySelector(
          '[data-testid="ion-dropdown"]'
        );
        expect(dropdown).toBeTruthy();
      });

      it('should close the dropdown when the button is clicked', () => {
        const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

        fixture.componentRef.setInput('label', 'button');
        fixture.componentRef.setInput('options', options);
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('button');
        button.click();
        fixture.detectChanges();

        button.click();
        fixture.detectChanges();

        const dropdown = document.body.querySelector(
          '[data-testid="ion-dropdown"]'
        );
        expect(dropdown).toBeFalsy();
      });

      it('should has "above" class when dropdown is show and its configured to open above button', () => {
        const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

        fixture.componentRef.setInput('label', 'button');
        fixture.componentRef.setInput('showDropdownAbove', true);
        fixture.componentRef.setInput('options', options);
        fixture.detectChanges();

        const button = fixture.nativeElement.querySelector('button');
        button.click();
        fixture.detectChanges();

        const container = fixture.nativeElement.querySelector('.above');
        expect(container).toBeTruthy();
      });
    });
  });

  describe('ButtonComponent with badge', () => {
    it('should render badge when multiple is true and not loading', () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      fixture.componentRef.setInput('label', 'Select');
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector(
        '[data-testid="badge-multiple"]'
      );
      expect(badge).toBeTruthy();
    });

    it('should not render badge when loading', () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      fixture.componentRef.setInput('label', 'Select');
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('loading', true);
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector(
        '[data-testid="badge-multiple"]'
      );
      expect(badge).toBeFalsy();
    });

    it('should not render badge when circularButton is true', () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('circularButton', true);
      fixture.componentRef.setInput('options', options);
      fixture.componentRef.setInput('iconType', 'check');
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector(
        '[data-testid="badge-multiple"]'
      );
      expect(badge).toBeFalsy();
    });

    it('should display badge value of 0 initially', () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      fixture.componentRef.setInput('label', 'Select');
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('options', options);
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector(
        '[data-testid="badge-multiple"] span'
      );
      expect(badge.textContent).toBe('0');
    });
  });
});
