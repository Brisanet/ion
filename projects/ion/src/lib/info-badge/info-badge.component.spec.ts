import { CommonModule } from '@angular/common';
import { render, screen } from '@testing-library/angular';
import { IonIconComponent } from '../icon/icon.component';

import { InfoBadgeComponent } from './info-badge.component';
import { InfoBadgeProps } from './info-badge.component';

const defaultInfoBadge: InfoBadgeProps = {
  variant: 'primary',
};

const sut = async (customProps: InfoBadgeProps = defaultInfoBadge) => {
  await render(InfoBadgeComponent, {
    componentProperties: customProps,
    imports: [CommonModule],
    declarations: [IonIconComponent],
  });
};

describe('InfoBadgeComponent', () => {
  it('Should render an empty info badge', async () => {
    await sut({ ...defaultInfoBadge });
    expect(screen.getByTestId('info-badge')).toBeInTheDocument();
  });

  it('Should render an info badge with icon', async () => {
    const icon = 'check';
    await sut({ icon, ...defaultInfoBadge });

    expect(screen.getByTestId('info-badge-icon')).toBeInTheDocument();
  });
});
