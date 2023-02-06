import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  render,
  RenderResult,
  screen,
  fireEvent,
} from '@testing-library/angular';
import { ButtonModule } from '../button/button.module';
import { IonModalComponent } from '../modal/component/modal.component';
import { TooltipModule } from '../tooltip/tooltip.module';
import { BodyMockComponent } from './../card/mock/body-mock.component';
import { IonIndicatorComponent } from './indicator.component';
import {
  buttonEmitterConfig,
  buttonModalConfig,
  buttonRedirectConfig,
} from './mocks/indicator-button-config';
import { IonIndicatorButtonConfiguration } from '../core/types/indicator';

interface IonIndicatorProps {
  title?: string;
  tooltipText?: string;
  value?: string | number;
  secondValue?: string | number;
  buttonConfig?: IonIndicatorButtonConfiguration;
}

@NgModule({
  entryComponents: [IonModalComponent, BodyMockComponent],
})
class EntryComponentModule {}

const sut = async (
  props?: IonIndicatorProps
): Promise<RenderResult<IonIndicatorComponent>> => {
  return await render(IonIndicatorComponent, {
    imports: [CommonModule, ButtonModule, TooltipModule, EntryComponentModule],
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

  fit('Should render valueElement/secondValueElement when they receive string values', async () => {
    const valueText = 'testing';
    const secondText = 'testing';
    await sut({ value: valueText, secondValue: secondText });

    expect(valueElement().textContent).toBe(valueText);
    expect(secondValueElement().textContent).toBe(secondText);
  });

  fit('Should render valueElement/secondValueElement when they receive number values', async () => {
    const valueNumber = 12;
    const secondValueNumber = 14;
    await sut({ value: valueNumber, secondValue: secondValueNumber });

    expect(valueElement().textContent).toBe(valueNumber.toString());
    expect(secondValueElement().textContent).toBe(secondValueNumber.toString());
  });

  fit('Should render footer and button emitter when receive buttonConfig with this type', async () => {
    await sut({ buttonConfig: buttonEmitterConfig });

    expect(footer()).toBeInTheDocument();
    expect(buttonEmitter()).toBeInTheDocument();
  });

  fit('Should render footer and button redirect when receive buttonConfig with this type', async () => {
    await sut({ buttonConfig: buttonRedirectConfig });

    expect(footer()).toBeInTheDocument();
    expect(buttonRedirect()).toBeInTheDocument();
  });

  fit('Should render footer and button modal when receive buttonConfig with this type', async () => {
    await sut({ buttonConfig: buttonModalConfig });

    expect(footer()).toBeInTheDocument();
    expect(buttonModal()).toBeInTheDocument();
  });

  fit('Should call emitter when call emitButtonClick function ', async () => {
    const renderResult = await sut();
    const componentInstance = renderResult.fixture.componentInstance;
    const spy = jest.spyOn(componentInstance.ionClick, 'emit');

    componentInstance.emitButtonClick();
    expect(spy).toHaveBeenCalled();
  });

  fit('Should sanitize url and redirect when call redirectTo function', async () => {
    const spy = jest.spyOn(window, 'open');
    const renderResult = await sut({ buttonConfig: buttonRedirectConfig });
    const componentInstance = renderResult.fixture.componentInstance;

    componentInstance.redirectTo();
    expect(componentInstance.safeUrl).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(
      componentInstance.safeUrl as string,
      '_blank'
    );
  });

  fit('Should open modal when call openModal function ', async () => {
    const renderResult = await sut({ buttonConfig: buttonModalConfig });
    const componentInstance = renderResult.fixture.componentInstance;
    const spy = jest.spyOn(componentInstance.modalEvent, 'emit');

    componentInstance.openModal();
    const modalTitle = screen.getByText(buttonModalConfig.modalConfig.title);
    const modalButton = screen.getByText(
      buttonModalConfig.modalConfig.footer.primaryButton.label
    );

    expect(modalTitle).toBeInTheDocument();
    fireEvent.click(modalButton);
    expect(modalTitle).not.toBeInTheDocument();
    expect(spy).toHaveBeenCalled();
  });
});
