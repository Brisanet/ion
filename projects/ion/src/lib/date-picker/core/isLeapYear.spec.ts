import { isLeapYear } from './isLeapYear';

const leapYears = [
  400, 800, 1200, 1600, 1988, 1992, 1996, 2000, 2004, 2008, 2012, 2016, 2020,
  2024, 2028, 2032, 2036, 2040, 2044, 2048, 2052,
];

it.each(leapYears)('should return true if all years are leap years', (year) =>
  expect(isLeapYear(year)).toBeTruthy()
);

const notLeapYears = [
  500, 600, 1700, 1800, 1900, 2100, 2001, 2002, 2003, 2005, 2200, 2300,
];

it.each(notLeapYears)(
  'should return false if all years are not leap years',
  (year) => expect(isLeapYear(year)).not.toBeTruthy()
);
