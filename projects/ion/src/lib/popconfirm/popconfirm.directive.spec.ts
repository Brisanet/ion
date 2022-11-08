import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/compiler/src/core';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { fireEvent, screen } from '@testing-library/angular';
import { BadgeComponent } from '../badge/badge.component';
import { IonDividerComponent } from '../divider/divider.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { ButtonComponent } from './../button/button.component';
import { IonIconComponent } from './../icon/icon.component';

import { render } from '@testing-library/angular';
import { PopConfirmComponent } from './popconfirm.component';
import { PopConfirmDirective } from './popconfirm.directive';

describe('Directive: Popconfirm', () => {
  let fixture: ComponentFixture<ContainerRefTestComponent>;
  let directive: PopConfirmDirective;
  const textButton = 'Teste';

  @Component({
    template: `
      <button
        ionPopConfirm
        ionPopConfirmTitle="Você tem certeza?"
        (ionOnConfirm)="confirm()"
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

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      providers: [PopConfirmDirective, ViewContainerRef],
      declarations: [
        ContainerRefTestComponent,
        BadgeComponent,
        DropdownComponent,
        ButtonComponent,
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
    directive.open();
    expect(screen.getByText(textButton)).toHaveAttribute('ionpopconfirm', '');
  });

  it.skip('should open the popconfirm when clicked', () => {
    directive.open();
  });

  it('should open the popconfirm when clicked', () => {
    directive.open();
    fireEvent.click(screen.getByText(textButton));
    expect(screen.getByText('Confirmar')).toBeInTheDocument();
  });

  it('should close pop when click in cancel', () => {
    jest.spyOn(directive, 'closePopConfirm');

    directive.open();
    fireEvent.click(screen.getByTestId('pop-cancel-btn'));

    expect(directive.closePopConfirm).toHaveBeenCalled();
  });

  it.skip('should click in confirm button and receive event', () => {
    jest.spyOn(directive, 'closePopConfirm');

    directive.open();
    fireEvent.click(screen.getByTestId('pop-confirm-btn'));
    expect(screen.getByTestId('pop-confirm-btn')).toBeInTheDocument();
  });

  //   // it('should close modal when call emitAndCloseModal', () => {
  //   //   jest.spyOn(modalService, 'closeModal');

  //   //   modalService.open(SelectMockComponent);
  //   //   modalService.emitValueAndCloseModal({ name: 'Fulano' });
  //   //   fixture.detectChanges();

  //   //   expect(modalService.closeModal).toHaveBeenCalled();
  //   // });

  //   // it('should set title according to config in open function', () => {
  //   //   const title = 'modal title';

  //   //   modalService.open(SelectMockComponent, { title: title });
  //   //   fixture.detectChanges();

  //   //   expect(screen.getByTestId('modalTitle').innerHTML).toBe(title);
  //   // });

  //   // it('should call closeModal when ionOnClose fires without value', () => {
  //   //   jest.spyOn(modalService, 'closeModal');

  //   //   modalService.open(SelectMockComponent);

  //   //   fireEvent.click(screen.getByTestId('modalOverlay'));
  //   //   fixture.detectChanges();

  //   //   expect(modalService.closeModal).toHaveBeenCalled();
  //   // });

  //   // it('should call emitValueAndCloseModal when ionOnClose fires without value', () => {
  //   //   jest.spyOn(modalService, 'emitValueAndCloseModal');

  //   //   modalService.open(SelectMockComponent);

  //   //   const c = screen.getAllByText('Confirmar');

  //   //   expect(c.length).toBe(1);

  //   //   fireEvent.click(screen.getByText('Confirmar'));
  //   //   fixture.detectChanges();

  //   //   expect(modalService.emitValueAndCloseModal).toHaveBeenCalledWith({
  //   //     state: 'ceara',
  //   //   });
  //   // });
});
