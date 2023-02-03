import { FormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import {
  IonPopConfirmComponent,
  PopConfirmProps,
} from './popconfirm.component';
import { IonSharedModule } from '../shared.module';
import { IonDividerModule } from '../divider/divider.module';
import { IonAlertModule } from '../alert/alert.module';

const defaultProps: PopConfirmProps = {
  ionPopConfirmTitle: 'Title',
};

const sut = async (props: PopConfirmProps = defaultProps): Promise<void> => {
  await render(IonPopConfirmComponent, {
    componentProperties: props,
    imports: [FormsModule, IonSharedModule, IonDividerModule, IonAlertModule],
  });
};

describe('IonPopConfirmComponent', () => {
  describe('Check default fields', () => {
    beforeEach(async () => {
      await sut();
    });

    it('should render component with message', async () => {
      expect(
        screen.getByText(defaultProps.ionPopConfirmTitle)
      ).toBeInTheDocument();
    });

    it('should render component with warning icon by default', async () => {
      expect(
        document.getElementById('ion-icon-exclamation-solid')
      ).toBeInTheDocument();
    });

    it.each(['Confirmar', 'Cancelar'])(
      'should render button with default text %s',
      async (textBtn: string) => {
        expect(screen.getByText(textBtn)).toBeInTheDocument();
      }
    );

    it.each(['pop-confirm-btn', 'pop-cancel-btn'])(
      'should render %s',
      async (btnId: string) => {
        expect(screen.getByTestId(btnId)).toBeInTheDocument();
      }
    );
  });

  it('should render the danger type', async () => {
    const dangerType = {
      ...defaultProps,
      ionPopConfirmType: 'negative',
    } as PopConfirmProps;

    await sut(dangerType);
    expect(document.getElementById('ion-icon-close-solid')).toBeInTheDocument();
  });

  it('should render a description', async () => {
    const ionPopConfirmDesc = 'Mussum Ipsum, cacilds vidis litro abertis.';

    const withDescription = {
      ...defaultProps,
      ionPopConfirmDesc,
    } as PopConfirmProps;

    await sut(withDescription);
    expect(screen.getByText(ionPopConfirmDesc)).toBeInTheDocument();
  });

  it(`should render cancel button with text 'Voltar'`, async () => {
    const ionCancelText = 'Voltar';
    const withCustomCancelText = {
      ...defaultProps,
      ionCancelText,
    } as PopConfirmProps;

    await sut(withCustomCancelText);
    expect(screen.getByText(ionCancelText)).toBeInTheDocument();
  });

  it(`should render confirm button with text 'Ok'`, async () => {
    const ionConfirmText = 'Ok';
    const withCustomCancelText = {
      ...defaultProps,
      ionConfirmText,
    } as PopConfirmProps;

    await sut(withCustomCancelText);
    expect(screen.getByText(ionConfirmText)).toBeInTheDocument();
  });
});
