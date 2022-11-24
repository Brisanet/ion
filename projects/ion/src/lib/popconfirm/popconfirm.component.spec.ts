import { FormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import { AlertComponent } from '../alert/alert.component';
import { BadgeComponent } from '../badge/badge.component';
import { ButtonComponent } from '../button/button.component';
import { IonDividerComponent } from '../divider/divider.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { IonIconComponent } from '../icon/icon.component';
import { InputComponent } from '../input/input.component';
import { PopConfirmComponent, PopConfirmProps } from './popconfirm.component';

const defaultProps: PopConfirmProps = {
  ionPopConfirmTitle: 'Title',
};

const sut = async (props: PopConfirmProps = defaultProps): Promise<void> => {
  await render(PopConfirmComponent, {
    componentProperties: props,
    declarations: [
      IonDividerComponent,
      ButtonComponent,
      BadgeComponent,
      DropdownComponent,
      IonIconComponent,
      AlertComponent,
      InputComponent,
    ],
    imports: [FormsModule],
  });
};

describe('PopconfirmComponent', () => {
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
