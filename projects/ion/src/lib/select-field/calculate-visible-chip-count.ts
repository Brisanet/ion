function chipsTotalWidth(widths: number[], gap: number): number {
  return widths.reduce((sum, width, index) => sum + width + (index > 0 ? gap : 0), 0);
}

export function calculateVisibleChipCount(
  chipWidths: number[],
  availableWidth: number,
  gap: number,
  getCounterWidth: (hiddenCount: number) => number
): number {
  const total = chipWidths.length;

  if (total === 0) {
    return 0;
  }

  if (chipsTotalWidth(chipWidths, gap) <= availableWidth) {
    return total;
  }

  for (let visible = total - 1; visible >= 1; visible--) {
    const hidden = total - visible;
    const chipsWidth = chipsTotalWidth(chipWidths.slice(0, visible), gap);
    const counterWidth = getCounterWidth(hidden);
    const neededWidth = chipsWidth + gap + counterWidth;

    if (neededWidth <= availableWidth) {
      return visible;
    }
  }

  return 1;
}
