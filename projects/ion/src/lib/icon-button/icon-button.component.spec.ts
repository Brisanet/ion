import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonIconButtonComponent } from './icon-button.component';

describe('IonIconButtonComponent', () => {
  let fixture: ComponentFixture<IonIconButtonComponent>;
  let component: IonIconButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonIconButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonIconButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLabel', 'Fechar');
    fixture.componentRef.setInput('icon', 'close');
    fixture.detectChanges();
  });

  it('renders the icon with the required accessible name', () => {
    const button: HTMLButtonElement =
      fixture.nativeElement.querySelector('button');

    expect(button.getAttribute('aria-label')).toBe('Fechar');
    expect(button.querySelector('ion-icon svg')).toHaveAttribute(
      'id',
      'ion-icon-close'
    );
    expect(button.querySelector('ion-icon')).toHaveAttribute(
      'aria-hidden',
      'true'
    );
  });

  it.each([
    ['small', 'ion-icon-button--small', 16],
    ['medium', 'ion-icon-button--medium', 20],
    ['large', 'ion-icon-button--large', 24],
  ] as const)('supports %s size', (size, cssClass, iconSize) => {
    fixture.componentRef.setInput('size', size);
    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');
    const icon = fixture.nativeElement.querySelector('ion-icon');

    expect(button.classList.contains(cssClass)).toBe(true);
    expect(icon.querySelector('svg')).toHaveAttribute('width', `${iconSize}px`);
    expect(icon.querySelector('svg')).toHaveAttribute(
      'height',
      `${iconSize}px`
    );
  });

  it.each([
    ['default', 'ion-icon-button--default'],
    ['full', 'ion-icon-button--full'],
  ] as const)('supports %s rounding', (rounding, cssClass) => {
    fixture.componentRef.setInput('rounding', rounding);
    fixture.detectChanges();

    expect(
      fixture.nativeElement.querySelector('button').classList.contains(cssClass)
    ).toBe(true);
  });

  it('emits ionOnClick when activated', () => {
    const clickSpy = jest.fn();
    component.ionOnClick.subscribe(clickSpy);

    fixture.nativeElement.querySelector('button').click();

    expect(clickSpy).toHaveBeenCalledTimes(1);
  });

  it('does not emit ionOnClick when disabled', () => {
    const clickSpy = jest.fn();
    component.ionOnClick.subscribe(clickSpy);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    fixture.nativeElement.querySelector('button').click();

    expect(clickSpy).not.toHaveBeenCalled();
  });

  it('applies the selected color theme', () => {
    fixture.componentRef.setInput('theme', 'orange');
    fixture.detectChanges();

    expect(
      fixture.nativeElement
        .querySelector('button')
        .classList.contains('ion-icon-button--orange')
    ).toBe(true);
  });
});
