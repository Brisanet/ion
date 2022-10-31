import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import { BadgeComponent } from '../../badge/badge.component';
import { ButtonComponent } from '../../button/button.component';
import { IonDividerComponent } from '../../divider/divider.component';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { IonIconComponent } from '../../icon/icon.component';
import { SafeAny } from '../../utils/safe-any';
import { Calendar } from '../core/calendar';

import {
  DatePickerComponent,
  IonDatePickerProps,
} from './date-picker.component';

const events = jest.fn();

const defaultComponent: IonDatePickerProps = {
  isRequired: true,
  events: {
    emit: events,
  } as SafeAny,
};

const sut = async (
  customProps: IonDatePickerProps = defaultComponent
): Promise<void> => {
  await render(DatePickerComponent, {
    componentProperties: customProps,
    declarations: [
      ButtonComponent,
      IonIconComponent,
      DropdownComponent,
      IonDividerComponent,
      BadgeComponent,
    ],
    imports: [FormsModule],
  });
};

describe('DatePickerCompoenent', () => {
  beforeEach(async () => {
    events.mockClear();

    await sut({ ...defaultComponent, initialDate: '2015-02-01' });
    fireEvent.click(screen.getByTestId('field-date'));
  });

  it('should check if the calendar is set to 2015-02-01', async () => {
    expect(screen.getByTestId('month-year')).toHaveTextContent(
      'February - 2015'
    );
    expect(document.getElementsByClassName('selected')[0]).toHaveTextContent(
      '1'
    );
  });

  it('should check if the calendar renders 28 days for the month of February 2015 ', async () => {
    const buttonsDay = document.getElementsByClassName('month-day');
    expect(buttonsDay.length).toBe(28);
  });

  it('should render calendar when focus in input', async () => {
    expect(screen.queryAllByText('February - 2015')).toHaveLength(1);
  });

  // TODO: call function here
  it.each([1, 2, 3, 4, 5, 6])(
    'should render all days in calendar',
    async (day: number) => {
      expect(screen.queryAllByText(day)).toHaveLength(1);
    }
  );

  it('should close the calendar when clicking outside of it', async () => {
    const body = document.body;
    const button = document.createElement('button');
    button.setAttribute('id', 'button');
    button.innerHTML = 'Button';
    body.append(button);

    fireEvent.mouseUp(document.getElementById('button'));
    expect(screen.queryAllByText('February - 2015')).not.toHaveLength(1);
  });

  it('should render next month when click in next', async () => {
    const nextBtn = screen.getByTestId('btn-next-month');
    fireEvent.click(nextBtn);
    expect(screen.queryAllByText('March - 2015')).toHaveLength(1);
  });

  it('should render previous month when click in previous month', async () => {
    const previousMonthBtn = screen.getByTestId('btn-previous-month');
    fireEvent.click(previousMonthBtn);
    expect(screen.getByTestId('month-year')).toHaveTextContent(
      'January - 2015'
    );
  });

  it('should render previous year when click in previous year', async () => {
    const previousYearBtn = screen.getByTestId('btn-previous-year');
    expect(previousYearBtn).toBeTruthy();
    fireEvent.click(previousYearBtn);
    expect(screen.getByTestId('month-year')).toHaveTextContent(
      'February - 2014'
    );
  });

  it('should render next year when click in next year', async () => {
    const nextYearBtn = screen.getByTestId('btn-next-year');
    expect(nextYearBtn).toBeTruthy();
    fireEvent.click(nextYearBtn);
    expect(screen.getByTestId('month-year')).toHaveTextContent(
      'February - 2016'
    );
  });

  it('should render day button with a month-day class', async () => {
    expect(screen.getByText('1')).toHaveClass('current');
  });

  it('should not render day button with a current class', async () => {
    const previousMonthBtn = screen.getByTestId('btn-previous-month');
    fireEvent.click(previousMonthBtn);

    expect(screen.getAllByText('31')[0]).not.toHaveClass('current');
  });

  it('should render a day button with a class selected', async () => {
    expect(screen.getAllByText('1')[0]).toHaveClass('selected');
  });

  it('should render day with aria-label', async () => {
    const btnDay = screen.getAllByText('1')[0];
    expect(btnDay).toHaveAttribute('aria-label', '2015-02-01');
  });

  it.each([
    'btn-previous-year',
    'btn-previous-month',
    'btn-next-month',
    'btn-next-year',
  ])('should render action %s in calendar', async (action: string) => {
    expect(screen.getByTestId(action)).toBeInTheDocument();
  });

  it('should select a day of month', async () => {
    const dateToSelect = '2015-02-13';
    const dayToSelect = screen.getByTestId(dateToSelect);

    fireEvent.click(dayToSelect);
    fireEvent.click(screen.getByTestId('field-date'));

    expect(screen.getByTestId(dateToSelect)).toHaveClass('selected');
  });

  it('should close calendar when select a day of month', async () => {
    const dateToSelect = '2015-02-13';
    const dayToSelect = screen.getByTestId(dateToSelect);

    fireEvent.click(dayToSelect);
    expect(screen.queryAllByTestId(dateToSelect)).toHaveLength(0);
  });

  it('should close calendar when select a day of month', async () => {
    const dateToSelect = '2015-02-13';
    const dayToSelect = screen.getByTestId(dateToSelect);

    fireEvent.click(dayToSelect);
    expect(events).toHaveBeenCalledWith({ date: dateToSelect });
  });

  it('should render icon close when be a date selected', async () => {
    const dateToSelect = '2015-02-13';
    const dayToSelect = screen.getByTestId(dateToSelect);

    fireEvent.click(dayToSelect);
    expect(document.getElementById('ion-icon-close')).toBeInTheDocument();
  });

  it('should show input with date selected', async () => {
    const dateToSelect = '2015-02-13';
    const dayToSelect = screen.getByTestId(dateToSelect);

    fireEvent.click(dayToSelect);

    expect(screen.getByTestId('input-date')).toHaveAttribute(
      'ng-reflect-model',
      dateToSelect
    );
  });

  it('should clear input when select in close', async () => {
    const dateToSelect = '2015-02-13';
    const dayToSelect = screen.getByTestId(dateToSelect);

    fireEvent.click(dayToSelect);
    fireEvent.click(document.getElementById('ion-icon-close'));

    expect(screen.getByTestId('input-date')).not.toHaveAttribute(
      'ng-reflect-model',
      dateToSelect
    );
  });
});

describe('visibility calendar', () => {
  it('should not render calendar ', async () => {
    await sut();
    expect(screen.queryAllByText('February - 2015')).toHaveLength(0);
  });
});

describe('Custom dates', () => {
  it('should render month with 6 weeks', async () => {
    await sut({
      initialDate: '2018-09-01',
    });

    fireEvent.click(screen.getByTestId('field-date'));
    const days = document.getElementsByClassName('month-day');
    expect(days).toHaveLength(42);
  });

  it('should render today date when not informed', async () => {
    await sut();
    fireEvent.click(screen.getByTestId('field-date'));

    const today = new Date();
    const calendar = new Calendar(today.getFullYear(), today.getMonth() + 1);

    const months = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];

    expect(screen.getByTestId('month-year')).toHaveTextContent(
      `${months[calendar.monthNumber - 1]} - ${calendar.year}`
    );
  });
});
