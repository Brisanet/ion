import { FormControl, Validators } from '@angular/forms';
import { ITextField, TextField } from './textField';

const fields: ITextField = {
  label: 'Teste',
  placeholder: 'Teste',
};

describe('TextField', () => {
  let textField: TextField;
  const formControl = new FormControl('');

  beforeAll(() => {
    textField = new TextField({ ...fields });
    textField.setFormControl(formControl);
  });

  it('should instantiate a text field', () => {
    expect(textField).toBeInstanceOf(TextField);
  });
  it('should set a key on field', () => {
    textField.key = 'test';
    expect(textField.key).toBe('test');
  });
  it('should have type text', () => {
    expect(textField.type).toBe('text');
  });
  it('should disable field', () => {
    textField.setDisable(true);
    expect(textField.getDisabled()).toBeTruthy();
    expect(formControl.disabled).toBeTruthy();
  });
  it('should enable field', () => {
    textField.setDisable(false);
    expect(textField.getDisabled()).toBeFalsy();
    expect(formControl.enabled).toBeTruthy();
  });
  it('should have required validator', () => {
    expect(textField.getValidators()).not.toContain(Validators.required);
  });
  it('should not have required validator', () => {
    textField = new TextField({ ...fields, required: true });
    expect(textField.getValidators()).toContain(Validators.required);
  });
});
