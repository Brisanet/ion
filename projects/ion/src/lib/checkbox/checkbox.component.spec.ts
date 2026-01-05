import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonCheckboxComponent } from './checkbox.component';
import { CheckBoxStates, CheckboxReturn } from '../core/types/checkbox';

describe('CheckboxComponent', () => {
  let component: IonCheckboxComponent;
  let fixture: ComponentFixture<IonCheckboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonCheckboxComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonCheckboxComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('component basics', () => {
    it('should render checkbox', () => {
      fixture.detectChanges();
      const checkbox = fixture.nativeElement.querySelector(
        '[data-testid="ion-checkbox"]',
      );
      expect(checkbox).toBeTruthy();
    });

    it('should render enabled checkbox', () => {
      fixture.detectChanges();
      const checkbox = fixture.nativeElement.querySelector(
        '[data-testid="ion-checkbox"]',
      );
      expect(checkbox.disabled).toBe(false);
    });

    it('should render unchecked element', () => {
      fixture.detectChanges();
      const checkbox = fixture.nativeElement.querySelector(
        '[data-testid="ion-checkbox"]',
      );
      expect(checkbox.checked).toBe(false);
    });

    it('should check when clicked', () => {
      fixture.detectChanges();
      const checkbox = fixture.nativeElement.querySelector(
        '[data-testid="ion-checkbox"]',
      );
      checkbox.click();
      fixture.detectChanges();
      expect(checkbox.checked).toBe(true);
    });

    it('should have the attribute name defined with value', () => {
      fixture.componentRef.setInput('value', 'checkbox value');
      fixture.detectChanges();
      const checkbox = fixture.nativeElement.querySelector(
        '[data-testid="ion-checkbox"]',
      );
      expect(checkbox.getAttribute('name')).toBe('checkbox value');
    });

    it('should emit event when checked', () => {
      const emitSpy = jest.spyOn(component.ionClick, 'emit');
      fixture.detectChanges();

      const checkbox = fixture.nativeElement.querySelector(
        '[data-testid="ion-checkbox"]',
      );
      checkbox.click();

      expect(emitSpy).toHaveBeenCalledWith({ state: 'checked' });
    });

    it('should emit event with value when checked', () => {
      const emitSpy = jest.spyOn(component.ionClick, 'emit');
      fixture.componentRef.setInput('value', 'checkbox value');
      fixture.detectChanges();

      const checkbox = fixture.nativeElement.querySelector(
        '[data-testid="ion-checkbox"]',
      );
      checkbox.click();

      expect(emitSpy).toHaveBeenCalledWith({
        state: 'checked',
        value: 'checkbox value',
      });
    });
  });

  describe('Without value property set', () => {
    it('should have the attribute name defined but without value', () => {
      fixture.componentRef.setInput('label', 'Custom label');
      fixture.detectChanges();
      const checkbox = fixture.nativeElement.querySelector(
        '[data-testid="ion-checkbox"]',
      );
      expect(checkbox.getAttribute('name')).toBe('');
    });

    it('should emit event without value when checked', () => {
      const emitSpy = jest.spyOn(component.ionClick, 'emit');
      fixture.componentRef.setInput('label', 'Custom label');
      fixture.detectChanges();

      const checkbox = fixture.nativeElement.querySelector(
        '[data-testid="ion-checkbox"]',
      );
      checkbox.click();

      expect(emitSpy).toHaveBeenCalledWith({ state: 'checked' });
    });
  });

  it('should render indeterminate checkbox', () => {
    fixture.componentRef.setInput('state', 'indeterminate');
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector(
      '[data-testid="ion-checkbox"]',
    );
    expect(checkbox.indeterminate).toBe(true);
  });

  it('should render disabled checkbox', () => {
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector(
      '[data-testid="ion-checkbox"]',
    );
    expect(checkbox.disabled).toBe(true);
  });

  const states: CheckBoxStates[] = ['enabled', 'checked', 'indeterminate'];
  states.forEach((state) => {
    it(`should render ${state} disabled`, () => {
      fixture.componentRef.setInput('state', state);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();
      const checkbox = fixture.nativeElement.querySelector(
        '[data-testid="ion-checkbox"]',
      );
      expect(checkbox.disabled).toBe(true);
    });
  });

  it('should become unchecked when checked checkbox is clicked', () => {
    fixture.componentRef.setInput('state', 'checked');
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector(
      '[data-testid="ion-checkbox"]',
    );

    checkbox.click();
    fixture.detectChanges();

    expect(checkbox.checked).toBe(false);
  });

  it('should become enabled when indeterminate checkbox is clicked', () => {
    fixture.componentRef.setInput('state', 'indeterminate');
    fixture.detectChanges();
    const checkbox = fixture.nativeElement.querySelector(
      '[data-testid="ion-checkbox"]',
    );

    checkbox.click();
    fixture.detectChanges();

    expect(checkbox.checked).toBe(false);
    expect(checkbox.indeterminate).toBe(false);
  });

  const clickStates: Array<{ state: CheckBoxStates; expectedEvent: string }> = [
    { state: 'enabled', expectedEvent: 'checked' },
    { state: 'checked', expectedEvent: 'unchecked' },
  ];

  clickStates.forEach(({ state, expectedEvent }) => {
    it(`should emit right event when ${state} is clicked`, () => {
      const emitSpy = jest.spyOn(component.ionClick, 'emit');
      fixture.componentRef.setInput('state', state);
      fixture.detectChanges();

      const checkbox = fixture.nativeElement.querySelector(
        '[data-testid="ion-checkbox"]',
      );
      checkbox.click();

      expect(emitSpy).toHaveBeenCalledWith({ state: expectedEvent });
    });
  });

  it('should emit a event in every click', () => {
    const emitSpy = jest.spyOn(component.ionClick, 'emit');
    fixture.componentRef.setInput('state', 'enabled');
    fixture.detectChanges();

    const amount = 5;
    const checkbox = fixture.nativeElement.querySelector(
      '[data-testid="ion-checkbox"]',
    );

    for (let i = 0; i < amount; i++) {
      checkbox.click();
    }

    expect(emitSpy).toHaveBeenCalledTimes(amount);
  });

  it('should render label', () => {
    const labelText = 'Test Label';
    fixture.componentRef.setInput('label', labelText);
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.ion-checkbox__label');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe(labelText);
  });

  it('should be marked when clicked input label', () => {
    const labelText = 'Test Label';
    fixture.componentRef.setInput('label', labelText);
    fixture.componentRef.setInput('value', labelText);
    fixture.detectChanges();

    const label = fixture.nativeElement.querySelector('.ion-checkbox__label');
    label.click();
    fixture.detectChanges();

    const checkbox = fixture.nativeElement.querySelector(
      '[data-testid="ion-checkbox"]',
    );
    expect(checkbox.checked).toBe(true);
  });
});
