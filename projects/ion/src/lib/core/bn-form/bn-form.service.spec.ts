import { TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, Validators } from '@angular/forms';
import { BnFormService } from './bn-form.service';
import { BnFormField } from './bn-form.types';

describe('BnFormService', () => {
  let service: BnFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule],
      providers: [BnFormService],
    });
    service = TestBed.inject(BnFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a FormGroup with the correct controls', () => {
    const fields: BnFormField[] = [
      { key: 'name', label: 'Name' },
      { key: 'email', label: 'Email' },
    ];

    const formGroup = service.createFormGroup(fields);

    expect(formGroup.contains('name')).toBeTruthy();
    expect(formGroup.contains('email')).toBeTruthy();
    expect(formGroup.get('name')?.value).toBe('');
    expect(formGroup.get('email')?.value).toBe('');
  });

  it('should set initial values correctly', () => {
    const fields: BnFormField[] = [
      { key: 'name', label: 'Name', initialValue: 'John Doe' },
    ];

    const formGroup = service.createFormGroup(fields);

    expect(formGroup.get('name')?.value).toBe('John Doe');
  });

  it('should apply validators correctly', () => {
    const fields: BnFormField[] = [
      { key: 'email', label: 'Email', validators: [Validators.required, Validators.email] },
    ];

    const formGroup = service.createFormGroup(fields);
    const control = formGroup.get('email');

    control?.setValue('');
    expect(control?.valid).toBeFalsy();
    expect(control?.hasError('required')).toBeTruthy();

    control?.setValue('invalid-email');
    expect(control?.valid).toBeFalsy();
    expect(control?.hasError('email')).toBeTruthy();

    control?.setValue('test@example.com');
    expect(control?.valid).toBeTruthy();
  });

  it('should set disabled state correctly', () => {
    const fields: BnFormField[] = [
      { key: 'name', label: 'Name', disabled: true },
    ];

    const formGroup = service.createFormGroup(fields);

    expect(formGroup.get('name')?.disabled).toBeTruthy();
  });
});
