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
import { IonPopoverComponent } from './component/popover.component';
import { IonPopoverDirective } from './popover.directive';

const textButton = 'Teste';
const confirmText = 'Você tem certeza?';
const elementPosition = { top: 10, left: 40 };

@Component({
  template: `
    <button
      data-testid="hostPopover"
      ionPopover
      ionPopoverTitle="${confirmText}"
      ionPopoverBody="crianças orfãos"
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
      ionPopoverTitle="Eu sou um popover"
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

describe('Directive: popover', () => {
  let fixture: ComponentFixture<ContainerRefTestComponent>;
  let directive: IonPopoverDirective;

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
  });

  afterEach(() => {
    directive.closePopover();
  });

  it('should create element with the directive', () => {
    directive.open(elementPosition);
    expect(screen.getByText(textButton)).toHaveAttribute('ionpopover', '');
  });

  it('should open the popover when clicked', () => {
    directive.open(elementPosition);
  });

  it('should open the popover when clicked', () => {
    fireEvent.click(screen.getByText(textButton));
    expect(screen.getByText(confirmText)).toBeInTheDocument();
  });

  it.each(['icon-close', 'action-1', 'action-2'])(
    'should close pop when click in %s',
    async (type) => {
      fireEvent.click(screen.getByText(textButton));
      fireEvent.click(screen.getByTestId(`popover-${type}`));
      expect(screen.queryByTestId(`popover-${type}`)).toBeNull();
    }
  );

  it.skip.each(['icon-close', 'action-1', 'action-2'])(
    'should close pop when click in %s',
    async (type) => {
      jest.spyOn(directive, 'closePopover');

      fireEvent.click(screen.getByText(textButton));
      fireEvent.click(screen.getByTestId(`popover-${type}`));

      expect(directive.closePopover).toHaveBeenCalled();
    }
  );

  it('should render the popover in position default', () => {
    fireEvent.click(screen.getByText(textButton));
    expect(screen.getByTestId('ion-popover')).toHaveClass(
      `sup-container-bottomRight`
    );
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
