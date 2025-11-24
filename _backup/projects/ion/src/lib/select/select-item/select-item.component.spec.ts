import { render, screen, fireEvent } from '@testing-library/angular';
import { IonSelectItemComponent } from './select-item.component';
import { IonIconModule } from '../../icon/icon.module';
import { SafeAny } from '../../utils/safe-any';
import { IonSelectItemProps } from '../../core/types/select';

const customLabel = 'Option 01';

const sut = async (customProps?: IonSelectItemProps): Promise<void> => {
  await render(IonSelectItemComponent, {
    componentProperties: customProps,
    imports: [IonIconModule],
  });
};
describe('IonSelecItemComponent', () => {
  it('should correctly render a label', async () => {
    await sut({ label: customLabel });
    expect(screen.getByText(customLabel)).toBeTruthy();
  });

  it('should emit an event when clicking of the icon', async () => {
    const clickEvent = jest.fn();
    await sut({
      label: 'Option',
      unselect: {
        emit: clickEvent,
      },
    } as SafeAny);
    fireEvent.click(screen.getByTestId('ion-icon-close'));
    expect(clickEvent).toHaveBeenCalled();
  });

  describe('IonSelecItemComponent - disabled', () => {
    beforeEach(async () => {
      await sut({ label: customLabel, disabled: true });
    });

    it('should not render the remove button when disabled', async () => {
      expect(screen.queryByTestId('ion-icon-close')).not.toBeInTheDocument();
    });

    it('should have disabled class when informed', async () => {
      expect(screen.getByTestId('ion-select-item')).toHaveClass(
        'ion-select-item--disabled'
      );
    });
  });
});
