import { Day } from '../picker/core/day';

export const SUNDAY = 'domingo';
export const SATURDAY = 'sábado';
export const INITIAL_RANGE = 0;
export const FINAL_RANGE = 1;

export function isSameDay(day: Day, dayToCompare?: Day): boolean {
  return (
    dayToCompare &&
    day.date === dayToCompare.date &&
    day.monthNumber === dayToCompare.monthNumber &&
    day.year === dayToCompare.year
  );
}

export function getFormattedDate(
  dates: string[],
  isFinalOfRange?: boolean
): Date {
  return new Date(
    dates[isFinalOfRange ? FINAL_RANGE : INITIAL_RANGE].replace('-', ',')
  );
}
