import { Day } from '../picker/core/day';
import { isBetweenRange } from './datePicker';

const selectedDays = [
  new Day(new Date('2024-01-01')),
  new Day(new Date('2024-01-10')),
];

describe('isBetweenRange', () => {
  it('should return true to dates between a range', () => {
    const currentDay = new Day(new Date('2024-01-05'));

    const result = isBetweenRange(currentDay, selectedDays);

    expect(result).toBe(true);
  });

  it('should return false to dates that are not within a range', () => {
    const currentDay = new Day(new Date('2024-02-01'));

    const result = isBetweenRange(currentDay, selectedDays);

    expect(result).toBe(false);
  });
});
