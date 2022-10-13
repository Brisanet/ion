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

  it.skip('should check if the calendar is set to 2015-02-01', async () => {
    fireEvent.click(screen.getByTestId('date-container'));
    expect(screen.getByTestId('month-year')).toHaveTextContent(
      'February - 2015'
    );
    expect(document.getElementsByClassName('selected')[0]).toHaveTextContent(
      '1'
    );
  });

  it.skip('should check if the calendar renders 28 days for the month of February 2015 ', async () => {
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
});
