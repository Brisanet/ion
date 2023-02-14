import { CommonModule } from '@angular/common';
import { fireEvent, render, screen } from '@testing-library/angular';
import { IonBadgeModule } from '../badge/badge.module';
import { IonTabProps } from '../core/types';
import { IonIconModule } from '../icon/icon.module';
import { IonTabComponent } from './tab.component';

const defaultName = 'MinhaTab';

const sut = async (customProps?: IonTabProps): Promise<void> => {
  await render(IonTabComponent, {
    componentProperties: customProps || {
      label: defaultName,
    },
    imports: [CommonModule, IonIconModule, IonBadgeModule],
  });
};

describe('IonTabComponent', () => {
  it.each(['about', 'profile'])(
    'should render label %s',
    async (tabName: string) => {
      await sut({ label: tabName });
      expect(screen.getAllByText(tabName)).toHaveLength(1);
    }
  );

  it.each(['sm', 'md', 'lg'])(
    'should render with correct size %s',
    async (size: IonTabProps['tabSize']) => {
      await sut({ label: 'Tab', tabSize: size });
      expect(screen.getByText('Tab')).toHaveClass('tab-' + size);
    }
  );

  it.each(['bottom', 'top', 'right', 'left'])(
    'should render with correct border direction %s',
    async (direction: IonTabProps['direction']) => {
      await sut({ label: 'Tab', direction });
      expect(screen.getByText('Tab')).toHaveClass('border-' + direction);
    }
  );

  it('should click on tab', async () => {
    await sut();
    const myTab = screen.getByText(defaultName);
    fireEvent.click(myTab);
    expect(myTab).toHaveClass('tab-selected');
  });

  it('should render tab without disabled by default', async () => {
    await sut();
    expect(screen.getByText(defaultName)).toBeEnabled();
  });

  it('should render tab disabled', async () => {
    await sut({ label: defaultName, disabled: true });
    expect(screen.getByText(defaultName)).toBeDisabled();
  });

  it('should render icon on tab', async () => {
    await sut({ label: defaultName, iconType: 'trash' });
    const elementRendered = document.getElementById('ion-icon-trash');
    expect(elementRendered).toBeTruthy();
  });

  it('should not render badge when is not informed', async () => {
    await sut({ label: defaultName, iconType: 'trash' });
    expect(screen.queryAllByText('badge-tab')).toHaveLength(0);
  });

  it('should render badge', async () => {
    await sut({ label: defaultName, iconType: 'trash', badge: { value: 2 } });
    expect(screen.queryAllByTestId('badge-tab')).toHaveLength(1);
  });

  it('should render badge with correct value', async () => {
    const badgeValue = 33;
    await sut({
      label: defaultName,
      iconType: 'trash',
      badge: { value: badgeValue },
    });
    expect(screen.getByText(badgeValue)).toBeInTheDocument();
  });
});
