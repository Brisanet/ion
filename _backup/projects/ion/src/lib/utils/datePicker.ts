import { IonDatePickerCalendarComponentProps } from '../picker/core/calendar-model';
import { Day } from '../picker/core/day';

export const TOTAL_DAYS = {
  WITH_SIX_WEEKS: 42,
  WITH_FIVE_WEEKS: 35,
  WITH_FOUR_WEEKS: 28,
};
export const SUNDAY = 'domingo';
export const SATURDAY = 'sábado';
export const INITIAL_RANGE = 0;
export const FINAL_RANGE = 1;

export function isToday(
  date: Day,
  lang: IonDatePickerCalendarComponentProps['lang']
): boolean {
  const TODAY = new Day(new Date(), lang);
  return isSameDay(date, TODAY);
}

export function isSameDay(day: Day, dayToCompare?: Day): boolean {
  return (
    dayToCompare &&
    day.date === dayToCompare.date &&
    day.monthNumber === dayToCompare.monthNumber &&
    day.year === dayToCompare.year
  );
}

export function isSameDate(INITIAL_DATE: Date, FINAL_DATE: Date): boolean {
  return INITIAL_DATE.toString() !== FINAL_DATE.toString();
}

export function isNotRangeLimit(
  date: Day,
  dayName: string,
  randeDateSelected: Day
): boolean {
  return !(date.day === dayName && isSameDay(date, randeDateSelected));
}

export function getInitialDate(currentDate: string[]): Date {
  return currentDate && currentDate.length
    ? getFormattedDate(currentDate)
    : new Date();
}

export function getFormattedDate(
  dates: string[],
  isFinalOfRange?: boolean
): Date {
  return new Date(
    dates[isFinalOfRange ? FINAL_RANGE : INITIAL_RANGE].replace('-', ',')
  );
}

export function calculateDuration(isoString: string): number {
  const regex =
    /^P(?:(\d+)Y)?(?:(\d+)M)?(?:(\d+)D)?(?:T(?:(\d+)H)?(?:(\d+)M)?(?:(\d+(?:\.\d+)?)S)?)?$/;
  const match = isoString.match(regex);

  if (!match) {
    throw new Error('Invalid ISO 8601 format.');
  }

  const [_, years, months, days, hours, minutes, seconds] = match.map(Number);

  const durationInMilliseconds =
    (years || 0) * 365 * 24 * 60 * 60 * 1000 +
    (months || 0) * 30 * 24 * 60 * 60 * 1000 +
    (days || 0) * 24 * 60 * 60 * 1000 +
    (hours || 0) * 60 * 60 * 1000 +
    (minutes || 0) * 60 * 1000 +
    (seconds || 0) * 1000;

  return durationInMilliseconds;
}

export function arrangeDates(selectedDay: Day[]): void {
  selectedDay.sort((initial, final) => {
    return initial.Date < final.Date ? -1 : initial.Date > final.Date ? 1 : 0;
  });
}

export function isBetweenRange(currentDay: Day, selectedDays: Day[]): boolean {
  if (!(selectedDays[INITIAL_RANGE] && selectedDays[FINAL_RANGE])) {
    return;
  }
  const [INITIAL_DATE, FINAL_DATE, CURRENT_DATE] = [
    selectedDays[INITIAL_RANGE].Date,
    selectedDays[FINAL_RANGE].Date,
    currentDay.Date,
  ].map((dateInRange) => new Date(dateInRange.setHours(0, 0, 0, 0)));
  const isNotLimit =
    isNotRangeLimit(currentDay, SATURDAY, selectedDays[INITIAL_RANGE]) &&
    isNotRangeLimit(currentDay, SUNDAY, selectedDays[FINAL_RANGE]);
  const isBetween = CURRENT_DATE >= INITIAL_DATE && CURRENT_DATE <= FINAL_DATE;
  return isSameDate(INITIAL_DATE, FINAL_DATE) && isBetween && isNotLimit;
}
