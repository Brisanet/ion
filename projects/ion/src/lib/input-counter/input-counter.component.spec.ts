import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  fireEvent,
  render,
  RenderResult,
  screen,
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
  let buttons: NodeListOf<HTMLButtonElement>;
  let subButton: HTMLButtonElement;
  let addButton: HTMLButtonElement;

  beforeEach(async () => {
    await sut();
    buttons = document.querySelectorAll('button');
    subButton = buttons[0];
    addButton = buttons[1];
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
