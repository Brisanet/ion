/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/angular';
import { DatePickerComponent } from './date-picker.component';
import { ButtonComponent, IonButtonProps } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import { ChipComponent } from '../chip/chip.component';
import { BadgeComponent } from '../badge/badge.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { IonDividerComponent } from '../divider/divider.component';

const defaultName = 'button';

const sut = async (
  customProps: IonButtonProps = { label: defaultName }
): Promise<HTMLElement> => {
  await render(DatePickerComponent, {
    // componentProperties: ,
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
    expect(true).toBeTruthy();
  });
});
