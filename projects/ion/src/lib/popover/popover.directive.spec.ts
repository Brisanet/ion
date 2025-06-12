import { CommonModule } from '@angular/common';
import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DebugElement,
  ElementRef,
  Input,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { fireEvent, render, screen } from '@testing-library/angular';
import { Subject } from 'rxjs';

import { IonButtonModule } from '../button/button.module';
import {
  PopoverButtonsProps,
  PopoverPosition,
  PopoverTrigger,
} from '../core/types/popover';
import { IonDividerModule } from '../divider/divider.module';
import { IonPositionService } from '../position/position.service';
import { IonSharedModule } from '../shared.module';
import { IonPopoverComponent } from './component/popover.component';
import { IonPopoverDirective } from './popover.directive';
import { IonPopoverModule } from './popover.module';

const textButton = 'Teste';
const confirmText = 'Você tem certeza?';
const elementPosition = {
  left: 0,
  right: 12,
  top: 0,
  bottom: 0,
  width: 0,
  height: 0,
} as DOMRect;

const firstAction = jest.fn();
const secondAction = jest.fn();
const positionService = new IonPositionService();
const closePopover = new Subject<void>();

const CUSTOM_CLASS = 'custom-class';

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
      [ionPopoverTrigger]="ionPopoverTrigger"
      [ionPopoverStopCloseOnScroll]="ionPopoverStopCloseOnScroll"
      [ionPopoverAutoReposition]="true"
      (ionOnFirstAction)="ionOnFirstAction()"
      (ionOnSecondAction)="ionOnSecondAction()"
      ionPopoverCustomClass="${CUSTOM_CLASS}"
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
  @Input() ionPopoverTitle = confirmText;
  @Input() ionPopoverBody = 'e eu sou o body do popover';
  @Input() ionPopoverPosition = PopoverPosition.DEFAULT;
  @Input() ionPopoverKeep = false;
  @Input() ionPopoverIconClose = true;
  @Input() ionPopoverIcon = 'condominium';
  @Input() ionPopoverStopCloseOnScroll = false;
  @Input() ionPopoverActions: PopoverButtonsProps[] = [
    { label: 'action 1' },
    { label: 'action 2' },
  ];
  @Input() ionPopoverTrigger = PopoverTrigger.DEFAULT;

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
    providers: [{ provide: IonPositionService, useValue: positionService }],
  });
};

