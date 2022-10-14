import { fireEvent, render, screen } from '@testing-library/angular';
import { ButtonComponent } from '../../button/button.component';
import { IonDividerComponent } from '../../divider/divider.component';
import { DropdownComponent } from '../../dropdown/dropdown.component';
import { IonIconComponent } from '../../icon/icon.component';

import {
  DatePickerComponent,
  IonDatePickerProps,
} from './date-picker.component';

const defaultComponent: IonDatePickerProps = {
  initialDate: '2015-02-01',
  isRequired: true,
};

const sut = async (customProps: IonDatePickerProps = defaultComponent) => {
  await render(DatePickerComponent, {
    componentProperties: customProps,
    declarations: [
      ButtonComponent,
      IonIconComponent,
      DropdownComponent,
      IonDividerComponent,
    ],
  });
};

describe('DatePickerCompoenent', () => {
  beforeEach(async () => {
    await sut();
  });

  it('should check if the calendar is set to 2015-02-01', async () => {
    fireEvent.click(screen.getByTestId('field-date'));
    expect(screen.getByTestId('month-year')).toHaveTextContent(
      'February - 2015'
    );
    expect(document.getElementsByClassName('selected')[0]).toHaveTextContent(
      '1'
    );
  });

  it('should check if the calendar renders 28 days for the month of February 2015 ', async () => {
    fireEvent.click(screen.getByTestId('field-date'));
    const buttonsDay = document.getElementsByClassName('month-day');
    expect(buttonsDay.length).toBe(28);
  });

  it('should not render calendar ', async () => {
    expect(screen.queryAllByText('February - 2015')).toHaveLength(0);
  });

  it('should render calendar when focus in input', async () => {
    fireEvent.click(screen.getByTestId('field-date'));
    expect(screen.queryAllByText('February - 2015')).toHaveLength(1);
  });

  // TODO: call function here
  it.each([1, 2, 3, 4, 5, 6])(
    'should render all days in calendar',
    async (day: number) => {
      fireEvent.click(screen.getByTestId('field-date'));
      expect(screen.queryAllByText(day)).toHaveLength(1);
    }
  );

  it('should render next icon', async () => {
    fireEvent.click(screen.getByTestId('field-date'));
    expect(screen.getByTestId('btn-next-month')).toBeTruthy();
  });

  it('should render next month when click in next', async () => {
    fireEvent.click(screen.getByTestId('field-date'));

    const nextBtn = screen.getByTestId('btn-next-month');
    fireEvent.click(nextBtn);
    expect(screen.queryAllByText('March - 2015')).toHaveLength(1);
  });

  it('should render previous month when click in previous month', async () => {
    fireEvent.click(screen.getByTestId('field-date'));

    const previousMonthBtn = screen.getByTestId('btn-previous-month');
    fireEvent.click(previousMonthBtn);
    expect(screen.getByTestId('month-year')).toHaveTextContent(
      'January - 2015'
    );
  });

  it('should render previous year when click in previous year', async () => {
    fireEvent.click(screen.getByTestId('field-date'));

    const previousYearBtn = screen.getByTestId('btn-previous-year');
    expect(previousYearBtn).toBeTruthy();
    fireEvent.click(previousYearBtn);
    expect(screen.getByTestId('month-year')).toHaveTextContent(
      'February - 2014'
    );
  });

  it('should render next year when click in next year', async () => {
    fireEvent.click(screen.getByTestId('field-date'));

    const nextYearBtn = screen.getByTestId('btn-next-year');
    expect(nextYearBtn).toBeTruthy();
    fireEvent.click(nextYearBtn);
    expect(screen.getByTestId('month-year')).toHaveTextContent(
      'February - 2016'
    );
  });

  it('should render day button with a month-day class', async () => {
    fireEvent.click(screen.getByTestId('field-date'));

    expect(screen.getByText('1')).toHaveClass('current');
  });

  it('should not render day button with a current class', async () => {
    fireEvent.click(screen.getByTestId('field-date'));

    const previousMonthBtn = screen.getByTestId('btn-previous-month');
    fireEvent.click(previousMonthBtn);

    expect(screen.getAllByText('31')[0]).not.toHaveClass('current');
  });

  it('should render a day button with a class selected', async () => {
    fireEvent.click(screen.getByTestId('field-date'));

    expect(screen.getAllByText('1')[0]).toHaveClass('selected');
  });

  it('should render day with aria-label', async () => {
    fireEvent.click(screen.getByTestId('field-date'));

    const btnDay = screen.getAllByText('1')[0];
    expect(btnDay).toHaveAttribute('aria-label', '2015-02-01');
  });

  // it('should click and select a day', async () => {
  //   fireEvent.click(screen.getByTestId('field-date'));
  //   fireEvent.click(screen.getByText('16'));

  //   const input = document.getElementById('input-date');
  //   expect((input as HTMLInputElement).value).toContain('2015-02-16');
  // });
});
