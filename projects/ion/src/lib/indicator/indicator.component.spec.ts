import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  RenderResult,
  fireEvent,
  render,
  screen,
} from '@testing-library/angular';
import { IonButtonModule } from '../button/button.module';
import { IonIndicatorProps } from '../core/types';
import { IonIconModule } from '../icon/icon.module';
import { IonModalComponent } from '../modal/component/modal.component';
import { IonNoDataModule } from '../no-data/no-data.module';
import { IonPopoverModule } from '../popover/popover.module';
import { IonSharedModule } from '../shared.module';
import { IonSkeletonModule } from '../skeleton/skeleton.module';
import { IonSpinnerModule } from '../spinner/spinner.module';
import { IonTooltipModule } from '../tooltip/tooltip.module';
import { BodyMockComponent } from './../card/mock/body-mock.component';
import { IonIndicatorComponent } from './indicator.component';
import { IonIndicatorModule } from './indicator.module';
import {
  buttonEmitterConfig,
  buttonModalConfig,
  buttonRedirectConfig,
} from './mocks/indicator-button-config';
import { IndicatorPopoverComponent } from './mocks/indicator-popover.component';

@NgModule({
  entryComponents: [IonModalComponent, BodyMockComponent],
})
class EntryComponentModule {}

const sut = async (
  props?: IonIndicatorProps
): Promise<RenderResult<IonIndicatorComponent>> => {
  return await render(IonIndicatorComponent, {
    imports: [
      CommonModule,
      IonButtonModule,
      IonIconModule,
      IonTooltipModule,
      EntryComponentModule,
      IonSkeletonModule,
      IonSpinnerModule,
      IonPopoverModule,
      IonNoDataModule,
    ],
    declarations: [BodyMockComponent, IonIndicatorComponent, IonModalComponent],
    componentProperties: props,
  });
};

const mockFirstAction = jest.fn();
const mockSecondAction = jest.fn();

const sutIndicatorWithPopover = async (): Promise<
  RenderResult<IndicatorPopoverComponent>
> => {
  return await render(IndicatorPopoverComponent, {
    imports: [CommonModule, IonSharedModule, IonIndicatorModule],
    declarations: [IndicatorPopoverComponent],
    componentProperties: {
      firstAction: mockFirstAction,
      secondAction: mockSecondAction,
    },
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
  preview: 'ion-indicator-preview',
  spinner: 'ion-indicator-spinner',
  error: 'ion-indicator-error',
  noData: 'ion-no-data-icon',
};

const getElementByTestId = (key: keyof typeof elements): HTMLElement =>
  screen.queryByTestId(elements[key]);

describe('IonIndicatorComponent', () => {
  it('Should render with default values', async () => {
    await sut();
    const defaultTitle = 'Ion Indicator';
    expect(screen.getByTestId('ion-indicator')).toBeInTheDocument();
    expect(getElementByTestId('title').textContent).toBe(defaultTitle);
    expect(screen.queryByTestId('ion-indicator-value')).toBeFalsy();
    expect(screen.queryByTestId('ion-indicator-second-value')).toBeFalsy();
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

  it('Should hide all values when is preview', async () => {
    const testTitle = 'Indicator preview';
    const valueNumber = 12;
    const secondValueNumber = 14;
    await sut({
      value: valueNumber,
      secondValue: secondValueNumber,
      title: testTitle,
      preview: true,
    });

    expect(getElementByTestId('title')).not.toBeInTheDocument();
    expect(getElementByTestId('value')).not.toBeInTheDocument();
    expect(getElementByTestId('secondValue')).not.toBeInTheDocument();
  });

  it('Should render skeleton when in preview', async () => {
    await sut({
      preview: true,
    });
    expect(getElementByTestId('preview')).toBeInTheDocument();
  });

  it('Should render spinner when is loading', async () => {
    await sut({
      loading: true,
    });
    expect(getElementByTestId('spinner')).toBeInTheDocument();
  });

  it('Should render error msg', async () => {
    await sut({
      error: true,
    });
    expect(getElementByTestId('error')).toBeInTheDocument();
  });

  it('Should render no value msg', async () => {
    await sut({
      value: '',
    });
    expect(getElementByTestId('noData')).toBeInTheDocument();
  });
});

describe('IonIndicatorComponent with popover button', () => {
  it('Should render a open popover button when the button type is popover', async () => {
    await sutIndicatorWithPopover();
    expect(
      screen.getByTestId('ion-indicator-button-popover')
    ).toBeInTheDocument();
  });
});

describe('IonIndicatorComponent with a opened popover', () => {
  beforeEach(async () => {
    await sutIndicatorWithPopover();
    const buttonOpenPopover = screen.getByTestId(
      'ion-indicator-button-popover'
    );
    fireEvent.click(buttonOpenPopover);
  });

  afterEach(() => {
    mockFirstAction.mockClear();
    mockSecondAction.mockClear();
  });

  it('Should open a popover when the button is clicked', async () => {
    expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
  });

  it('Should render the popover title informed', async () => {
    expect(screen.getByText('Com botão que abre popover')).toBeInTheDocument();
  });

  it('Should render the popover icon informed', async () => {
    expect(document.querySelector('#ion-icon-box')).toBeInTheDocument();
  });

  it('Should render the popover body informed', async () => {
    expect(screen.getByTestId('ion-popover-body')).toBeInTheDocument();
  });

  it.each(['action-1', 'action-2'])(
    'Should render the popover %s informed',
    async (IonPopoverButton) => {
      expect(
        screen.getByTestId(`popover-${IonPopoverButton}`)
      ).toBeInTheDocument();
    }
  );

  it('Should execute action 1 of the popover when the button is clicked', async () => {
    fireEvent.click(screen.getByTestId('btn-action 1'));
    expect(mockFirstAction).toHaveBeenCalled();
    expect(mockFirstAction).toHaveBeenCalledTimes(1);
  });

  it('Should execute action 2 of the popover when the button is clicked', async () => {
    fireEvent.click(screen.getByTestId('btn-action 2'));
    expect(mockSecondAction).toHaveBeenCalled();
    expect(mockSecondAction).toHaveBeenCalledTimes(1);
  });
});
