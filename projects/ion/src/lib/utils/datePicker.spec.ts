import { Day } from '../picker/core/day';
import {
  calculateDuration,
  getFormattedDate,
  getInitialDate,
  isBetweenRange,
  isSameDate,
  isSameDay,
  isToday,
} from './datePicker';

const today = new Date('2024-01-10T03:00:00.000Z');
jest.useFakeTimers('modern').setSystemTime(today);

describe('DatePicker', () => {
  let result: boolean;
  describe('isToday', () => {
    let currentDate: Day;
    const lang = 'pt-BR';

    it('should return true if day is today', () => {
      currentDate = new Day(today);
      result = isToday(currentDate, lang);
      expect(result).toBe(true);
    });

    it('should return false if day is not today', () => {
      currentDate = new Day(new Date('2024-01-03'));
      result = isToday(currentDate, lang);
      expect(result).toBe(false);
    });
  });

  describe('isSameDay', () => {
    let day: Day;
    let dayToCompare: Day;

    it('should return true if days are equal', () => {
      day = new Day(new Date('2024-01-01'));
      dayToCompare = new Day(new Date('2024-01-01'));

      result = isSameDay(day, dayToCompare);

      expect(result).toBe(true);
    });
    it('should return false if day arent equal', () => {
      day = new Day(new Date('2024-01-01'));
      dayToCompare = new Day(new Date('2024-01-02'));

      result = isSameDay(day, dayToCompare);

      expect(result).toBe(false);
    });
  });

  describe('isSameDate', () => {
    let initial_date: Date;
    let final_date: Date;

    it('should return false if dates are equal', () => {
      initial_date = new Date('2024-01-01');
      final_date = new Date('2024-01-01');

      result = isSameDate(initial_date, final_date);

      expect(result).toBe(false);
    });
    it('should return true if dates arent equal', () => {
      initial_date = new Date('2024-01-01');
      final_date = new Date('2024-04-01');

      result = isSameDate(initial_date, final_date);

      expect(result).toBe(true);
    });
  });

  describe('getInitialDate', () => {
    it('should return formatted data when current data is provided', () => {
      const currentDate = ['2024-01-10'];
      const result = getInitialDate(currentDate);
      const expectedDate = new Date();
      const expectedDay = expectedDate.getUTCDate();
      const expectedMonth = expectedDate.getUTCMonth() + 1;
      const expectedYear = expectedDate.getUTCFullYear();

      expect(result.getUTCDate()).toBe(expectedDay);
      expect(result.getUTCMonth() + 1).toBe(expectedMonth);
      expect(result.getUTCFullYear()).toBe(expectedYear);
    });
    it('should return current date when no date is given', () => {
      const result = getInitialDate([]);

      expect(result).toEqual(new Date());
    });
  });

  describe('getFormattedDate', () => {
    it('should return the date formatted as expected', () => {
      const dates = ['2024-01-01', '2024-01-10'];
      const isFinalOfRange = false;

      const result = getFormattedDate(dates, isFinalOfRange);

      const expectedDate = new Date('2024-01-01');
      const expectedDay = expectedDate.getUTCDate();
      const expectedMonth = expectedDate.getUTCMonth() + 1;
      const expectedYear = expectedDate.getUTCFullYear();

      expect(result.getUTCDate()).toBe(expectedDay);
      expect(result.getUTCMonth() + 1).toBe(expectedMonth);
      expect(result.getUTCFullYear()).toBe(expectedYear);
    });
  });

  describe('isBetweenRange', () => {
    let currentDay: Day;

    const selectedDays = [
      new Day(new Date('2024-01-01')),
      new Day(new Date('2024-01-10')),
    ];

    it('should return true to dates between a range', () => {
      currentDay = new Day(new Date('2024-01-05'));

      result = isBetweenRange(currentDay, selectedDays);

      expect(result).toBe(true);
    });
    it('should return false to dates that are not within a range', () => {
      currentDay = new Day(new Date('2024-02-01'));

      result = isBetweenRange(currentDay, selectedDays);

      expect(result).toBe(false);
    });
  });

  describe('calculateDuration', () => {
    it('should calculate duration in miliseconds', () => {
      const isoString = 'P1M7D';
      const isoStringInMiliSeconds = 3196800000;
      const result = calculateDuration(isoString);

      expect(result).toBe(isoStringInMiliSeconds);
    });

    it('should throw error if string formater is not valid', () => {
      const isoString = 'OneDay';
      expect(() => calculateDuration(isoString)).toThrowError(
        'Invalid ISO 8601 format.'
      );
    });
  });
});
