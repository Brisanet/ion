import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { fireEvent, screen } from '@testing-library/angular';

import { IonAlertModule } from '../alert/alert.module';
import { IonButtonModule } from '../button/button.module';
import { IonModalComponent } from './component/modal.component';
import { SelectMockComponent } from './mock/select-mock.component';
import { IonModalService } from './modal.service';
import { IonModalConfiguration } from './models/modal.interface';

describe('ModalService', () => {
  let fixture: ComponentFixture<ContainerRefTestComponent>;
  let modalService: IonModalService;

  @Component({
    template: '<div></div>',
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
        SelectMockComponent,
      ],
      imports: [FormsModule, IonButtonModule, IonAlertModule],
    }).overrideModule(BrowserDynamicTestingModule, {
      set: {
        entryComponents: [IonModalComponent, SelectMockComponent],
      },
    });

    fixture = TestBed.createComponent(ContainerRefTestComponent);
    modalService = TestBed.get(IonModalService);
  });

  afterEach(() => {
    modalService.closeModal();
  });

  it('should be created with open', () => {
    modalService.open(SelectMockComponent);

    expect(modalService).toBeTruthy();
    expect(screen.getByTestId('modalTitle')).toBeTruthy();
  });

  it('should close modal when call emitAndCloseModal', () => {
    jest.spyOn(modalService, 'closeModal');

    modalService.open(SelectMockComponent);
    modalService.emitValueAndCloseModal({ name: 'Fulano' });
    fixture.detectChanges();

    expect(modalService.closeModal).toHaveBeenCalled();
  });

  it('should set title according to config in open function', () => {
    const title = 'modal title';

    modalService.open(SelectMockComponent, { title: title });
    fixture.detectChanges();

    expect(screen.getByTestId('modalTitle').innerHTML).toBe(title);
  });

  it('should call closeModal when ionOnClose fires without value', () => {
    jest.spyOn(modalService, 'closeModal');

    modalService.open(SelectMockComponent);

    fireEvent.click(screen.getByTestId('modalOverlay'));
    fixture.detectChanges();

    expect(modalService.closeModal).toHaveBeenCalled();
  });

  it('should call emitValueAndCloseModal when ionOnClose fires with value', () => {
    jest.spyOn(modalService, 'emitValueAndCloseModal');

    modalService.open(SelectMockComponent);

    const c = screen.getAllByText('Confirmar');

    expect(c.length).toBe(1);

    fireEvent.click(screen.getByText('Confirmar'));
    fixture.detectChanges();

    expect(modalService.emitValueAndCloseModal).toHaveBeenCalledWith({
      state: 'ceara',
    });
  });

  it('should call emitHeaderAction when ionOnHeaderButtonAction fires', () => {
    jest.spyOn(modalService, 'emitHeaderAction');

    modalService.open(SelectMockComponent, {
      headerButton: {
        icon: 'left',
        label: 'voltar',
      },
    });

    fireEvent.click(screen.getByTestId('btn-voltar'));
    fixture.detectChanges();

    expect(modalService.emitHeaderAction).toHaveBeenCalledWith({
      state: 'ceara',
    });
  });

  it('should change the modal configuration when reconfigModal is called', () => {
    const newConfig: IonModalConfiguration = {
      title: 'New title',
    };

    modalService.open(SelectMockComponent);
    expect(screen.getByTestId('modalTitle')).toHaveTextContent('Ion Modal');
    modalService.reconfigModal(newConfig);
    fixture.detectChanges();

    expect(screen.getByTestId('modalTitle')).toHaveTextContent(newConfig.title);
  });

  it('should close modal when call closeModal with id', () => {
    jest.spyOn(modalService, 'closeModal');

    modalService.open(SelectMockComponent, { id: 'modal' });
    modalService.closeModal('modal');
    fixture.detectChanges();

    expect(modalService.closeModal).toHaveBeenCalled();
  });

  it('should close two modals when call closeModal twice', () => {
    jest.spyOn(modalService, 'closeModal');

    modalService.open(SelectMockComponent);
    modalService.open(SelectMockComponent);
    modalService.closeModal();
    expect(screen.getByTestId('modal')).toHaveAttribute('id', 'modal-1');
    modalService.closeModal();
    expect(modalService.closeModal).toHaveBeenCalledTimes(2);
    expect(screen.queryByTestId('modal')).not.toBeInTheDocument();
  });

  it(`should close modal when call closeModal with id and it's not the latest open`, () => {
    jest.spyOn(modalService, 'closeModal');

    modalService.open(SelectMockComponent, { id: 'modal-1' });
    modalService.open(SelectMockComponent, { id: 'modal-2' });
    modalService.closeModal('modal-1');
    fixture.detectChanges();

    expect(modalService.closeModal).toHaveBeenCalled();
    expect(screen.getByTestId('modal')).toHaveAttribute('id', 'modal-2');
  });

  it('should not close modal by clicking the primary button when preventCloseOnConfirm is informed', () => {
    jest.spyOn(modalService, 'emitValue');

    modalService.open(SelectMockComponent, { preventCloseOnConfirm: true });

    fireEvent.click(screen.getByText('Confirmar'));
    fixture.detectChanges();

    expect(modalService.emitValue).toHaveBeenCalledWith({
      state: 'ceara',
    });
    expect(screen.getByTestId('modal')).toBeVisible();
  });
});
