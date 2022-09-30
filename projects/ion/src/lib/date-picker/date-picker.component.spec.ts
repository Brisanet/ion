/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/angular';
import {
  DatePickerComponent,
  IonDatePickerProps,
} from './date-picker.component';
import { ButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import { ChipComponent } from '../chip/chip.component';
import { BadgeComponent } from '../badge/badge.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { IonDividerComponent } from '../divider/divider.component';

const sut = async (
  customProps: IonDatePickerProps = {}
): Promise<HTMLElement> => {
  await render(DatePickerComponent, {
    componentProperties: customProps,
    declarations: [
      ButtonComponent,
      IonIconComponent,
      ChipComponent,
      BadgeComponent,
      DropdownComponent,
      IonDividerComponent,
    ],
  });
  return document.getElementById('date-container');
};

describe('DatePickerComponent', () => {
  it('should render Calendar', async () => {
    const calendar = await sut({});
    expect(calendar).toBeTruthy();
  });

  it('should check if the calendar is set to 2022-01-01', async () => {
    const calendar2 = await sut({ initialDate: '2022-01-01' });
    fireEvent.click(calendar2);
    expect(document.getElementById('calendar-dropdown'));
    expect(document.getElementById('month-year')).toHaveTextContent(
      'January - 2022'
    );
    expect(document.getElementsByClassName('selected')[0]).toHaveTextContent(
      '1'
    );
  });

  it('should check if the calendar renders 28 days for the month of February 2015 has 28 days', async () => {
    const datePicker = await sut({ initialDate: '2015-02-01' });
    const buttonsDay = document.getElementsByClassName('month-day');
    expect(buttonsDay.length).toBe(28);
  });

  it('must check if the sunday class has been applied', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-09-01',
    });
    const inputDate = document.getElementById('input-start-date');
    fireEvent.click(inputDate);
    const buttonsDay = document.getElementsByClassName('month-day');
    fireEvent.click(buttonsDay[8]);
    fireEvent.click(buttonsDay[14]);
    const buttonDay = document.getElementsByClassName('sunday')[0];
    expect(buttonDay).toHaveClass('sunday');
  });

  it('must check if the saturday class has been applied', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-09-01',
    });
    const inputDate = document.getElementById('input-start-date');
    fireEvent.click(inputDate);
    const buttonsDay = document.getElementsByClassName('month-day');
    fireEvent.click(buttonsDay[8]);
    fireEvent.click(buttonsDay[14]);
    const buttonDay = document.getElementsByClassName('saturday')[0];
    expect(buttonDay).toHaveClass('saturday');
  });

  it('should display August-2021 when clicking previous year button', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-08-01',
    });
    const inputDate = document.getElementById('input-start-date');
    fireEvent.click(inputDate);
    const previousMonth = document.getElementsByClassName('ion-btn-ghost')[0];
    fireEvent.click(previousMonth);
    expect(document.getElementById('month-year')).toHaveTextContent(
      'August - 2021'
    );
  });

  it('should display August-2022 when clicking previous month button', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-09-01',
    });
    const inputDate = document.getElementById('input-start-date');
    fireEvent.click(inputDate);
    const previousMonth = document.getElementsByClassName('ion-btn-ghost')[1];
    fireEvent.click(previousMonth);
    expect(document.getElementById('month-year')).toHaveTextContent(
      'August - 2022'
    );
  });

  it('should display September-2022 when clicking next month button', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-08-01',
    });
    const inputDate = document.getElementById('input-start-date');
    fireEvent.click(inputDate);
    const nextMonth = document.getElementsByClassName('ion-btn-ghost')[2];
    fireEvent.click(nextMonth);
    expect(document.getElementById('month-year')).toHaveTextContent(
      'September - 2022'
    );
  });

  it('should display August-2023 when clicking next year button', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-08-01',
    });
    const inputDate = document.getElementById('input-start-date');
    fireEvent.click(inputDate);
    const previousMonth = document.getElementsByClassName('ion-btn-ghost')[3];
    fireEvent.click(previousMonth);
    expect(document.getElementById('month-year')).toHaveTextContent(
      'August - 2023'
    );
  });

  it('should clear start input when start date is greater than end date', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-08-01',
    });
    const inputStartDate = document.getElementById('input-start-date');
    fireEvent.click(inputStartDate);

    const buttonsDay = document.getElementsByClassName('month-day');
    fireEvent.click(buttonsDay[8]);
    fireEvent.click(buttonsDay[10]);

    expect((inputStartDate as HTMLInputElement).value).toContain('2022-08-08');
    fireEvent.click(inputStartDate);
    fireEvent.click(buttonsDay[15]);
    expect((inputStartDate as HTMLInputElement).value).toContain('');
  });

  it('should clear the final input when the end date is less than the start date', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-08-01',
    });
    const inputEndDate = document.getElementById('input-end-date');
    fireEvent.click(inputEndDate);

    const buttonsDay = document.getElementsByClassName('month-day');
    fireEvent.click(buttonsDay[8]);
    fireEvent.click(buttonsDay[5]);

    fireEvent.click(inputEndDate);
    expect((inputEndDate as HTMLInputElement).value).toContain('2022-08-08');
    fireEvent.click(buttonsDay[1]);
    expect((inputEndDate as HTMLInputElement).value).toContain('');
  });

  it('should show the calendar when isCalendarVisible attribute is true', async () => {
    const datePicker = await sut({
      isCalendarVisible: true,
      isDateRange: true,
    });
    const calendarContainer = document.getElementById('calendar');
    expect(calendarContainer).toHaveStyle({ display: 'block' });
    const inputStartDate = document.getElementById('input-start-date');
    expect(inputStartDate).toHaveFocus();
  });

  it('should set focus on input when opening calendar', async () => {
    const datePicker = await sut({
      isCalendarVisible: true,
    });
    const calendarContainer = document.getElementById('calendar');
    expect(calendarContainer).toHaveStyle({ display: 'block' });
    const inputDate = document.getElementById('input-date');
    expect(inputDate).toHaveFocus();
  });

  it('should set focus on first input when opening calendar in range mode', async () => {
    const datePicker = await sut({
      isCalendarVisible: true,
      isDateRange: true,
    });
    const calendarContainer = document.getElementById('calendar');
    expect(calendarContainer).toHaveStyle({ display: 'block' });
    const inputStartDate = document.getElementById('input-start-date');
    expect(inputStartDate).toHaveFocus();
  });

  it('should show close icon when hovering over input when there is a date', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-08-01',
    });
    const inputEndDate = document.getElementById('input-end-date');
    fireEvent.click(inputEndDate);

    const buttonsDay = document.getElementsByClassName('month-day');
    fireEvent.click(buttonsDay[8]);
    fireEvent.click(buttonsDay[5]);
    fireEvent.mouseOver(inputEndDate);
    expect(document.getElementById('icon')).toHaveAttribute('type', 'close');
  });

  it('should clear the dates in the inputs by clicking the close icon', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-08-01',
    });
    const inputStartDate = document.getElementById('input-end-date');
    const inputEndDate = document.getElementById('input-end-date');
    fireEvent.click(inputEndDate);

    const buttonsDay = document.getElementsByClassName('month-day');
    fireEvent.click(buttonsDay[8]);
    fireEvent.click(buttonsDay[5]);
    const icon = document.getElementsByClassName('icons')[0];
    fireEvent.mouseOver(inputEndDate);
    fireEvent.click(icon);
    expect((inputStartDate as HTMLInputElement).value).toContain('');
    expect((inputEndDate as HTMLInputElement).value).toContain('');
  });

  it('shpuld select a date range of 7 days when clicking on the 7 day chip', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-08-01',
    });
    const inputStartDate = document.getElementById('input-start-date');
    const inputEndDate = document.getElementById('input-end-date');
    fireEvent.click(inputStartDate);

    const chipSevenDays = screen.findByRole('button', { name: '7 dias' });
    fireEvent.click(await chipSevenDays);

    expect((inputStartDate as HTMLInputElement).value).toContain('2022-08-01');
    expect((inputEndDate as HTMLInputElement).value).toContain('2022-08-07');
  });

  it('should clear date entries when double click on same chip', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-08-01',
    });
    const inputStartDate = document.getElementById('input-start-date');
    const inputEndDate = document.getElementById('input-end-date');
    fireEvent.click(inputStartDate);

    const chipSevenDays = screen.findByRole('button', { name: '7 dias' });
    fireEvent.click(await chipSevenDays);

    expect((inputStartDate as HTMLInputElement).value).toContain('2022-08-01');
    expect((inputEndDate as HTMLInputElement).value).toContain('2022-08-07');

    fireEvent.click(await chipSevenDays);

    expect((inputStartDate as HTMLInputElement).value).toContain('');
    expect((inputEndDate as HTMLInputElement).value).toContain('');
  });

  it('shpuld select a date range of 15 days when clicking on the 15 day chip', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-08-01',
    });
    const inputStartDate = document.getElementById('input-start-date');
    const inputEndDate = document.getElementById('input-end-date');
    fireEvent.click(inputStartDate);

    const chipFifteenDays = screen.findByRole('button', { name: '15 dias' });
    fireEvent.click(await chipFifteenDays);

    expect((inputStartDate as HTMLInputElement).value).toContain('2022-08-01');
    expect((inputEndDate as HTMLInputElement).value).toContain('2022-08-15');
  });

  it('shpuld select a date range of 21 days when clicking on the 21 day chip', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-08-01',
    });
    const inputStartDate = document.getElementById('input-start-date');
    const inputEndDate = document.getElementById('input-end-date');
    fireEvent.click(inputStartDate);

    const chipTwentyOneDays = screen.findByRole('button', { name: '21 dias' });
    fireEvent.click(await chipTwentyOneDays);

    expect((inputStartDate as HTMLInputElement).value).toContain('2022-08-01');
    expect((inputEndDate as HTMLInputElement).value).toContain('2022-08-21');
  });

  it('should emit an event when selecting a date', async () => {
    const clickEvent = jest.fn();
    const datePicker = await sut({
      initialDate: '2022-08-01',
      date: { clickEvent } as any,
    });

    const inputDate = document.getElementById('input-date');
    fireEvent.click(inputDate);
    const buttonDay = document.getElementsByClassName('month-day')[0];
    fireEvent.click(buttonDay);
    expect(clickEvent).not.toHaveBeenCalled();
  });

  it('should emit an event when clicking the ready button', async () => {
    const clickEvent = jest.fn();
    const datePicker = await sut({
      initialDate: '2022-08-01',
      isDateRange: true,
      date: { clickEvent } as any,
    });

    const inputStartDate = document.getElementById('input-start-date');
    fireEvent.click(inputStartDate);
    const buttonsDay = document.getElementsByClassName('month-day');
    fireEvent.click(buttonsDay[0]);
    fireEvent.click(buttonsDay[5]);

    const buttonConfirm = screen.getByRole('button', { name: 'Pronto' });
    expect(buttonConfirm.getAttribute('disabled')).toContain('');
    fireEvent.click(buttonConfirm);
    expect(clickEvent).not.toHaveBeenCalled();
  });
});
