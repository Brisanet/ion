import { render, screen } from '@testing-library/angular';
import { IonBadgeComponent } from './badge.component';
import { BadgeProps, BadgeType } from '../core/types';

const defaultBadge: BadgeProps = {
  type: 'primary',
};

const sut = async (customProps: BadgeProps = defaultBadge): Promise<void> => {
  await render(IonBadgeComponent, {
    componentProperties: customProps,
  });
};

describe('BadgeComponent', () => {
  it('should render badge with label', async () => {
    const label = 'Projeto';
    await sut({ label, ...defaultBadge });
    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it.each([10, 99, 6, 0])(
    'should render badge with value %i',
    async (value: number) => {
      await sut({ value, ...defaultBadge });
      expect(screen.getByText(value)).toBeInTheDocument();
    }
  );

  it('should render badge with value when has label and value', async () => {
    const value = 10;
    const label = 'label and value';
    await sut({ value, label, ...defaultBadge });
    expect(screen.getByText(value)).toBeInTheDocument();
    expect(screen.queryAllByText(label)).toHaveLength(0);
  });

  it.each([100, 101, 1000])(
    'should render 99+ when value is %i (bigger than 100)',
    async (value: number) => {
      await sut({ value, ...defaultBadge });
      expect(screen.getByText('99+')).toBeInTheDocument();
    }
  );

  it.each(['primary', 'secondary', 'neutral', 'negative', 'warning'])(
    'should render 99+ when value is %i (bigger than 100)',
    async (type: BadgeType) => {
      await sut({ type, label: type });
      expect(screen.getByText(type)).toHaveClass(`badge-${type}`);
    }
  );
});
