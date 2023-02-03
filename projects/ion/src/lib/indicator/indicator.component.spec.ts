import {
  IonIndicatorButtonConfiguration,
  IonIndicatorButtonType,
} from './models/indicator';
import { CommonModule } from '@angular/common';
import { render, screen, fireEvent } from '@testing-library/angular';
import { ButtonModule } from '../button/button.module';
import { IonModalComponent } from '../modal/component/modal.component';
import { TooltipModule } from '../tooltip/tooltip.module';
import { BodyMockComponent } from './../card/mock/body-mock.component';
import { IonIndicatorComponent } from './indicator.component';

interface IonIndicatorProps {
  title?: string;
  tooltipText?: string;
  value?: string | number;
  secondValue?: string | number;
  buttonConfig?: IonIndicatorButtonConfiguration;
}

const sut = async (props?: IonIndicatorProps): Promise<void> => {
  await render(IonIndicatorComponent, {
    imports: [CommonModule, CommonModule, ButtonModule, TooltipModule],
    declarations: [BodyMockComponent, IonIndicatorComponent, IonModalComponent],
    componentProperties: props,
  });
};

const title = (): HTMLElement => screen.queryByTestId('ion-indicator-title');
const tooltip = (): HTMLElement =>
  screen.queryByTestId('ion-indicator-tooltip');
const valueElement = (): HTMLElement =>
  screen.queryByTestId('ion-indicator-value');
const secondValueElement = (): HTMLElement =>
  screen.queryByTestId('ion-indicator-second-value');
const footer = (): HTMLElement => screen.queryByTestId('ion-indicator-footer');
const buttonEmitter = (): HTMLElement =>
  screen.queryByTestId('ion-indicator-button-emitter');
const buttonRedirect = (): HTMLElement =>
  screen.queryByTestId('ion-indicator-button-redirect');
const buttonModal = (): HTMLElement =>
  screen.queryByTestId('ion-indicator-button-modal');

// @Input() title = 'Ion Indicator';
// @Input() tooltipText?: string;
// @Input() value?: number | string;
// @Input() secondValue?: number | string;
// @Input() buttonConfig?: IonIndicatorButtonConfiguration;
// @Output() ionClick = new EventEmitter();
// @Output() modalEvent = new EventEmitter<IonModalResponse | unknown>();

fdescribe('IonIndicatorComponent', () => {
  fit('Should render with default values', async () => {
    await sut();
    const defaultTitle = 'Ion Indicator';
    expect(screen.getByTestId('ion-indicator')).toBeInTheDocument();
    expect(title().textContent).toBe(defaultTitle);
    expect(valueElement().textContent).toBeFalsy();
    expect(secondValueElement().textContent).toBeFalsy();
    expect(tooltip()).not.toBeInTheDocument();
    expect(footer()).not.toBeInTheDocument();
  });

  fit('Should render title with different value when passed a value', async () => {
    const testTitle = 'testing ion indicator title';
    await sut({ title: testTitle });

    expect(title().textContent).toBe(testTitle);
  });

  fit('Should render ion-icon when passed tooltipText', async () => {
    const testTooltipText = 'testing ion indicator tooltip';
    await sut({ tooltipText: testTooltipText });

    expect(tooltip()).toBeInTheDocument();
  });

  fit('Should render valueElement and secondValueElement when they receive string values', async () => {
    const valueText = 'testing';
    const secondText = 'testing';
    await sut({ value: valueText, secondValue: secondText });

    expect(valueElement().textContent).toBe(valueText);
    expect(secondValueElement().textContent).toBe(secondText);
  });

  fit('Should render valueElement and secondValueElement when they receive number values', async () => {
    const valueNumber = 12;
    const secondValueNumber = 14;
    await sut({ value: valueNumber, secondValue: secondValueNumber });

    expect(valueElement().textContent).toBe(valueNumber.toString());
    expect(secondValueElement().textContent).toBe(secondValueNumber.toString());
  });

  fit('Should render footer and button emitter when receive buttonConfig with this type', async () => {
    const buttonEmitter: IonIndicatorButtonConfiguration = {
      label: 'Detalhes',
      type: IonIndicatorButtonType.Emitter,
    };
    await sut({ buttonConfig: buttonEmitter });

    expect(footer()).toBeInTheDocument();
    expect(footer()).toBeInTheDocument();
  });

  fit('Should render footer and button redirect when receive buttonConfig with this type', async () => {
    const buttonEmitter: IonIndicatorButtonConfiguration = {
      label: 'Link',
      type: IonIndicatorButtonType.Redirect,
      redirectLink: 'https://github.com/Brisanet/ion',
    };
    await sut({ buttonConfig: buttonEmitter });

    expect(footer()).toBeInTheDocument();
    expect(footer()).toBeInTheDocument();
  });

  fit('Should render footer and button modal when receive buttonConfig with this type', async () => {
    const buttonEmitter: IonIndicatorButtonConfiguration = {
      label: 'Abrir modal',
      type: IonIndicatorButtonType.Modal,
      componentToModal: BodyMockComponent,
    };
    await sut({ buttonConfig: buttonEmitter });

    expect(footer()).toBeInTheDocument();
    expect(footer()).toBeInTheDocument();
  });
});
