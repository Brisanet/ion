
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import {
  FINAL_RANGE,
  INITIAL_RANGE,
  TOTAL_DAYS,
  arrangeDates,
  getFormattedDate,
  getInitialDate,
  isBetweenRange,
  isSameDay,
  isToday,
} from '../../utils/date-picker';
import {
  Calendar,
  CalendarControlActions,
  Day,
  IonDatePickerCalendarComponentProps,
  UpdateLabelCalendar,
} from '../../core';

@Component({
  selector: 'date-picker-calendar',
  standalone: true,
  imports: [],
  templateUrl: './date-picker-calendar.component.html',
  styleUrls: ['./date-picker-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonDatePickerCalendarComponent implements OnInit {
  currentDate = input<IonDatePickerCalendarComponentProps['currentDate']>([]);
  lang = input<IonDatePickerCalendarComponentProps['lang']>('default');
  goToMonthInCalendar = input<string | undefined>();
  goToYearInCalendar = input<string | undefined>();
  calendarControlAction = input<{ action: CalendarControlActions } | undefined>(
    undefined,
  );
  selectedDaysInput = input<Day[]>([]);
  rangePicker = input<boolean>(false);
  disabledDate = input<IonDatePickerCalendarComponentProps['disabledDate']>();

  events = output<Day[]>();
  updateLabelCalendar = output<UpdateLabelCalendar>();

  days = signal<Day[]>([]);
  calendar = signal<Calendar | null>(null);
  selectedDaysState = signal<Day[]>([]);
  finalRange = true;

  private readonly calendarAction = {
    previousYear: (): void => this.previousYear(),
    previousMonth: (): void => this.previousMonth(),
    nextMonth: (): void => this.nextMonth(),
    nextYear: (): void => this.nextYear(),
  };

  constructor() {
    effect(() => {
      this.selectedDaysState.set([...this.selectedDaysInput()]);
    });

    effect(() => {
      const controlAction = this.calendarControlAction();
      if (controlAction) {
        this.calendarAction[controlAction.action]();
        this.renderDays();
      }
    });

    effect(() => {
      const month = this.goToMonthInCalendar();
      if (month && this.calendar()) {
        this.calendar()?.goToDate(Number(month) + 1, this.calendar()!.year);
        this.renderDays();
      }
    });

    effect(() => {
      const year = this.goToYearInCalendar();
      if (year && this.calendar()) {
        this.calendar()?.goToDate(this.calendar()!.month.number, Number(year));
        this.renderDays();
      }
    });
  }

  ngOnInit(): void {
    const initialSelected = this.selectedDaysInput();
    if (initialSelected.length) {
      arrangeDates(initialSelected);
      this.selectedDaysState.set([...initialSelected]);
    }

    this.setCalendarInitialState(initialSelected);
    this.renderDays();
  }

  handleClick(dayIndex: number): void {
    const day = this.days()[dayIndex];
    if (!day || day.disabled) {
      return;
    }

    const selectedDays = [...this.selectedDaysState()];

    if (this.rangePicker()) {
      if (!selectedDays.length || selectedDays[FINAL_RANGE]) {
        this.selectedDaysState.set([day]);
        return;
      }

      const range = [...selectedDays];
      range[FINAL_RANGE] = day;
      arrangeDates(range);
      this.selectedDaysState.set(range);
      this.emitEvent(range);
      this.setDateInCalendar(range);
      return;
    }

    this.selectedDaysState.set([day]);
    this.emitEvent(this.selectedDaysState());
    this.setDateInCalendar(this.selectedDaysState());
  }

  isSelectedDate(date: Day, isFinalOfRange?: boolean): boolean {
    return isSameDay(
      date,
      isFinalOfRange
        ? this.selectedDaysState()[FINAL_RANGE]
        : this.selectedDaysState()[INITIAL_RANGE],
    );
  }

  private renderDays(): void {
    const calendar = this.calendar();
    if (!calendar) {
      return;
    }

    const days = this.getMonthDaysGrid(calendar);
    days.forEach((day) => {
      day.isDayCurrentMonth = this.isDayMonthCurrent(calendar, day);
      day.isToday = isToday(day, this.lang());
      day.isBetweenRange = isBetweenRange(day, this.selectedDaysState());
      day.isRangeInitialLimit = this.isRangeLimit(day);
      day.isRangeFinalLimit = this.isRangeLimit(day, this.finalRange);
      if (this.disabledDate()) {
        day.disabled = this.disabledDate()!(day.Date);
      }
    });

    this.days.set(days);

    this.updateLabelCalendar.emit({
      month: calendar.month.name,
      year: String(calendar.year),
    });
  }

  private setCalendarInitialState(selectedDays: Day[]): void {
    const selected = [...selectedDays];
    if (this.currentDate()?.length && !selected.length) {
      selected[INITIAL_RANGE] = new Day(
        getFormattedDate(this.currentDate()!, false),
        this.lang(),
      );
      if (this.rangePicker() && this.currentDate()?.[FINAL_RANGE]) {
        selected[FINAL_RANGE] = new Day(
          getFormattedDate(this.currentDate()!, this.finalRange),
          this.lang(),
        );
      }
      this.selectedDaysState.set(selected);
    }

    const initialRenderDay = new Day(
      getInitialDate(this.currentDate()),
      this.lang(),
    );
    this.calendar.set(
      new Calendar(
        initialRenderDay.year,
        initialRenderDay.monthNumber,
        this.lang(),
      ),
    );
  }

  private setDateInCalendar(selected: Day[]): void {
    const calendar = this.calendar();
    if (!calendar) return;

    calendar.goToDate(
      selected[INITIAL_RANGE].monthNumber,
      selected[INITIAL_RANGE].year,
    );
  }

  private getMonthDaysGrid(calendar: Calendar): Day[] {
    const prevMonth = calendar.getPreviousMonth();
    const totalLastMonthFinalDays = calendar.getLastMonthFinalDays();
    const totalDays = this.getTotalDaysForCalendar(
      calendar,
      totalLastMonthFinalDays,
    );
    const monthList = Array.from<Day>({ length: totalDays });

    for (let i = totalLastMonthFinalDays; i < totalDays; i++) {
      monthList[i] = calendar.getDay(i + 1 - totalLastMonthFinalDays);
    }

    for (let i = 0; i < totalLastMonthFinalDays; i++) {
      const inverted = totalLastMonthFinalDays - (i + 1);
      monthList[i] = prevMonth.getDay(prevMonth.numberOfDays - inverted);
    }

    return monthList;
  }

  private getTotalDaysForCalendar(
    calendar: Calendar,
    totalLastMonthFinalDays: number,
  ): number {
    const totalDays = calendar.month.numberOfDays + totalLastMonthFinalDays;

    if (totalDays > TOTAL_DAYS.WITH_FIVE_WEEKS) {
      return TOTAL_DAYS.WITH_SIX_WEEKS;
    }

    if (totalDays > TOTAL_DAYS.WITH_FOUR_WEEKS) {
      return TOTAL_DAYS.WITH_FIVE_WEEKS;
    }

    return TOTAL_DAYS.WITH_FOUR_WEEKS;
  }

  private isDayMonthCurrent(calendar: Calendar, day: Day): boolean {
    return day.monthNumber === calendar.month.number;
  }

  private isRangeLimit(date: Day, isFinalOfRange?: boolean): boolean {
    const [DAY_NAME, RANGE_TO_AVOID, RANGE_TO_CONFIRM] = isFinalOfRange
      ? ['sábado', INITIAL_RANGE, FINAL_RANGE]
      : ['domingo', FINAL_RANGE, INITIAL_RANGE];
    return (
      (date.day === DAY_NAME &&
        !isSameDay(date, this.selectedDaysState()[RANGE_TO_AVOID])) ||
      isSameDay(date, this.selectedDaysState()[RANGE_TO_CONFIRM])
    );
  }

  private previousYear(): void {
    const calendar = this.calendar();
    if (calendar) {
      calendar.goToPreviousYear(calendar.month.number - 1);
    }
  }

  private previousMonth(): void {
    this.calendar()?.goToPreviousMonth();
  }

  private nextMonth(): void {
    this.calendar()?.goToNextMonth();
  }

  private nextYear(): void {
    const calendar = this.calendar();
    if (calendar) {
      calendar.goToNextYear(calendar.month.number - 1);
    }
  }

  private emitEvent(selected: Day[]): void {
    this.events.emit(selected);
  }
}
