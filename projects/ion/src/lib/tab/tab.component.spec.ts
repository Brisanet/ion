import { CommonModule } from '@angular/common';
import { fireEvent, render, screen } from '@testing-library/angular';
import { IonIconComponent } from '../icon/icon.component';
import { IonTabProps, TabComponent } from './tab.component';

const defaultName = 'MinhaTab';

const sut = async (customProps?: IonTabProps) => {
  await render(TabComponent, {
    componentProperties: customProps || {
      label: defaultName,
    },
    imports: [CommonModule],
    declarations: [IonIconComponent],
  });
};

describe('TabComponent', () => {
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
});
