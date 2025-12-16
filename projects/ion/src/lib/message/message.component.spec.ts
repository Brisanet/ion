import { render, screen } from '@testing-library/angular';
import { IonMessageComponent, icontypes } from './message.component';
import { IonMessageProps, MessageStatusType } from '../core/types/message';

const defaultValue: IonMessageProps = {
  label: 'Message',
};

const messageIDs = {
  message: 'ion-message',
  iconStatus: 'message-ion',
};

const sut = async (
  customProps: Partial<IonMessageProps> = {}
): Promise<HTMLElement> => {
  await render(IonMessageComponent, {
    componentInputs: {
      ...defaultValue,
      ...customProps,
    },
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
  it.each(Object.keys(icontypes))(
    'Should render %s type',
    async (type: string) => {
      const element = await sut({
        label: 'Message',
        type: type as MessageStatusType,
      });
      expect(element).toHaveClass(type);
    }
  );
});

describe('IonMessageComponent / Custom Icon', () => {
  it('Should render with custom icon', async () => {
    await sut({
      label: 'Message',
      iconType: 'star-solid',
    });
    expect(document.getElementById('ion-icon-star-solid')).toBeInTheDocument();
  });
});
