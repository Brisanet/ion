import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  render,
  RenderResult,
  screen,
  fireEvent,
} from '@testing-library/angular';
import { ButtonModule } from '../button/button.module';
import { IonIndicatorProps } from '../core/types';
import { IonModalComponent } from '../modal/component/modal.component';
import { TooltipModule } from '../tooltip/tooltip.module';
import { BodyMockComponent } from './../card/mock/body-mock.component';
import { IonIndicatorComponent } from './indicator.component';
import {
  buttonEmitterConfig,
  buttonModalConfig,
  buttonRedirectConfig,
} from './mocks/indicator-button-config';

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

const elements = {
  title: 'ion-indicator-title',
  tooltip: 'ion-indicator-tooltip',
  value: 'ion-indicator-value',
  secondValue: 'ion-indicator-second-value',
  footer: 'ion-indicator-footer',
  buttonEmitter: 'ion-indicator-button-emitter',
  buttonRedirect: 'ion-indicator-button-redirect',
  buttonModal: 'ion-indicator-button-modal',
};

const getElementByTestId = (key: keyof typeof elements): HTMLElement =>
  screen.queryByTestId(elements[key]);

describe('IonIndicatorComponent', () => {
  it('Should render with default values', async () => {
    await sut();
    const defaultTitle = 'Ion Indicator';
    expect(screen.getByTestId('ion-indicator')).toBeInTheDocument();
    expect(getElementByTestId('title').textContent).toBe(defaultTitle);
    expect(getElementByTestId('value').textContent).toBeFalsy();
    expect(getElementByTestId('secondValue').textContent).toBeFalsy();
    expect(getElementByTestId('tooltip')).not.toBeInTheDocument();
    expect(getElementByTestId('footer')).not.toBeInTheDocument();
  });

  it('Should render title with different value when passed a value', async () => {
    const testTitle = 'testing ion indicator title';
    await sut({ title: testTitle });

    expect(getElementByTestId('title').textContent).toBe(testTitle);
  });

  it('Should render ion-icon when passed tooltipText', async () => {
    const testTooltipText = 'testing ion indicator tooltip';
    await sut({ tooltipText: testTooltipText });

    expect(getElementByTestId('tooltip')).toBeInTheDocument();
  });

  it('Should render valueElement/secondValueElement when they receive string values', async () => {
    const valueText = 'testing';
    const secondText = 'testing';
    await sut({ value: valueText, secondValue: secondText });

    expect(getElementByTestId('value').textContent).toBe(valueText);
    expect(getElementByTestId('secondValue').textContent).toBe(secondText);
  });

  it('Should render valueElement/secondValueElement when they receive number values', async () => {
    const valueNumber = 12;
    const secondValueNumber = 14;
    await sut({ value: valueNumber, secondValue: secondValueNumber });

    expect(getElementByTestId('value').textContent).toBe(
      valueNumber.toString()
    );
    expect(getElementByTestId('secondValue').textContent).toBe(
      secondValueNumber.toString()
    );
  });

  it('Should render footer and button emitter when receive buttonConfig with this type', async () => {
    await sut({ buttonConfig: buttonEmitterConfig });

    expect(getElementByTestId('footer')).toBeInTheDocument();
    expect(getElementByTestId('buttonEmitter')).toBeInTheDocument();
  });

  it('Should render footer and button redirect when receive buttonConfig with this type', async () => {
    await sut({ buttonConfig: buttonRedirectConfig });

    expect(getElementByTestId('footer')).toBeInTheDocument();
    expect(getElementByTestId('buttonRedirect')).toBeInTheDocument();
  });

  it('Should render footer and button modal when receive buttonConfig with this type', async () => {
    await sut({ buttonConfig: buttonModalConfig });

    expect(getElementByTestId('footer')).toBeInTheDocument();
    expect(getElementByTestId('buttonModal')).toBeInTheDocument();
  });

  it('Should call emitter when call emitButtonClick function ', async () => {
    const renderResult = await sut({ buttonConfig: buttonEmitterConfig });
    const componentInstance = renderResult.fixture.componentInstance;
    const spy = jest.spyOn(componentInstance.ionClick, 'emit');

    componentInstance.handleButtonClick(componentInstance.buttonConfig.type);
    expect(spy).toHaveBeenCalled();
  });

  it('Should sanitize url and redirect when call redirectTo function', async () => {
    const spy = jest.spyOn(window, 'open');
    const renderResult = await sut({ buttonConfig: buttonRedirectConfig });
    const componentInstance = renderResult.fixture.componentInstance;

    componentInstance.handleButtonClick(componentInstance.buttonConfig.type);
    expect(componentInstance.safeUrl).toBeTruthy();
    expect(spy).toHaveBeenCalledWith(
      componentInstance.safeUrl as string,
      '_blank'
    );
  });

  it('Should open modal when call openModal function ', async () => {
    const renderResult = await sut({ buttonConfig: buttonModalConfig });
    const componentInstance = renderResult.fixture.componentInstance;
    const spy = jest.spyOn(componentInstance.modalEvent, 'emit');

    componentInstance.handleButtonClick(componentInstance.buttonConfig.type);
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
