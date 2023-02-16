import { CommonModule } from '@angular/common';
import { render, screen } from '@testing-library/angular';
import { IonMessageComponent } from './message.component';
import { IonIconModule } from '../icon/icon.module';
import { IonMessageProps, MessageStatusType } from '../core/types/message';

const defaultValue: IonMessageProps = {
  label: 'Message',
};

const messageIDs = {
  message: 'ion-message',
  iconStatus: 'message-ion',
};

export const icontypes = [
  'custom',
  'positive',
  'negative_alert',
  'negative_erro',
  'warning',
  'info',
];

const sut = async (
  customProps: IonMessageProps = defaultValue
): Promise<HTMLElement> => {
  await render(IonMessageComponent, {
    componentProperties: customProps,
    imports: [CommonModule, IonIconModule],
  });
  return screen.findByTestId(messageIDs.message);
};

describe('IonMessageComponent', () => {
  beforeEach(async () => {
    await sut();
  });
  it('Should render with default positive class', async () => {
    expect(screen.getByTestId('ion-message')).toHaveClass('positive');
  });

  it('Should have an message', async () => {
    expect(screen.getAllByText(defaultValue.label)).toHaveLength(1);
  });

  it('Should render with success icon by default', async () => {
    expect(document.getElementById('ion-icon-check-solid')).toBeInTheDocument();
  });
});

describe('IonMessageComponent / Types', () => {
  it.each(icontypes)(
    'Should render %s type',
    async (type: MessageStatusType) => {
      const element = await sut({ ...defaultValue, type: type });
      expect(element).toHaveClass(type);
    }
  );
});
