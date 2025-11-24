import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  fireEvent,
  render,
  RenderResult,
  screen,
  within,
} from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { IonInputCounterComponent } from './input-counter.component';
import { IonButtonModule } from '../button/button.module';

const sut = async (
  customProps: Partial<IonInputCounterComponent> = {}
): Promise<RenderResult<IonInputCounterComponent>> => {
  return await render(IonInputCounterComponent, {
    componentProperties: customProps,
    imports: [CommonModule, FormsModule, IonButtonModule],
    declarations: [],
  });
};

describe('InputCounter', () => {
  let subButton: HTMLButtonElement;
  let addButton: HTMLButtonElement;

  beforeEach(async () => {
    await sut();
    subButton = within(screen.getByTestId('iconSub')).getByRole('button');
    addButton = within(screen.getByTestId('iconAdd')).getByRole('button');
  });

  it('should increment to 1 when click in decrement', async () => {
    fireEvent.click(subButton);
    expect(screen.getByTestId('input-count')).toHaveAttribute(
      'ng-reflect-model',
      '0'
    );
  });

  it('should keep 0 when click to decrement and is 0', async () => {
    fireEvent.click(addButton);
    fireEvent.click(subButton);
    expect(screen.getByTestId('input-count')).toHaveAttribute(
      'ng-reflect-model',
      '0'
    );
  });

  it('should increment to 1 when click in increment', async () => {
    fireEvent.click(addButton);
    expect(screen.getByTestId('input-count')).toHaveAttribute(
      'ng-reflect-model',
      '1'
    );
  });

  it('should render input counter', async () => {
    expect(document.getElementById('input-count'));
  });

  it('should render input counter icon sub', async () => {
    expect(document.getElementById('ion-icon-sub')).toBeTruthy();
  });

  it('should render input counter icon add', async () => {
    expect(document.getElementById('ion-icon-add')).toBeTruthy();
  });

  it('should render with md size by default', async () => {
    expect(screen.getByTestId('iconAdd')).toHaveAttribute(
      'ng-reflect-size',
      'md'
    );
  });

  it('should enter non-numeric characters and not affect the value of input-number', async () => {
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;
    const value = '111';
    userEvent.type(inputCounter, value);
    fireEvent.blur(inputCounter);
    expect(inputCounter.value).toBe(value);
    userEvent.type(inputCounter, 'abc');
    expect(inputCounter.value).toBe(value);
  });
});

describe('InputCounter / Size', () => {
  it('should render with small size', async () => {
    await sut({ inputSize: 'sm' });
    expect(screen.getByTestId('iconAdd')).toHaveAttribute(
      'ng-reflect-size',
      'sm'
    );
  });
});

describe('InputCounter / Limits', () => {
  it('should set the maximum value when a bigger number is texted', async () => {
    const maxValue = 50;
    await sut({ maxValue });
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;
    userEvent.type(inputCounter, '1588');
    fireEvent.blur(inputCounter);
    expect(inputCounter).toHaveValue(maxValue.toString());
  });

  it('should set the minimum value when a smaller number is texted', async () => {
    const minValue = 50;
    await sut({ minValue });
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;
    userEvent.clear(inputCounter);
    userEvent.type(inputCounter, '10');
    fireEvent.blur(inputCounter);
    expect(inputCounter).toHaveValue(minValue.toString());
  });

  it('should dont exceed the max value by the increase button when it is clicked', async () => {
    const maxValue = 100;
    await sut({ maxValue, count: maxValue });
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;
    const addButton = screen.getByTestId('iconAdd');
    userEvent.click(addButton.firstChild as HTMLElement);
    expect(inputCounter).toHaveValue(maxValue.toString());
  });
});

describe('InputCounter / Disabled', () => {
  it('should show the disabled state when it is setted', async () => {
    await sut({ disabled: true });
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;
    const subButton = screen.getByTestId('iconSub');
    const addButton = screen.getByTestId('iconAdd');

    expect(inputCounter).toBeDisabled();
    expect(subButton.firstChild).toBeDisabled();
    expect(addButton.firstChild).toBeDisabled();
  });
});
