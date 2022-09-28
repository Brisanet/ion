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

const datePicker = new DatePickerComponent();

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

  it('deve ter o método dispatchActions', async () => {
    const datePicker = await sut({ initialDate: '2015-02-01' });
    const inputDate = document.getElementById('input-date');
    fireEvent.click(inputDate);
    const buttonDay = document.getElementsByClassName('month-day')[9];
    fireEvent.click(buttonDay);
    expect((inputDate as HTMLInputElement).value).toContain('2015-02-10');
  });

  it('deve retornar 28 dias', async () => {
    const datePicker = await sut({ initialDate: '2015-02-01' });
    const buttonsDay = document.getElementsByClassName('month-day');
    expect(buttonsDay.length).toBe(28);
  });

  it('deve verificar se a classe sunday foi aplicado quando a duas datas estão selecionadas e o dia não é a data de fim', async () => {
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

  it('deve verificar se a classe saturday foi aplicado quando a duas datas estão selecionadas e o dia não é a data de fim', async () => {
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
});

describe('Teste de botões do date-picker', () => {
  it('deve exibir o agosto-2021 ao clicar no botão de ano anterior', async () => {
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

  it('deve exibir o agosto-2022 ao clicar no botão de mês anterior', async () => {
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

  it('deve exibir o setembro-2022 ao clicar no botão de próximo mês', async () => {
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

  it('deve exibir o agosto-2023 ao clicar no botão de próximo ano ', async () => {
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
});

describe('Teste de datas do date-picker', () => {
  it('data de inicio maior que a data de fim', async () => {
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

  it('data de fim maior que a data de inicio', async () => {
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
});

describe('visibilidade do date-picker', () => {
  it('deve rendezirar o calendário quando a isDateRange for true', async () => {
    const datePicker = await sut({
      isCalendarVisible: true,
      isDateRange: true,
    });
    const calendarContainer = document.getElementById('calendar');
    expect(calendarContainer).toHaveStyle({ display: 'block' });
    const inputStartDate = document.getElementById('input-start-date');
    expect(inputStartDate).toHaveFocus();
  });
});

describe('focus do date-picker', () => {
  it('deve abir o calendário com o focus no primeiro campo ', async () => {
    const datePicker = await sut({
      isCalendarVisible: true,
    });
    const calendarContainer = document.getElementById('calendar');
    expect(calendarContainer).toHaveStyle({ display: 'block' });
    const inputDate = document.getElementById('input-date');
    expect(inputDate).toHaveFocus();
  });

  it('deve abir o calendário com o focus no primeiro campo ', async () => {
    const datePicker = await sut({
      isCalendarVisible: true,
      isDateRange: true,
    });
    const calendarContainer = document.getElementById('calendar');
    expect(calendarContainer).toHaveStyle({ display: 'block' });
    const inputStartDate = document.getElementById('input-start-date');
    expect(inputStartDate).toHaveFocus();
  });
});
