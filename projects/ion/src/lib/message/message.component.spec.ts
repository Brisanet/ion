import { CommonModule } from '@angular/common';
import { IonIconComponent } from './../icon/icon.component';
import { render, screen } from '@testing-library/angular';
import {
  IonMessageProps,
  MessageComponent,
  Statustype,
} from './message.component';

const defaultValue: IonMessageProps = {
  label: 'Message',
};

const messageDefaultClass = 'ion-message';

const messageIDs = {
  message: 'ion-message',
  iconStatus: 'message-ion',
};

const iconTypes = [
  'random',
  'positive',
  'negative_alert',
  'negative_erro',
  'warning',
  'info',
];

const sut = async (customProps: IonMessageProps = defaultValue) => {
  await render(MessageComponent, {
    componentProperties: customProps,
    declarations: [IonIconComponent],
    imports: [CommonModule],
  });
  return screen.findByTestId(messageIDs.message);
};

describe('MessageComponent', () => {
  it('Should render message', async () => {
    expect(await sut()).toHaveClass(messageDefaultClass);
  });

  it('Should have an message', async () => {
    expect(await sut()).toHaveTextContent(defaultValue.label);
  });

  it('Should render with success icon by default', async () => {
    await sut();
    expect(
      await screen.findByTestId(messageIDs.iconStatus)
    ).toBeInTheDocument();
  });

  it.each(iconTypes)('Should render %s type', async (type: Statustype) => {
    const element = await sut({ ...defaultValue, type: type });
    expect(element).toHaveClass(type);
  });
});
