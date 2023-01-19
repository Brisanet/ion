import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { SafeAny } from './../utils/safe-any';
import { InputAreaComponent, IonInputAreaProps } from './input-area.component';

const sut = async (customProps?: IonInputAreaProps): Promise<void> => {
  await render(InputAreaComponent, {
    componentProperties: customProps,
    imports: [CommonModule, FormsModule],
    declarations: [],
  });
};

describe('InputAreaComponent', () => {
  it('should render input with a given placeholder', async () => {
    const placeholder = 'Search';
    await sut({ placeholder });
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('placeholder', placeholder);
  });

  it('should render input with an empty placeholder if none is passed', async () => {
    await sut();
    const input = screen.getByTestId('input-area');
    expect(input).not.toHaveAttribute('placeholder');
  });

  it('should allow letters to be inputted', async () => {
    await sut();
    const inputValue = 'input';
    userEvent.type(screen.getByTestId('input-area'), inputValue);
    expect(screen.getByTestId('input-area')).toHaveValue(inputValue);
  });

  it('should render input columns default', async () => {
    await sut();
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('cols', '30');
  });

  it('should render input colunms when changed', async () => {
    const cols = '31';
    await sut({ cols });
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('cols', cols);
  });

  it('should render input rows default', async () => {
    await sut();
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('rows', '5');
  });

  it('should render input rows when changed', async () => {
    const rows = '6';
    await sut({ rows });
    const input = screen.getByTestId('input-area');
    expect(input).toHaveAttribute('rows', rows);
  });

  it('should render input component disabled', async () => {
    await sut({ disabled: true });
    const element = screen.getByTestId('input-area');
    expect(element).toBeDisabled();
  });

  it('should emit an event output', async () => {
    const valueChangeEvent = jest.fn();
    const config = {
      value: '',
      valueChange: {
        emit: valueChangeEvent,
      } as SafeAny,
    };
    await sut(config);
    const element = screen.getByTestId('input-area');
    const input = 'input';
    userEvent.type(element, input);
    expect(valueChangeEvent).toHaveBeenLastCalledWith(input);
  });
});

// ! tests below needs improvements!!!
@Component({
  template: `
    <form [formGroup]="formGroup">
      <ion-input-area formControlName="name" key="name"></ion-input-area>
      <ion-input-area formControlName="email" key="email"></ion-input-area>
    </form>
  `,
})
class HostInputComponent {
  formGroup = new FormGroup({
    name: new FormControl(''),
    email: new FormControl({ value: '', disabled: true }),
  });
}

const sutHost = async (
  props: Partial<HostInputComponent> = {}
): Promise<Element> => {
  const { container } = await render(HostInputComponent, {
    componentProperties: props,
    declarations: [InputAreaComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  });
  return container;
};

describe('InputAreaComponent - Angular Forms', () => {
  let container;

  beforeEach(async () => {
    container = await sutHost({});
  });

  it('should render input', () => {
    expect(container.querySelector('#name')).toBeInTheDocument();
  });
  it('should change value when typing', () => {
    const value = 'Beyoncé';
    userEvent.type(container.querySelector('#name'), value);
    expect(container.querySelector('#name')).toHaveValue(value);
  });
  it('should render component disabled', () => {
    expect(container.querySelector('#email')).toBeDisabled();
  });
});
