import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { fireEvent, screen } from '@testing-library/angular';
import { BadgeComponent } from '../badge/badge.component';
import { IonDividerComponent } from '../divider/divider.component';
import { ButtonComponent } from './../button/button.component';
import { IonIconComponent } from './../icon/icon.component';

import { IonPopoverComponent } from './popover.component';
import { PopoverDirective } from './popover.directive';

const textButton = 'Teste';
const confirmText = 'Você tem certeza?';
const elementPosition = { top: 10, left: 40 };
const actions = [{ label: 'cancelar' }, { label: 'confirmar' }];

@Component({
  template: `
    <button
      ionPopover
      ionPopoverTitle="${confirmText}"
      ionPopoverBody="Ao concluir essa ação as ordens de serviço alocadas para o recurso ficarão órfãs."
      ionPopoverIcon="condominium"
      ionPopoverIconClose="close"
      ionPopoverPosition="topRight"
      ionPopoverActions="${actions}"
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

describe('Directive: Popover', () => {
  let fixture: ComponentFixture<ContainerRefTestComponent>;
  let directive: PopoverDirective;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [PopoverDirective, ViewContainerRef],
      declarations: [
        ContainerRefTestComponent,
        BadgeComponent,
        ButtonComponent,
        IonIconComponent,
        IonPopoverComponent,
        IonDividerComponent,
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [IonPopoverComponent],
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

  it.skip('should open the popconfirm when clicked', () => {
    directive.open(elementPosition);
    fireEvent.click(screen.getByText(textButton));
    expect(screen.getByText(confirmText)).toBeInTheDocument();
  });
});
