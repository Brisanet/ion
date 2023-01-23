import { FormControl, Validators } from '@angular/forms';
import { ITextAreaField, TextAreaField } from './textAreaField';
import { TextField } from './textField';

const fields: ITextAreaField = {
  label: 'Teste',
  placeholder: 'Teste',
};

describe('TextAreaField', () => {
  let textAreaField: TextAreaField;
  const formControl = new FormControl('');

  beforeAll(() => {
    textAreaField = new TextAreaField({ ...fields });
    textAreaField.setFormControl(formControl);
  });

  it('should instantiate a text field', () => {
    expect(textAreaField).toBeInstanceOf(TextAreaField);
  });
  it('should set a key on field', () => {
    textAreaField.key = 'test';
    expect(textAreaField.key).toBe('test');
  });
  it('should have type text', () => {
    expect(textAreaField.type).toBe('textarea');
  });
  it('should disable field', () => {
    textAreaField.setDisable(true);
    expect(textAreaField.getDisabled()).toBeTruthy();
    expect(formControl.disabled).toBeTruthy();
  });
  it('should enable field', () => {
    textAreaField.setDisable(false);
    expect(textAreaField.getDisabled()).toBeFalsy();
    expect(formControl.enabled).toBeTruthy();
  });
  it('should have required validator', () => {
    expect(textAreaField.getValidators()).not.toContain(Validators.required);
  });
  it('should not have required validator', () => {
    textAreaField = new TextField({ ...fields, required: true });
    expect(textAreaField.getValidators()).toContain(Validators.required);
  });
});
