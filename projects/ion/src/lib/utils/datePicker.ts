import { Day } from '../picker/core/day';

export const SUNDAY = 'domingo';
export const SATURDAY = 'sábado';
export const INITIAL_RANGE = 0;
export const FINAL_RANGE = 1;

export function isSameDay(
  day: Day,
  selectedIndex: number,
  dayToCompare?: Day
): boolean {
  const SELECTED = dayToCompare
    ? dayToCompare
    : this.selectedDay[selectedIndex];
  return (
    SELECTED &&
    day.date === SELECTED.date &&
    day.monthNumber === SELECTED.monthNumber &&
    day.year === SELECTED.year
  );
}
