import { FormControl, Validators } from '@angular/forms';
import { ISwitchField, SwitchField } from './switchField';

const fields: ISwitchField = {
  label: 'Teste',
};

describe('TextAreaField', () => {
  let switchField: SwitchField;
  const formControl = new FormControl(false);

  beforeAll(() => {
    switchField = new SwitchField({ ...fields });
    switchField.setFormControl(formControl);
  });

  it('should instantiate a switch field', () => {
    expect(switchField).toBeInstanceOf(SwitchField);
  });
  it('should set a key on field', () => {
    switchField.key = 'test';
    expect(switchField.key).toBe('test');
  });
  it('should have type switch', () => {
    expect(switchField.type).toBe('switch');
  });
  it('should disable field', () => {
    switchField.setDisable(true);
    expect(switchField.getDisabled()).toBeTruthy();
    expect(formControl.disabled).toBeTruthy();
  });
  it('should enable field', () => {
    switchField.setDisable(false);
    expect(switchField.getDisabled()).toBeFalsy();
    expect(formControl.enabled).toBeTruthy();
  });
  it('should have required validator', () => {
    expect(switchField.getValidators()).not.toContain(Validators.required);
  });
  it('should not have required validator', () => {
    switchField = new SwitchField({ ...fields, required: true });
    expect(switchField.getValidators()).toContain(Validators.required);
  });
});
