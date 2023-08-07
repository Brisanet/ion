import { IonButtonModule } from './../../button/button.module';
import { IonDividerModule } from './../../divider/divider.module';
import { IonTooltipModule } from './../../tooltip/tooltip.module';
import { EventEmitter } from '@angular/core';
import { fireEvent, render, screen, within } from '@testing-library/angular';
import { SafeAny } from '../../utils/safe-any';
import {
  IonControlPickerComponentProps,
  IonControlPickerComponent,
  ControlEvent,
} from './control-picker.component';

const events = jest.fn();

const defaultComponent: IonControlPickerComponentProps = {
  month: 'Janeiro',
  year: '2022',
  controlPickerEvent: {
    emit: events,
  } as SafeAny,
};

const sut = async (
  customProps: IonControlPickerComponentProps = defaultComponent
): Promise<void> => {
  await render(IonControlPickerComponent, {
    componentProperties: customProps,
    declarations: [],
    imports: [IonButtonModule, IonTooltipModule, IonDividerModule],
  });
};

describe('IonControlPickerComponent', () => {
  it('should emit an event on clicking the previous year button', async () => {
    const onPreviousYear = new EventEmitter<ControlEvent>();
    await sut({ ...defaultComponent, controlPickerEvent: onPreviousYear });
    const btnPreviousYear = within(
      screen.getByTestId('btn-previous-year')
    ).getByRole('button');

    jest.spyOn(onPreviousYear, 'emit');
    fireEvent.click(btnPreviousYear);
    expect(onPreviousYear.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit an event on clicking the previous month button', async () => {
    const onPreviousMonth = new EventEmitter<ControlEvent>();
    await sut({ ...defaultComponent, controlPickerEvent: onPreviousMonth });
    const btnPreviousMonth = within(
      screen.getByTestId('btn-previous-month')
    ).getByRole('button');

    jest.spyOn(onPreviousMonth, 'emit');
    fireEvent.click(btnPreviousMonth);
    expect(onPreviousMonth.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit an event on clicking the next month button', async () => {
    const onNextMonth = new EventEmitter<ControlEvent>();
    await sut({ ...defaultComponent, controlPickerEvent: onNextMonth });
    const btnNextMonth = within(screen.getByTestId('btn-next-month')).getByRole(
      'button'
    );

    jest.spyOn(onNextMonth, 'emit');
    fireEvent.click(btnNextMonth);
    expect(onNextMonth.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit an event on clicking the next year button', async () => {
    const onNextYear = new EventEmitter<ControlEvent>();
    await sut({ ...defaultComponent, controlPickerEvent: onNextYear });
    const btnNextYear = within(screen.getByTestId('btn-next-year')).getByRole(
      'button'
    );

    jest.spyOn(onNextYear, 'emit');
    fireEvent.click(btnNextYear);
    expect(onNextYear.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit an event on clicking the month button', async () => {
    const onChangeMonth = new EventEmitter<ControlEvent>();
    await sut({ ...defaultComponent, controlPickerEvent: onChangeMonth });
    const labelMonth = screen.getByTestId('label-month');
    jest.spyOn(onChangeMonth, 'emit');
    fireEvent.click(labelMonth);
    const button = within(screen.getByTestId('btn-month-2')).getByRole(
      'button'
    );
    fireEvent.click(button);
    expect(onChangeMonth.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit an event on clicking the year button', async () => {
    const onChangeYear = new EventEmitter<ControlEvent>();
    await sut({ ...defaultComponent, controlPickerEvent: onChangeYear });
    const labelYear = screen.getByTestId('label-year');
    jest.spyOn(onChangeYear, 'emit');
    fireEvent.click(labelYear);
    const button = within(screen.getByTestId('btn-year-2025')).getByRole(
      'button'
    );
    fireEvent.click(button);
    expect(onChangeYear.emit).toHaveBeenCalledTimes(1);
  });

  it('should show previous years when clicking on previous years button', async () => {
    await sut({ ...defaultComponent });
    const labelYear = screen.getByTestId('label-year');
    fireEvent.click(labelYear);
    const button = screen.getByTestId('btn-show-previous-years');
    fireEvent.click(within(button).getByRole('button'));
    const button2015 = screen.getByTestId('btn-year-2015');
    expect(button2015.textContent).toBe('2015');
  });

  it('should show previous years when clicking on previous years button', async () => {
    await sut({ ...defaultComponent });
    const labelYear = screen.getByTestId('label-year');
    fireEvent.click(labelYear);
    const button = screen.getByTestId('btn-show-next-years');
    fireEvent.click(within(button).getByRole('button'));
    const button2029 = screen.getByTestId('btn-year-2029');
    expect(button2029.textContent).toBe('2029');
  });
});
