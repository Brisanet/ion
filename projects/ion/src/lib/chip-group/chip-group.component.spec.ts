import { fireEvent, render, screen } from '@testing-library/angular';
import { BadgeComponent } from '../badge/badge.component';
import { ChipComponent, ChipSize } from '../chip/chip.component';
import { SafeAny } from '../utils/safe-any';
import { ChipGroupComponent, ChipGroupProps } from './chip-group.component';
import { DropdownModule } from '../dropdown/dropdown.module';
import { InfoBadgeComponent } from '../info-badge/info-badge.component';

const selectEvent = jest.fn();
const mockChips = [
  {
    label: 'Chip 1',
    selected: false,
    options: [{ label: 'item 1' }, { label: 'item 2' }],
  },
  {
    label: 'Chip 2',
    selected: false,
    options: [{ label: 'item 3' }, { label: 'item 4' }],
  },
];

const sut = async (
  customProps: ChipGroupProps = {
    chips: mockChips,
  }
): Promise<{ element: HTMLElement; event: jest.Mock }> => {
  await render(ChipGroupComponent, {
    componentProperties: customProps,
    imports: [DropdownModule],
    declarations: [ChipComponent, BadgeComponent, InfoBadgeComponent],
  });
  return { element: screen.getByTestId('ion-chip-group'), event: selectEvent };
};

describe('ChipGroupComponent', () => {
  it('should render component', async () => {
    const rendered = await sut();
    expect(rendered).toBeTruthy();
  });
});
