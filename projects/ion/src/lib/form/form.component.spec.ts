import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { render, RenderResult, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IonIconModule } from '../icon/icon.module';
import { IonInputAreaModule } from '../input-area/input-area.module';
import { IonInputModule } from '../input/input.module';
import { IonSwitchModule } from '../switch/switch.module';
import { TextField } from './core/textField';
import { FormComponent, FormComponentProps } from './form.component';

const textFieldConfig = {
  key: 'title',
  label: 'Título',
  placeholder: 'Insira um título',
  required: true,
};

const textField = new TextField(textFieldConfig);

const sut = async (
  props: FormComponentProps = { fields: {} }
): Promise<RenderResult<FormComponent, FormComponent>> => {
  return await render(FormComponent, {
    componentProperties: props,
    imports: [
      FormsModule,
      ReactiveFormsModule,
      IonInputModule,
      IonInputAreaModule,
      IonSwitchModule,
      IonIconModule,
    ],
  });
};

describe('IonForm', () => {
  describe('with text field', () => {
    let input;
    let form;
    let detectChanges;
    let formGroup: FormGroup;

    beforeEach(async () => {
      formGroup = new FormGroup({});
      const { detectChanges: changes } = await sut({
        fields: { title: textField },
        formGroup,
      });
      detectChanges = changes;
      input = screen.getByRole('textbox', {
        name: new RegExp(textFieldConfig.label, 'i'),
      });
      form = screen.getByRole('form');
    });

    it('should render input text', () => {
      expect(input).toBeInTheDocument();
    });
    it('should render correct placeholder', () => {
      expect(input).toHaveAttribute('placeholder', textFieldConfig.placeholder);
    });
    it('should change value when typing', () => {
      const value = 'Renaissance';
      userEvent.type(input, value);
      expect(input).toHaveValue(value);
      expect(form).toHaveFormValues({
        [textFieldConfig.key]: value,
      });
    });
    it('should disable field', () => {
      textField.setDisable(true);
      expect(formGroup.controls[textFieldConfig.key].disabled).toBeTruthy();
      detectChanges();
      expect(input).toHaveAttribute('ng-reflect-is-disabled', 'true');
    });
    it('should enable field', () => {
      textField.setDisable(true);
      textField.setDisable(false);
      expect(formGroup.controls[textFieldConfig.key].disabled).toBeFalsy();
      detectChanges();
      expect(input).toHaveAttribute('ng-reflect-is-disabled', 'false');
    });
  });
});
