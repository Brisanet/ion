import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { fireEvent, screen } from '@testing-library/angular';

import { ButtonComponent } from './../button/button.component';
import { IonIconComponent } from './../icon/icon.component';
import { IonModalComponent } from './component/modal.component';
import { IonModalService } from './modal.service';
import { SelectMockComponent } from './mock/select-mock.component';

describe('ModalService', () => {
  let fixture: ComponentFixture<ContainerRefTestComponent>;
  let modalService: IonModalService;

  @Component({
    template: '<div #container></div>',
  })
  class ContainerRefTestComponent {
    @ViewChild('container', { read: ViewContainerRef, static: true })
    container!: ViewContainerRef;
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [
        ContainerRefTestComponent,
        IonModalComponent,
        ButtonComponent,
        IonIconComponent,
        SelectMockComponent,
      ],
      imports: [FormsModule],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [IonModalComponent, SelectMockComponent],
      },
    });

    fixture = TestBed.createComponent(ContainerRefTestComponent);
    modalService = TestBed.get(IonModalService);
  });

  it('should be created with open', () => {
    modalService.open(fixture.componentInstance.container, SelectMockComponent);

    expect(modalService).toBeTruthy();
    expect(screen.getByTestId('modalTitle')).toBeTruthy();
  });

  it('should close modal when call emitAndCloseModal', () => {
    jest.spyOn(modalService, 'closeModal');

    modalService.open(fixture.componentInstance.container, SelectMockComponent);
    modalService.emitValueAndCloseModal({ name: 'Fulano' });
    fixture.detectChanges();

    expect(modalService.closeModal).toHaveBeenCalled();
  });

  it('should set title according to config in open function', () => {
    const title = 'modal title';

    modalService.open(
      fixture.componentInstance.container,
      SelectMockComponent,
      { title: title }
    );
    fixture.detectChanges();

    expect(screen.getByTestId('modalTitle').innerHTML).toBe(title);
  });

  it('should call closeModal when ionOnClose fires without value', () => {
    jest.spyOn(modalService, 'closeModal');

    modalService.open(fixture.componentInstance.container, SelectMockComponent);

    fireEvent.click(screen.getByTestId('modalOverlay'));
    fixture.detectChanges();

    expect(modalService.closeModal).toHaveBeenCalled();
  });

  it('should call emitValueAndCloseModal when ionOnClose fires without value', () => {
    jest.spyOn(modalService, 'emitValueAndCloseModal');

    modalService.open(fixture.componentInstance.container, SelectMockComponent);
    fixture.detectChanges();

    fireEvent.click(screen.getByText('Confirmar'));
    fixture.detectChanges();

    expect(modalService.emitValueAndCloseModal).toHaveBeenCalledWith({
      state: 'ceara',
    });
  });
});
