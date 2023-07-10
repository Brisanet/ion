import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { IonButtonModule } from '../button/button.module';
import { PopoverPosition } from '../core/types/popover';
import { IonDividerModule } from '../divider/divider.module';
import { IonSharedModule } from '../shared.module';
import { IonPopoverComponent } from './component/popover.component';
import { IonPopoverDirective } from './popover.directive';
import { IonPopoverModule } from './popover.module';

const textButton = 'Teste';
const confirmText = 'Você tem certeza?';
const elementPosition = { top: 10, left: 40, bottom: 20, right: 10 };

const firstAction = jest.fn();
const secondAction = jest.fn();

@Component({
  template: `
    <ion-button
      data-testid="hostPopover"
      ionPopover
      [ionPopoverKeep]="ionPopoverKeep"
      [ionPopoverTitle]="ionPopoverTitle"
      [ionPopoverBody]="ref"
      [ionPopoverIcon]="ionPopoverIcon"
      [ionPopoverIconClose]="ionPopoverIconClose"
      [ionPopoverPosition]="ionPopoverPosition"
      [ionPopoverActions]="ionPopoverActions"
      (ionOnFirstAction)="ionOnFirstAction()"
      (ionOnSecondAction)="ionOnSecondAction()"
      class="get-test"
      style="margin-top: 50px;"
      label="${textButton}"
    >
    </ion-button>
    <ng-template #ref>
      <span data-testid="templateRef"
        >Ao concluir essa ação as ordens de serviço alocadas para o recurso
        ficarão órfãs.</span
      >
    </ng-template>
  `,
})
class HostTestComponent {
  ionPopoverTitle = confirmText;
  ionPopoverBody = 'e eu sou o body do popover';
  ionPopoverPosition = PopoverPosition.DEFAULT;
  ionPopoverKeep = false;
  ionPopoverIconClose = true;
  ionPopoverIcon = 'condominium';
  ionPopoverActions = [{ label: 'action 1' }, { label: 'action 2' }];

  ionOnFirstAction = firstAction;
  ionOnSecondAction = secondAction;
}
@Component({
  template: `
    <button
      data-testid="hostPopover"
      ionPopover
      ionPopoverTitle="${confirmText}"
      [ionPopoverBody]="ref"
      [ionPopoverIconClose]="true"
      ionPopoverPosition="${PopoverPosition.DEFAULT}"
      [ionPopoverActions]="[{ label: 'action 1' }, { label: 'action 2' }]"
      class="get-test"
      style="margin-top: 50px;"
    >
      ${textButton}
    </button>
    <ng-template #ref>
      <span data-testid="templateRef"
        >Ao concluir essa ação as ordens de serviço alocadas para o recurso
        ficarão órfãs.</span
      >
    </ng-template>
  `,
})
class ContainerRefTestComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
}
@Component({
  template: `
    <ion-button
      data-testid="hostPopover"
      ionPopover
      ionPopoverTitle="${confirmText}"
      [ionPopoverBody]="ref"
      [ionPopoverIconClose]="true"
      class="get-test"
      style="margin-top: 50px;"
      [label]="${textButton}"
      [disabled]="true"
    ></ion-button>
    <ng-template #ref>
      <span data-testid="templateRef">Eu sou o corpo do popover</span>
    </ng-template>
  `,
})
class ButtonTestDisabledComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;
  public disabled = true;
}

const sut = async (props: Partial<HostTestComponent> = {}): Promise<void> => {
  await render(HostTestComponent, {
    componentProperties: props,
    imports: [CommonModule, IonPopoverModule, IonSharedModule],
  });
};

