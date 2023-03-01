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

@Component({
  template: `
    <ion-button
      data-testid="hostPopover"
      ionPopover
      [ionPopoverTitle]="ionPopoverTitle"
      [ionPopoverBody]="ionPopoverBody"
      [ionPopoverIcon]="ionPopoverIcon"
      [ionPopoverIconClose]="ionPopoverIconClose"
      [ionPopoverPosition]="ionPopoverPosition"
      [ionPopoverActions]="ionPopoverActions"
      (ionOnFirstAction)="confirm()"
      class="get-test"
      style="margin-top: 50px;"
      label="${textButton}"
    >
    </ion-button>
  `,
})
class HostTestComponent {
  ionPopoverTitle = confirmText;
  ionPopoverBody = 'e eu sou o body do popover';
  ionPopoverPosition = PopoverPosition.DEFAULT;
  ionPopoverIconClose = true;
  ionPopoverIcon = 'condominium';
  ionPopoverActions = [{ label: 'actions 1' }, { label: 'action 2' }];
}

@Component({
  template: `
    <button
      data-testid="hostPopover"
      ionPopover
      ionPopoverTitle="${confirmText}"
      ionPopoverBody="Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs."
      [ionPopoverIconClose]="true"
      ionPopoverPosition="${PopoverPosition.DEFAULT}"
      [ionPopoverActions]="[{ label: 'action 1' }, { label: 'action 2' }]"
      (ionOnFirstAction)="confirm()"
      class="get-test"
      style="margin-top: 50px;"
    >
      ${textButton}
    </button>
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
      ionPopoverBody="Eu sou o corpo do popover"
      ionPopoverIconClose="true"
      class="get-test"
      style="margin-top: 50px;"
      [label]="${textButton}"
      [disabled]="true"
    ></ion-button>
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

  it.each(['icon-close', 'action-1', 'action-2'])(
    'should close pop when click in %s',
    async (type) => {
      await sut();
      fireEvent.click(screen.getByText(textButton));
      fireEvent.click(screen.getByTestId(`popover-${type}`));
      expect(screen.queryByTestId(`popover-${type}`)).toBeNull();
    }
  );

  it.each(Object.values(PopoverPosition))(
    'should render the popover in position %s',
    async (ionPopoverPosition) => {
      await sut({ ionPopoverPosition: ionPopoverPosition });
      fireEvent.click(screen.getByText(textButton));
      expect(screen.getByTestId('ion-popover')).toHaveClass(
        `sup-container-${ionPopoverPosition}`
      );
      fireEvent.click(screen.getByTestId('popover-icon-close'));
    }
  );
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
        set: {
          entryComponents: [IonPopoverComponent],
        },
      })
      .createComponent(ContainerRefTestComponent);

    fixture.detectChanges();
    directive = fixture.debugElement.injector.get(IonPopoverDirective);
    input = fixture.debugElement.query(By.directive(IonPopoverDirective));
  });

  afterEach(() => {
    directive.closePopover();
  });

  it('should click in host element and dispath event', () => {
    fixture.detectChanges();
    const event = new Event('click');
    input.triggerEventHandler('click', event);

    expect(screen.getByText(textButton)).toBeInTheDocument();
  });

  it('should create element with the directive', () => {
    directive.open(elementPosition);
    expect(screen.getByText(textButton)).toHaveAttribute('ionpopover', '');
  });

  it('should open the popover when clicked', () => {
    directive.open(elementPosition);
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
        set: {
          entryComponents: [IonPopoverComponent],
        },
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
    directive.closePopover();
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
});
