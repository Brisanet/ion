import { EventEmitter } from '@angular/core';
import { fireEvent, render, screen } from '@testing-library/angular';
import { ButtonModule } from '../../button/button.module';
import { TooltipComponent } from '../../tooltip/tooltip.component';
import { SafeAny } from '../../utils/safe-any';
import {
  ControlPickerComponentProps,
  ControlPickerComponent,
  ControlEvent,
} from './control-picker.component';

const events = jest.fn();

const defaultComponent: ControlPickerComponentProps = {
  month: 'janeiro',
  year: '2022',
  controlPickerEvent: {
    emit: events,
  } as SafeAny,
};

const sut = async (
  customProps: ControlPickerComponentProps = defaultComponent
): Promise<void> => {
  await render(ControlPickerComponent, {
    componentProperties: customProps,
    declarations: [TooltipComponent],
    imports: [ButtonModule],
  });
};

describe('ControlPickerComponent', () => {
  it('should emit an event on clicking the previous year button', async () => {
    const onPreviousYear = new EventEmitter<ControlEvent>();
    await sut({ ...defaultComponent, controlPickerEvent: onPreviousYear });
    const btnPreviousYear = screen.getByTestId('btn-previous-year');
    jest.spyOn(onPreviousYear, 'emit');
    fireEvent.click(btnPreviousYear);
    expect(onPreviousYear.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit an event on clicking the previous month button', async () => {
    const onPreviousMonth = new EventEmitter<ControlEvent>();
    await sut({ ...defaultComponent, controlPickerEvent: onPreviousMonth });
    const btnPreviousMonth = screen.getByTestId('btn-previous-month');
    jest.spyOn(onPreviousMonth, 'emit');
    fireEvent.click(btnPreviousMonth);
    expect(onPreviousMonth.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit an event on clicking the next month button', async () => {
    const onNextMonth = new EventEmitter<ControlEvent>();
    await sut({ ...defaultComponent, controlPickerEvent: onNextMonth });
    const btnNextMonth = screen.getByTestId('btn-next-month');
    jest.spyOn(onNextMonth, 'emit');
    fireEvent.click(btnNextMonth);
    expect(onNextMonth.emit).toHaveBeenCalledTimes(1);
  });

  it('should emit an event on clicking the next year button', async () => {
    const onNextYear = new EventEmitter<ControlEvent>();
    await sut({ ...defaultComponent, controlPickerEvent: onNextYear });
    const btnNextYear = screen.getByTestId('btn-next-year');
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
    const button = screen.getByTestId('btn-month-2');
    fireEvent.click(button);
    expect(onChangeMonth.emit).toHaveBeenCalledTimes(1);
  });
});