describe('Directive: popover', () => {
  it('should render without popover', async () => {
    await sut();
    expect(screen.queryByTestId('ion-popover')).not.toBeInTheDocument();
  });

  it('should create popover', async () => {
    await sut();
    fireEvent.click(screen.getByTestId('hostPopover'));
    expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('popover-icon-close'));
  });

  it('should open the popover when clicked', async () => {
    await sut();
    fireEvent.click(screen.getByText(textButton));
    expect(screen.getByText(confirmText)).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('popover-icon-close'));
  });

  it('should close popover when click outside', async () => {
    await sut();
    fireEvent.click(screen.getByText(textButton));

    const fakeDiv = document.createElement('div');
    fakeDiv.setAttribute('data-testid', 'fake-div');
    document.body.appendChild(fakeDiv);
    fireEvent.click(fakeDiv);

    expect(screen.queryAllByTestId('popover-icon-close')).toHaveLength(0);
  });

  it('should not close popover when click outside', async () => {
    await sut({ ionPopoverKeep: true });
    fireEvent.click(screen.getByText(textButton));

    const fakeDiv = document.createElement('div');
    fakeDiv.setAttribute('data-testid', 'fake-div');
    document.body.appendChild(fakeDiv);
    fireEvent.click(fakeDiv);

    expect(screen.queryAllByTestId('popover-icon-close')).toHaveLength(1);
  });

  it.each(['icon-close', 'action-1', 'action-2'])(
    'should close pop when click in %s',
    async (type) => {
      await sut();
      fireEvent.click(screen.getByText(textButton));
      fireEvent.click(screen.getByTestId(`popover-${type}`));
      expect(screen.queryByTestId(`popover-${type}`)).toBeNull();
    }
  );

  it('should emit an event when click on action-1', async () => {
    await sut();
    fireEvent.click(screen.getByText(textButton));
    fireEvent.click(screen.getByTestId('popover-action-1'));
    expect(firstAction).toHaveBeenCalled();
  });

  it('should emit an event when click on action-2', async () => {
    await sut();
    fireEvent.click(screen.getByText(textButton));
    fireEvent.click(screen.getByTestId('popover-action-2'));
    expect(secondAction).toHaveBeenCalled();
  });

  it.each(Object.values(PopoverPosition))(
    'should render the popover in position %s',
    async (ionPopoverPosition) => {
      await sut({ ionPopoverPosition: ionPopoverPosition });
      fireEvent.click(screen.getByText(textButton));
      expect(screen.getByTestId('ion-popover')).toHaveClass(
        `ion-popover__sup-container--${ionPopoverPosition}`
      );
      fireEvent.click(screen.getByTestId('popover-icon-close'));
    }
  );

  it('should close popover when clicking outside of popover and button', async () => {
    await sut();
    fireEvent.click(screen.getByText(textButton));
    expect(screen.getByTestId('ion-popover')).toBeTruthy();
    fireEvent.click(document);
    expect(screen.queryByTestId('ion-popover')).toBeFalsy();
  });
});

describe('Popover host tests', () => {
  let fixture: ComponentFixture<ContainerRefTestComponent>;
  let directive: IonPopoverDirective;
  let input: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [IonPopoverDirective, ViewContainerRef],
      declarations: [
        ContainerRefTestComponent,
        IonPopoverComponent,
        IonPopoverDirective,
      ],
      imports: [FormsModule, IonButtonModule, IonDividerModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [IonPopoverComponent] },
      })
      .createComponent(ContainerRefTestComponent);

    fixture.detectChanges();
    directive = fixture.debugElement.injector.get(IonPopoverDirective);
    input = fixture.debugElement.query(By.directive(IonPopoverDirective));
  });

  afterEach(() => {
    directive && directive.closePopover();
  });

  it('should open the popover when clicked', () => {
    directive.open(elementPosition);
    expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
  });

  it('should click in host element and dispatch event', () => {
    fixture.detectChanges();
    const event = new Event('click');
    input.triggerEventHandler('click', event);
    expect(screen.getByText(textButton)).toBeInTheDocument();
  });

  it('should create element with the directive', () => {
    directive.open(elementPosition);
    expect(screen.getByText(textButton)).toHaveAttribute('ionpopover', '');
  });

  it.each(['icon-close', 'action-1', 'action-2'])(
    'should close popover when click in %s',
    (IonPopoverButton) => {
      jest.spyOn(IonPopoverDirective.prototype, 'closePopover');
      fireEvent.click(screen.getByText(textButton));
      fireEvent.click(screen.getByTestId(`popover-${IonPopoverButton}`));
      expect(directive.closePopover).toHaveBeenCalled();
    }
  );

  it('should not open a new popover when a popover is already opened', () => {
    directive.open(elementPosition);
    directive.open(elementPosition);
    expect(screen.queryAllByTestId('ion-popover')).toHaveLength(1);
  });
});

describe('Popover disabled host component', () => {
  let fixtureDisabledBtn: ComponentFixture<ButtonTestDisabledComponent>;
  let directive: IonPopoverDirective;
  let input: DebugElement;

  beforeEach(() => {
    fixtureDisabledBtn = TestBed.configureTestingModule({
      providers: [IonPopoverDirective, ViewContainerRef],
      declarations: [
        ButtonTestDisabledComponent,
        IonPopoverComponent,
        IonPopoverDirective,
      ],
      imports: [IonButtonModule, IonDividerModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [IonPopoverComponent] },
      })
      .createComponent(ButtonTestDisabledComponent);

    fixtureDisabledBtn.detectChanges();
    directive =
      fixtureDisabledBtn.debugElement.injector.get(IonPopoverDirective);
    input = fixtureDisabledBtn.debugElement.query(
      By.directive(IonPopoverDirective)
    );
  });

  afterEach(() => {
    directive && directive.closePopover();
  });

  it('should not open popover when the button is disabled', () => {
    setTimeout(() => {
      fixtureDisabledBtn.detectChanges();
      const event = new Event('click');
      input.triggerEventHandler('click', event);
      expect(event).not.toBeCalled();
      expect(screen.queryAllByText(textButton)).toHaveLength(0);
    });
  });

  it('should return false if element is disabled', () => {
    const element = document.createElement('ion-button');
    element.setAttribute('ng-reflect-disabled', 'true');
    const isEnable = directive.elementIsEnabled(element);
    expect(isEnable).toBe(false);
  });
});
