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
import { SafeAny } from '../utils/safe-any';
import { SwitchComponent } from './switch.component';

let ionSwitch: HTMLElement;

const emitValue = {
  emit: jest.fn(),
} as SafeAny;

const sut = async (
  customProps: Partial<SwitchComponent> = {}
): Promise<HTMLElement> => {
  await render(SwitchComponent, {
    componentProperties: { ...customProps, atValueChange: emitValue },
  });
  return screen.getByTestId('ion-switch');
};

describe('SwitchComponent', () => {
  beforeEach(async () => {
    ionSwitch = await sut();
  });
  it('should render switch', async () => {
    expect(ionSwitch).toBeInTheDocument();
  });
  it('should render switch with default class', () => {
    expect(ionSwitch).toHaveClass('ion-switch');
  });
  it('should change class to active when switch is clicked', () => {
    userEvent.click(ionSwitch);
    expect(ionSwitch).toHaveClass('ion-switch--active');
  });
  it('should remove active class when switch is clicked twice', () => {
    userEvent.click(ionSwitch);
    expect(ionSwitch).toHaveClass('ion-switch--active');

    userEvent.click(ionSwitch);
    expect(ionSwitch).toHaveClass('ion-switch');
  });
  it('should emit correct value when switch is clicked', () => {
    userEvent.click(ionSwitch);
    expect(emitValue.emit).toBeCalledWith(true);

    userEvent.click(ionSwitch);
    expect(emitValue.emit).toBeCalledWith(false);
  });
});

@Component({
  template: `
    <form [formGroup]="formGroup">
      <ion-switch formControlName="name" key="name"></ion-switch>
      <ion-switch formControlName="email" key="email"></ion-switch>
    </form>
  `,
})
class HostInputComponent {
  formGroup = new FormGroup({
    name: new FormControl(false),
    email: new FormControl({ value: false, disabled: true }),
  });
}

const sutHost = async (
  props: Partial<HostInputComponent> = {}
): Promise<Element> => {
  const { container } = await render(HostInputComponent, {
    componentProperties: props,
    declarations: [SwitchComponent],
    imports: [CommonModule, FormsModule, ReactiveFormsModule],
  });
  return container;
};

describe('SwitchComponent - Angular Forms', () => {
  let container;

  beforeEach(async () => {
    container = await sutHost({});
  });

  it('should render switch', () => {
    expect(container.querySelector('#name')).toBeInTheDocument();
  });
  it('should render component disabled', () => {
    expect(container.querySelector('#email')).toBeDisabled();
  });
  it('should change to active when click', () => {
    userEvent.click(container.querySelector('#name'));
    screen.debug();
    expect(container.querySelector('#name')).toHaveClass('ion-switch--active');
  });
});
