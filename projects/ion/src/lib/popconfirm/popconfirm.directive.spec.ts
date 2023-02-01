import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import {
  Component,
  ViewChild,
  ViewContainerRef,
  DebugElement,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { fireEvent, screen } from '@testing-library/angular';
import { IonBadgeComponent } from '../badge/badge.component';
import { IonDividerComponent } from '../divider/divider.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { IonButtonComponent } from './../button/button.component';
import { IonIconComponent } from './../icon/icon.component';

import { PopConfirmComponent } from './popconfirm.component';
import { PopConfirmDirective, PopPosition } from './popconfirm.directive';
import { By } from '@angular/platform-browser';
import { InputComponent } from '../input/input.component';
import { FormsModule } from '@angular/forms';

const textButton = 'Teste';
const confirmText = 'Confirmar';
const elementPosition: PopPosition = { top: 10, left: 40 };

@Component({
  template: `
    <button
      ionPopConfirm
      ionPopConfirmTitle="Você tem certeza?"
      (ionOnConfirm)="confirm()"
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
      ionPopConfirm
      ionPopConfirmTitle="teste demais"
      type="ghost"
      size="sm"
      [disabled]="true"
    ></ion-button>
  `,
})
class ButtonTestDisabledComponent {
  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  public disabled = true;
}

describe('Directive: Popconfirm', () => {
  let fixture: ComponentFixture<ContainerRefTestComponent>;
  let directive: PopConfirmDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [PopConfirmDirective, ViewContainerRef],
      declarations: [
        ContainerRefTestComponent,
        IonBadgeComponent,
        DropdownComponent,
        IonButtonComponent,
        IonIconComponent,
        PopConfirmComponent,
        IonDividerComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [PopConfirmComponent],
        },
      })
      .createComponent(ContainerRefTestComponent);

    fixture.detectChanges();
    directive = fixture.debugElement.injector.get(PopConfirmDirective);
  });

  afterEach(() => {
    directive.closePopConfirm();
  });

  it('should create element with the directive', () => {
    directive.open(elementPosition);
    expect(screen.getByText(textButton)).toHaveAttribute('ionpopconfirm', '');
  });

  it('should open the popconfirm when clicked', () => {
    directive.open(elementPosition);
  });

  it('should open the popconfirm when clicked', () => {
    directive.open(elementPosition);
    fireEvent.click(screen.getByText(textButton));
    expect(screen.getByText(confirmText)).toBeInTheDocument();
  });

  it('should close pop when click in cancel', () => {
    jest.spyOn(directive, 'closePopConfirm');

    directive.open(elementPosition);
    fireEvent.click(screen.getByTestId('pop-cancel-btn'));

    expect(directive.closePopConfirm).toHaveBeenCalled();
  });

  it('should close pop when click in confirm', () => {
    jest.spyOn(directive, 'closePopConfirm');

    directive.open(elementPosition);
    fireEvent.click(screen.getByTestId('pop-confirm-btn'));

    expect(directive.closePopConfirm).toHaveBeenCalled();
  });

  it('should click in confirm button', () => {
    directive.open(elementPosition);
    fireEvent.click(screen.getByTestId('pop-confirm-btn'));
    expect(screen.queryByTestId('pop-confirm-btn')).not.toBeInTheDocument();
  });

  it('should not open new popconfirm when be opened', () => {
    directive.open(elementPosition);
    directive.open(elementPosition);
    expect(screen.queryAllByTestId('pop-confirm-btn')).toHaveLength(1);
  });
});

describe('Popconfirm host tests', () => {
  let fixture: ComponentFixture<ContainerRefTestComponent>;
  let directive: PopConfirmDirective;
  let input: DebugElement;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [PopConfirmDirective, ViewContainerRef],
      declarations: [
        ContainerRefTestComponent,
        IonBadgeComponent,
        DropdownComponent,
        IonButtonComponent,
        IonIconComponent,
        PopConfirmComponent,
        IonDividerComponent,
        PopConfirmDirective,
        InputComponent,
      ],
      imports: [FormsModule],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [PopConfirmComponent],
        },
      })
      .createComponent(ContainerRefTestComponent);

    fixture.detectChanges();
    directive = fixture.debugElement.injector.get(PopConfirmDirective);
    input = fixture.debugElement.query(By.directive(PopConfirmDirective));
  });

  afterEach(() => {
    directive.closePopConfirm();
  });

  it('should click in host element and dispath event', () => {
    fixture.detectChanges();
    const event = new Event('click');
    input.triggerEventHandler('click', event);

    expect(screen.getByText(confirmText)).toBeInTheDocument();
  });
});

describe('Popconfirm disabled host component', () => {
  let fixtureDisabledBtn: ComponentFixture<ButtonTestDisabledComponent>;
  let directive: PopConfirmDirective;
  let input: DebugElement;

  beforeEach(() => {
    fixtureDisabledBtn = TestBed.configureTestingModule({
      providers: [PopConfirmDirective, ViewContainerRef],
      declarations: [
        ButtonTestDisabledComponent,
        IonBadgeComponent,
        DropdownComponent,
        IonButtonComponent,
        IonIconComponent,
        PopConfirmComponent,
        IonDividerComponent,
        PopConfirmDirective,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [PopConfirmComponent],
        },
      })
      .createComponent(ButtonTestDisabledComponent);

    fixtureDisabledBtn.detectChanges();
    directive =
      fixtureDisabledBtn.debugElement.injector.get(PopConfirmDirective);
    input = fixtureDisabledBtn.debugElement.query(
      By.directive(PopConfirmDirective)
    );
  });

  afterEach(() => {
    directive.closePopConfirm();
  });

  it('should not open popconfirm when the button is disabled', () => {
    setTimeout(() => {
      fixtureDisabledBtn.detectChanges();
      const event = new Event('click');
      input.triggerEventHandler('click', event);

      expect(event).not.toBeCalled();
      expect(screen.queryAllByText(confirmText)).toHaveLength(0);
    });
  });
});
