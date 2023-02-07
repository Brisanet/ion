import { CommonModule } from '@angular/common';
import { render, screen } from '@testing-library/angular';
import { InfoBadgeStatus, InfoBadgeProps } from '../core/types';
import { IonInfoBadgeComponent } from './info-badge.component';
import { IonIconModule } from '../icon/icon.module';

const defaultInfoBadge: InfoBadgeProps = {
  variant: 'primary',
};

const sut = async (
  customProps: InfoBadgeProps = defaultInfoBadge
): Promise<void> => {
  await render(IonInfoBadgeComponent, {
    componentProperties: customProps,
    imports: [CommonModule, IonIconModule],
  });
};

describe('IonInfoBadgeComponent', () => {
  it('Should render an empty info badge', async () => {
    await sut({ ...defaultInfoBadge });
    expect(screen.getByTestId('info-badge')).toBeInTheDocument();
  });

  it('Should render an info badge with icon', async () => {
    const icon = 'check';
    await sut({ icon, ...defaultInfoBadge });

    expect(screen.getByTestId('info-badge-icon')).toBeInTheDocument();
  });

  it('Should render an info badge with text', async () => {
    const text = 'Lorem ipsum';
    await sut({ text, ...defaultInfoBadge });

    expect(screen.getByText(text)).toBeInTheDocument();
  });

  it.each(['primary', 'success', 'info', 'warning', 'negative'])(
    'Should render an info badge for each status',
    async (className: InfoBadgeStatus) => {
      const icon = 'check';
      await sut({ icon, variant: className });

      expect(screen.getByTestId('info-badge')).toHaveClass(className);
    }
  );
});
