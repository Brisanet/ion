import { calculateVisibleChipCount } from './calculate-visible-chip-count';

const counterWidths: Record<number, number> = {
  1: 24,
  2: 28,
  3: 32,
};

const getCounterWidth = (hiddenCount: number): number =>
  counterWidths[hiddenCount] ?? 30;

describe('calculateVisibleChipCount', () => {
  const gap = 8;

  it('should return total when all chips fit', () => {
    const result = calculateVisibleChipCount(
      [80, 90, 70],
      300,
      gap,
      getCounterWidth
    );

    expect(result).toBe(3);
  });

  it('should return partial count when only some chips fit with counter', () => {
    const result = calculateVisibleChipCount(
      [120, 120, 120, 120],
      300,
      gap,
      getCounterWidth
    );

    expect(result).toBe(2);
  });

  it('should return 1 when only one chip fits with counter', () => {
    const result = calculateVisibleChipCount(
      [200, 200, 200],
      240,
      gap,
      getCounterWidth
    );

    expect(result).toBe(1);
  });

  it('should return 0 for empty chip list', () => {
    const result = calculateVisibleChipCount([], 200, gap, getCounterWidth);

    expect(result).toBe(0);
  });

  it('should account for counter width when calculating fit', () => {
    const chipWidths = [100, 100, 100];

    const withoutCounterSpace = calculateVisibleChipCount(
      chipWidths,
      210,
      gap,
      getCounterWidth
    );

    expect(withoutCounterSpace).toBe(1);
  });
});
