import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';
import { BnFormComponent } from './bn-form.component';
import { BnFormField } from './bn-form.types';
import { IonInputComponent } from 'ion';
import { By } from '@angular/platform-browser';

describe('BnFormComponent', () => {
  let component: BnFormComponent;
  let fixture: ComponentFixture<BnFormComponent>;

  const mockFields: BnFormField[] = [
    {
      key: 'testField',
      label: 'Test Label',
      placeholder: 'Test Placeholder',
    },
  ];

  const mockFormGroup = new FormGroup({
    testField: new FormControl(''),
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnFormComponent, ReactiveFormsModule, IonInputComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnFormComponent);
    component = fixture.componentInstance;

    // Set inputs using the new signal-based input API if possible,
    // but for tests we often use componentRef.setInput or just set the property if it's a signal.
    // Since they are input() signals, we use fixture.componentRef.setInput
    fixture.componentRef.setInput('fields', mockFields);
    fixture.componentRef.setInput('formGroup', mockFormGroup);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the field label', () => {
    const labelElement = fixture.debugElement.query(By.css('h3')).nativeElement;
    expect(labelElement.textContent).toContain('Test Label');
  });

  it('should render ion-input with correct properties', () => {
    const ionInput = fixture.debugElement.query(By.css('ion-input'));
    expect(ionInput).toBeTruthy();
    // We can check if the component instance has the correct values passed to it
    const ionInputInstance = ionInput.componentInstance as IonInputComponent;
    expect(ionInputInstance.placeholder()).toBe('Test Placeholder');
  });

  it('should update FormGroup when ion-input value changes', () => {
    const ionInput = fixture.debugElement.query(By.css('ion-input'));
    // Trigger the valueChange output
    ionInput.triggerEventHandler('valueChange', 'new value');

    expect(mockFormGroup.get('testField')?.value).toBe('new value');
    expect(mockFormGroup.get('testField')?.dirty).toBeTruthy();
    expect(mockFormGroup.get('testField')?.touched).toBeTruthy();
  });

  it('should call onClickButton when ion-input button is clicked', () => {
    const onClickSpy = jest.fn();
    const fieldsWithButton: BnFormField[] = [
      {
        key: 'buttonField',
        label: 'Button Field',
        inputButton: true,
        onClickButton: onClickSpy,
      },
    ];
    const formGroupWithButton = new FormGroup({
      buttonField: new FormControl('button value'),
    });

    fixture.componentRef.setInput('fields', fieldsWithButton);
    fixture.componentRef.setInput('formGroup', formGroupWithButton);
    fixture.detectChanges();

    const ionInput = fixture.debugElement.query(By.css('ion-input'));
    ionInput.triggerEventHandler('clickButton', null);

    expect(onClickSpy).toHaveBeenCalledWith('button value');
  });

  it('should render ion-triple-toggle when type is triple-toggle', () => {
    const tripleToggleFields: BnFormField[] = [
      {
        key: 'toggleField',
        label: 'Toggle Label',
        type: 'triple-toggle',
        options: [
          { value: 'yes', label: 'Yes' },
          { value: 'no', label: 'No' },
        ],
      },
    ];
    const tripleToggleFormGroup = new FormGroup({
      toggleField: new FormControl('yes'),
    });

    fixture.componentRef.setInput('fields', tripleToggleFields);
    fixture.componentRef.setInput('formGroup', tripleToggleFormGroup);
    fixture.detectChanges();

    const tripleToggle = fixture.debugElement.query(
      By.css('ion-triple-toggle'),
    );
    expect(tripleToggle).toBeTruthy();

    // Trigger ionClick
    tripleToggle.triggerEventHandler('ionClick', 'no');
    expect(tripleToggleFormGroup.get('toggleField')?.value).toBe('no');
  });

  it('should render ion-switch when type is switch', () => {
    const switchFields: BnFormField[] = [
      {
        key: 'switchField',
        label: 'Switch Label',
        type: 'switch',
      },
    ];
    const switchFormGroup = new FormGroup({
      switchField: new FormControl(false),
    });

    fixture.componentRef.setInput('fields', switchFields);
    fixture.componentRef.setInput('formGroup', switchFormGroup);
    fixture.detectChanges();

    const ionSwitch = fixture.debugElement.query(By.css('ion-switch'));
    expect(ionSwitch).toBeTruthy();

    // Trigger atValueChange
    ionSwitch.triggerEventHandler('atValueChange', true);
    expect(switchFormGroup.get('switchField')?.value).toBe(true);
  });

  it('should render ion-date-picker when type is datepicker', () => {
    const datepickerFields: BnFormField[] = [
      {
        key: 'dateField',
        label: 'Date Label',
        type: 'datepicker',
      },
    ];
    const datepickerFormGroup = new FormGroup({
      dateField: new FormControl([]),
    });

    fixture.componentRef.setInput('fields', datepickerFields);
    fixture.componentRef.setInput('formGroup', datepickerFormGroup);
    fixture.detectChanges();

    const datepicker = fixture.debugElement.query(By.css('ion-date-picker'));
    expect(datepicker).toBeTruthy();

    // Trigger event
    datepicker.triggerEventHandler('event', ['2023-01-01']);
    expect(datepickerFormGroup.get('dateField')?.value).toEqual(['2023-01-01']);
  });
});
