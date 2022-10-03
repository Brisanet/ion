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
import { calendar } from '../icon/svgs/iconsText';

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
const dtp = async (params: IonDatePickerProps) => await sut({ ...params });

describe('DatePickerComponent', () => {
  it('should check if the calendar is set to 2015-02-01', async () => {
    const datePicker = await sut({
      initialDate: '2015-02-01',
      isDateRange: true,
    });
    fireEvent.click(datePicker);
    expect(document.getElementById('calendar-dropdown'));
    expect(document.getElementById('month-year')).toHaveTextContent(
      'February - 2015'
    );
    expect(document.getElementsByClassName('selected')[0]).toHaveTextContent(
      '1'
    );
  });

  it('should check if the calendar renders 28 days for the month of February 2015 has 28 days', async () => {
    const buttonsDay = document.getElementsByClassName('month-day');
    expect(buttonsDay.length).toBe(28);
  });

  it('must check if the sunday class has been applied', async () => {
    const inputStartDate = document.getElementById('input-start-date');
    fireEvent.click(inputStartDate);
    const buttonsDay = document.getElementsByClassName('month-day');
    fireEvent.click(buttonsDay[0]);
    fireEvent.click(buttonsDay[14]);
    expect(buttonsDay[0]).toHaveClass('sunday');
  });

  it('must check if the saturday class has been applied', async () => {
    const buttonsDay = document.getElementsByClassName('month-day');
    expect(buttonsDay[6]).toHaveClass('saturday');
  });

  it('should render month and year correctly when clicking control buttons', async () => {
    const datePicker = await sut({
      initialDate: '2015-02-01',
      isDateRange: true,
    });
    fireEvent.click(datePicker);
    const monthYear = document.getElementById('month-year');
    const buttons = document.getElementsByClassName('ion-btn-ghost');
    fireEvent.click(buttons[0]);
    expect(monthYear).toHaveTextContent('February - 2014');

    fireEvent.click(buttons[1]);
    expect(monthYear).toHaveTextContent('January - 2014');

    fireEvent.click(buttons[2]);
    expect(monthYear).toHaveTextContent('February - 2014');

    fireEvent.click(buttons[3]);
    expect(monthYear).toHaveTextContent('February - 2015');
  });

  it('should clear start input when start date is greater than end date', async () => {
    const datePicker = await sut({
      isDateRange: true,
      initialDate: '2022-08-01',
    });
    fireEvent.click(datePicker);
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
    const buttonsDay = document.getElementsByClassName('month-day');
    fireEvent.click(inputEndDate);

    fireEvent.click(buttonsDay[8]);
    fireEvent.click(buttonsDay[5]);

    fireEvent.click(inputEndDate);
    expect((inputEndDate as HTMLInputElement).value).toContain('2022-08-08');
    fireEvent.click(buttonsDay[1]);
    expect((inputEndDate as HTMLInputElement).value).toContain('');
  });

  it('should show the calendar when isCalendarVisible attribute is true', async () => {
    await dtp({ isCalendarVisible: true, isDateRange: true });
    const calendarContainer = document.getElementById('calendar');
    expect(calendarContainer).toHaveStyle({ display: 'block' });
  });

  it('should set focus on input when opening calendar', async () => {
    await dtp({ isCalendarVisible: true });
    const inputDate = document.getElementById('input-date');
    expect(inputDate).toHaveFocus();
  });

  it('should set focus on first input when opening calendar in range mode', async () => {
    await dtp({ isCalendarVisible: true, isDateRange: true });
    const inputStartDate = document.getElementById('input-start-date');
    expect(inputStartDate).toHaveFocus();
  });

  it('should show close icon when hovering over input when there is a date', async () => {
    await dtp({ initialDate: '2022-08-01', isDateRange: true });
    const inputEndDate = document.getElementById('input-end-date');
    fireEvent.click(inputEndDate);
    const buttonsDay = document.getElementsByClassName('month-day');
    fireEvent.click(buttonsDay[8]);
    fireEvent.mouseOver(inputEndDate);
    expect(document.getElementById('icon')).toHaveAttribute('type', 'close');
  });

  it('should clear the dates in the inputs by clicking the close icon', async () => {
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

  it('should select a date range of 7 days when clicking on the 7 day chip', async () => {
    await dtp({ initialDate: '2022-08-01', isDateRange: true });
    const inputStartDate = document.getElementById('input-start-date');
    const inputEndDate = document.getElementById('input-end-date');
    fireEvent.click(inputStartDate);
    const chipSevenDays = screen.findByRole('button', { name: '7 dias' });
    fireEvent.click(await chipSevenDays);
    expect((inputStartDate as HTMLInputElement).value).toContain('2022-08-01');
    expect((inputEndDate as HTMLInputElement).value).toContain('2022-08-07');
  });

  it('should clear date entries when double click on same chip', async () => {
    await dtp({ initialDate: '2022-08-01', isDateRange: true });
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
    await dtp({ initialDate: '2022-08-01', isDateRange: true });
    const inputStartDate = document.getElementById('input-start-date');
    const inputEndDate = document.getElementById('input-end-date');
    fireEvent.click(inputStartDate);
    const chipFifteenDays = screen.findByRole('button', { name: '15 dias' });
    fireEvent.click(await chipFifteenDays);
    expect((inputStartDate as HTMLInputElement).value).toContain('2022-08-01');
    expect((inputEndDate as HTMLInputElement).value).toContain('2022-08-15');
  });

  it('shpuld select a date range of 21 days when clicking on the 21 day chip', async () => {
    await dtp({ initialDate: '2022-08-01', isDateRange: true });
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
    await dtp({ initialDate: '2022-08-01', date: { clickEvent } as any });
    const inputDate = document.getElementById('input-date');
    fireEvent.click(inputDate);
    const buttonDay = document.getElementsByClassName('month-day')[0];
    fireEvent.click(buttonDay);
    expect(clickEvent).not.toHaveBeenCalled();
  });

  it('should emit an event when clicking the ready button', async () => {
    const clickEvent = jest.fn();
    await dtp({
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
