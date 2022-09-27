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

  it('deve configurar o calendário para a data 01-01-2022', async () => {
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
});
