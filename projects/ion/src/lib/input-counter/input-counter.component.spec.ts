import { fireEvent, render, screen, within } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';

import { IonInputCounterComponent } from './input-counter.component';

const sut = async (
  customProps: Partial<{
    inputSize: 'sm' | 'md';
    maxValue: number;
    minValue: number;
    disabled: boolean;
    count: number;
    maxDigits: number;
  }> = {},
) => {
  return await render(IonInputCounterComponent, {
    componentInputs: customProps,
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

  it('should keep 0 when click to decrement and is 0', async () => {
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;
    expect(inputCounter.value).toBe('0');
    fireEvent.click(subButton);
    expect(inputCounter.value).toBe('0');
  });

  it('should decrement to 0 when click in decrement after increment', async () => {
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;
    fireEvent.click(addButton);
    expect(inputCounter.value).toBe('1');
    fireEvent.click(subButton);
    expect(inputCounter.value).toBe('0');
  });

  it('should increment to 1 when click in increment', async () => {
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;
    fireEvent.click(addButton);
    expect(inputCounter.value).toBe('1');
  });

  it('should render input counter', () => {
    expect(screen.getByTestId('input-count')).toBeInTheDocument();
  });

  it('should render input counter icon sub', () => {
    expect(screen.getByTestId('iconSub')).toBeInTheDocument();
  });

  it('should render input counter icon add', () => {
    expect(screen.getByTestId('iconAdd')).toBeInTheDocument();
  });

  it('should render with md size by default', () => {
    const addButtonContainer = screen.getByTestId('iconAdd');
    const button = within(addButtonContainer).getByRole('button');
    expect(button).toHaveClass('ion-btn-md');
  });

  it('should enter non-numeric characters and not affect the value of input-number', async () => {
    const user = userEvent.setup();
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;

    await user.type(inputCounter, '111');
    fireEvent.blur(inputCounter);
    expect(inputCounter.value).toBe('111');

    // The oninput handler should prevent non-numeric characters
    await user.type(inputCounter, 'abc');
    // Value should remain 111 since oninput prevents non-numeric
    expect(inputCounter.value).toBe('111');
  });
});

describe('InputCounter / Size', () => {
  it('should render with small size', async () => {
    await sut({ inputSize: 'sm' });
    const addButtonContainer = screen.getByTestId('iconAdd');
    const button = within(addButtonContainer).getByRole('button');
    expect(button).toHaveClass('ion-btn-sm');
  });
});

describe('InputCounter / Limits', () => {
  it('should set the maximum value when a bigger number is texted', async () => {
    const maxValue = 50;
    await sut({ maxValue });
    const user = userEvent.setup();
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;

    await user.clear(inputCounter);
    await user.type(inputCounter, '1588');
    fireEvent.blur(inputCounter);

    expect(inputCounter.value).toBe(maxValue.toString());
  });

  it('should set the minimum value when a smaller number is texted', async () => {
    const minValue = 50;
    await sut({ minValue });
    const user = userEvent.setup();
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;

    await user.clear(inputCounter);
    await user.type(inputCounter, '10');
    fireEvent.blur(inputCounter);

    expect(inputCounter.value).toBe(minValue.toString());
  });

  it('should not exceed the max value by the increase button when it is clicked', async () => {
    const maxValue = 100;
    await sut({ maxValue, count: maxValue });
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;
    const addButtonContainer = screen.getByTestId('iconAdd');
    const addBtn = within(addButtonContainer).getByRole('button');

    expect(inputCounter.value).toBe(maxValue.toString());
    fireEvent.click(addBtn);
    expect(inputCounter.value).toBe(maxValue.toString());
  });

  it('should initialize count to minValue when minValue is set', async () => {
    const minValue = 10;
    await sut({ minValue, count: 0 });
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;

    // After effect runs, count should be set to minValue
    expect(inputCounter.value).toBe(minValue.toString());
  });
});

describe('InputCounter / Disabled', () => {
  it('should show the disabled state when it is set', async () => {
    await sut({ disabled: true });
    const inputCounter = screen.getByTestId('input-count') as HTMLInputElement;
    const subButtonContainer = screen.getByTestId('iconSub');
    const addButtonContainer = screen.getByTestId('iconAdd');
    const subBtn = within(subButtonContainer).getByRole('button');
    const addBtn = within(addButtonContainer).getByRole('button');

    expect(inputCounter).toBeDisabled();
    expect(subBtn).toBeDisabled();
    expect(addBtn).toBeDisabled();
  });
});
