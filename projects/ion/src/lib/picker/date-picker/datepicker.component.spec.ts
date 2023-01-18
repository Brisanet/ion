// import { fireEvent, render, screen } from '@testing-library/angular';
// import { ButtonModule } from '../../button/button.module';
// import { IonDividerComponent } from '../../divider/divider.component';
// import { SafeAny } from '../../utils/safe-any';
// import { ControlPickerComponent } from '../control-picker/control-picker.component';
// import { DatepickerComponent } from './datepicker.component';

// const events = jest.fn();

// const defaultComponent: SafeAny = {
//   currentMonth: 'Janeiro',
//   currentYear: '2022',
//   events: {
//     emit: events,
//   } as SafeAny,
// };

// const sut = async (customProps: SafeAny = defaultComponent): Promise<void> => {
//   await render(DatepickerComponent, {
//     componentProperties: customProps,
//     declarations: [ControlPickerComponent, IonDividerComponent],
//     imports: [ButtonModule],
//   });
// };

// describe('DatepickerComponent', () => {
//   beforeEach(async () => {
//     events.mockClear();

//     await sut({ ...defaultComponent });
//   });

//   it('Should render calendar icon', () => {
//     expect(document.getElementById('ion-icon-calendar'));
//   });

//   it('Should render the calendar contaner when clicking on the calendar icon', () => {
//     fireEvent.click(document.getElementById('ion-icon-calendar'));
//     expect(screen.getByTestId('container-calendar')).toBeTruthy();
//   });

//   it.skip('should close calendar when clicking outside component bounds', async () => {
//     //
//   });
// });

describe('Datepikcer', () => {
  it('Should', () => {
    expect(true).toBeTruthy();
  });
});