@Component({
  template: `
    <ion-button
      data-testid="hostPopoverWithClose"
      ionPopover
      [ionPopoverClose]="closePopover"
      [ionPopoverTitle]="ionPopoverTitle"
      [ionPopoverBody]="ref"
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
class HostTestWithClosePopoverComponent {
  ionPopoverTitle = confirmText;
  ionPopoverBody = 'e eu sou o body do popover';
  ionPopoverPosition = PopoverPosition.DEFAULT;
  closePopover = closePopover;
}

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

  it.each([
    { dataTestId: 'close-button', label: 'popover-close-button' },
    { dataTestId: 'action-1', label: 'action 1' },
    { dataTestId: 'action-2', label: 'action 2' },
  ])('should close pop when click in $label', async (type) => {
    await sut();
    fireEvent.click(screen.getByText(textButton));
    fireEvent.click(screen.getByTestId(`btn-${type.label}`));
    expect(screen.queryByTestId(`popover-${type.dataTestId}`)).toBeNull();
  });

  it.each([
    { dataTestId: 'action-1', label: 'voltar' },
    { dataTestId: 'action-2', label: 'continuar' },
  ])(
    'should not close pop when click in $label when to have keepOpenAfterAction',
    async (type) => {
      await sut({
        ionPopoverActions: [
          { label: 'voltar', keepOpenAfterAction: true },
          { label: 'continuar', keepOpenAfterAction: true },
        ],
      });
      fireEvent.click(screen.getByText(textButton));
      fireEvent.click(screen.getByTestId(`btn-${type.label}`));
      expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
    }
  );

  it('should emit an event when click on action-1', async () => {
    await sut();
    fireEvent.click(screen.getByText(textButton));
    fireEvent.click(screen.getByTestId('btn-action 1'));
    expect(firstAction).toHaveBeenCalled();
  });

  it('should emit an event when click on action-2', async () => {
    await sut();
    fireEvent.click(screen.getByText(textButton));
    fireEvent.click(screen.getByTestId('btn-action 2'));
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
    fireEvent.click(document);
    expect(screen.queryByTestId('ion-popover')).not.toBeInTheDocument();
  });

  it('should render popover with custom class', async () => {
    await sut();
    fireEvent.click(screen.getByTestId('hostPopover'));
    const popover = screen.getByTestId('ion-popover');
    expect(popover).toHaveClass(CUSTOM_CLASS);
  });

  it('should not close the popover when scrolling the popover', async () => {
    await sut();
    const directive = IonPopoverDirective.prototype;
    jest.spyOn(directive, 'onScroll');

    fireEvent.click(screen.getByTestId('hostPopover'));
    fireEvent.wheel(screen.getByTestId('ion-popover'));
    expect(directive.onScroll).toBeCalled();
    expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
  });

  it('should close the popover when scrolling the page', async () => {
    await sut();
    const directive = IonPopoverDirective.prototype;
    jest.spyOn(directive, 'onScroll');
    const hostElement = screen.getByTestId('hostPopover');
    fireEvent.click(hostElement);
    fireEvent.wheel(hostElement);
    expect(directive.onScroll).toBeCalled();
    expect(screen.queryByTestId('ion-popover')).not.toBeInTheDocument();
  });

  it('should not close the popover on scroll when its informed', async () => {
    await sut({
      ionPopoverStopCloseOnScroll: true,
    });
    const directive = IonPopoverDirective.prototype;
    jest.spyOn(directive, 'onScroll');
    const hostElement = screen.getByTestId('hostPopover');
    fireEvent.click(hostElement);
    fireEvent.wheel(hostElement);
    expect(directive.onScroll).toBeCalled();
    expect(screen.queryByTestId('ion-popover')).toBeVisible();
  });

  describe('trigger: hover', () => {
    afterEach(async () => {
      fireEvent.mouseLeave(screen.getByTestId('hostPopover'));
    });

    it('should open popover when mouseEnter when trigger is hover', async () => {
      await sut({ ionPopoverTrigger: PopoverTrigger.HOVER });
      fireEvent.mouseEnter(screen.getByTestId('hostPopover'));
      expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
    });

    it('should remove popover when mouseLeave on element when trigger is hover', async () => {
      await sut({ ionPopoverTrigger: PopoverTrigger.HOVER });
      fireEvent.mouseEnter(screen.getByTestId('hostPopover'));
      expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
      fireEvent.mouseLeave(screen.getByTestId('hostPopover'));
      expect(screen.queryByTestId('ion-popover')).not.toBeInTheDocument();
    });

    it('should remove popover when mouseLeave on popover when trigger is hover', async () => {
      await sut({ ionPopoverTrigger: PopoverTrigger.HOVER });
      fireEvent.mouseEnter(screen.getByTestId('hostPopover'));
      expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
      fireEvent.mouseLeave(screen.getByTestId('ion-popover').parentElement);
      expect(screen.queryByTestId('ion-popover')).not.toBeInTheDocument();
    });
  });
});

describe('Popover host tests', () => {
  let fixture: ComponentFixture<ContainerRefTestComponent>;
  let directive: IonPopoverDirective;
  let input: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [
        IonPopoverDirective,
        ViewContainerRef,
        {
          provide: ElementRef,
          useValue: {
            nativeElement: {
              getBoundingClientRect: (): DOMRect => elementPosition,
            },
          },
        },
      ],
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
    directive && directive.destroyComponent();
  });

  it('should open the popover when clicked', () => {
    directive.open();
    expect(screen.getByTestId('ion-popover')).toBeInTheDocument();
  });

  it('should click in host element and dispatch event', () => {
    fixture.detectChanges();
    const event = new Event('click');
    input.triggerEventHandler('click', event);
    expect(screen.getByText(textButton)).toBeInTheDocument();
  });

  it('should create element with the directive', () => {
    directive.open();
    expect(screen.getByText(textButton)).toHaveAttribute('ionpopover', '');
  });

  it.each(['icon-close', 'action-1', 'action-2'])(
    'should close popover when click in %s',
    (IonPopoverButton) => {
      jest.spyOn(IonPopoverDirective.prototype, 'destroyComponent');
      fireEvent.click(screen.getByText(textButton));
      fireEvent.click(screen.getByTestId(`popover-${IonPopoverButton}`));
      expect(directive.destroyComponent).toHaveBeenCalled();
    }
  );

  it('should not open a new popover when a popover is already opened', async () => {
    directive.open();
    directive.open();
    expect(await screen.findAllByTestId('ion-popover')).toHaveLength(1);
  });
});

describe('Popover disabled host component', () => {
  let fixtureDisabledBtn: ComponentFixture<ButtonTestDisabledComponent>;
  let directive: IonPopoverDirective;
  let input: DebugElement;

  beforeEach(() => {
    fixtureDisabledBtn = TestBed.configureTestingModule({
      providers: [
        IonPopoverDirective,
        ViewContainerRef,
        { provide: ElementRef },
      ],
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
    directive && directive.destroyComponent();
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

describe('Popover close subject', () => {
  it('should close the popover when the subject emits', async () => {
    await render(HostTestWithClosePopoverComponent, {
      componentProperties: {},
      imports: [CommonModule, IonPopoverModule, IonSharedModule],
      providers: [{ provide: IonPositionService, useValue: positionService }],
    });
    fireEvent.click(screen.getByTestId('hostPopoverWithClose'));

    closePopover.next();
    expect(screen.queryByTestId('ion-popover')).not.toBeInTheDocument();
  });
});
