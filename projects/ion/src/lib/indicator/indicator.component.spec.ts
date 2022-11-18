import { render, screen } from '@testing-library/angular';
import { IonIconComponent } from './../icon/icon.component';

import { IndicatorComponent, IndicatorProps } from './indicator.component';

const defaultProps = {
  label: 'Recuperável',
  icon: 'technical',
  iconbody: 'close',
  type: 'info-solid',
  value: '2.800',
  valueicon: 'right2',
  color: '#6e7192',
  percent: '30',
};

const sut = async (props: IndicatorProps = defaultProps) => {
  await render(IndicatorComponent, {
    declarations: [IndicatorComponent, IonIconComponent],
    componentProperties: props,
  });
};

describe('IndicatorComponent', () => {
  describe('Basics', () => {
    beforeEach(async () => {
      await sut();
    });

    it('should render component with label ' + defaultProps.label, async () => {
      expect(screen.getByText(defaultProps.label)).toBeInTheDocument();
    });

    it('should render component with technical icon', async () => {
      expect(
        document.getElementById(`ion-icon-${defaultProps.icon}`)
      ).toBeInTheDocument();
    });

    it('should render info badge icon', async () => {
      expect(screen.getByTestId('info-badge-icon')).toBeInTheDocument();
    });

    it('should render value ' + defaultProps.value, async () => {
      expect(screen.getByText(defaultProps.value)).toBeInTheDocument();
    });

    it('should render percent' + defaultProps.percent + '%', async () => {
      expect(screen.getByText(`${defaultProps.percent}%`)).toBeInTheDocument();
    });

    it('should render right2 icon only when has percent', async () => {
      expect(screen.getByTestId('right-icon')).toBeInTheDocument();
    });
  });

  describe('Without Percent', () => {
    beforeEach(async () => {
      const withoutPercent = { ...defaultProps };
      delete withoutPercent.percent;
      await sut(withoutPercent);
    });

    it('should not render right2 when not has percent', async () => {
      expect(screen.queryAllByTestId('right-icon')).toHaveLength(0);
    });

    it('should not render right2 when not has percent', async () => {
      expect(screen.queryAllByText('%')).toHaveLength(0);
    });
  });
});
