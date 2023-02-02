import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { screen } from '@testing-library/angular';
import { BadgeComponent } from '../badge/badge.component';
import { IonDividerComponent } from '../divider/divider.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ButtonComponent } from './../button/button.component';
import { IonIconComponent } from './../icon/icon.component';

import { PopoverComponent } from './popover.component';
import { PopoverDirective, PopoverPosition } from './popover.directive';

const textButton = 'Teste';
const confirmText = 'Você tem certeza?';
const elementPosition: PopoverPosition = { top: 10, left: 40 };
const actions = [{ label: 'cancelar' }, { label: 'confirmar' }];

@Component({
  template: `
    <button
      ionPopover
      ionPopoverTitle="${confirmText}"
      ionPopoverBody="Você tem certeza"
      ionPopoverIcon="condominium"
      ionPopoverIconClose="close"
      ionPopoverArrowPosition="arrow-4"
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
      ionPopover
      ionPopoverTitle="Você tem certeza?"
      (ionOnFirstAction)="confirm()"
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

describe('Directive: Popover', () => {
  let fixture: ComponentFixture<ContainerRefTestComponent>;
  let directive: PopoverDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [PopoverDirective, ViewContainerRef],
      declarations: [
        ContainerRefTestComponent,
        BadgeComponent,
        DropdownComponent,
        ButtonComponent,
        IonIconComponent,
        PopoverComponent,
        IonDividerComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [PopoverComponent],
        },
      })
      .createComponent(ContainerRefTestComponent);

    fixture.detectChanges();
    directive = fixture.debugElement.injector.get(PopoverDirective);
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

  // it('should open the popconfirm when clicked', () => {
  //   directive.open(elementPosition);
  //   fireEvent.click(screen.getByText(textButton));
  //   expect(screen.getByText(confirmText)).toBeInTheDocument();
  // });
});
