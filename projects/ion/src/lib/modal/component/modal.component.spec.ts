import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'; // DO not forget to Import
import { fireEvent, screen } from '@testing-library/angular';
import { ButtonComponent } from '../../button/button.component';
import { IonIconComponent } from '../../icon/icon.component';
import { SelectMockComponent } from '../mock/select-mock.component';
import { IonModalConfig } from './../models/modal.interface';
import { ModalComponent } from './modal.component';

describe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalComponent,
        IonIconComponent,
        ButtonComponent,
        SelectMockComponent,
      ],
      imports: [FormsModule],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [SelectMockComponent],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.componentToBody = SelectMockComponent;
    fixture.detectChanges();
  });

  const footer = () => screen.getByTestId('modalFooter');
  const overlay = () => screen.getByTestId('modalOverlay');

  it('should create modal with custom component', () => {
    expect(component).toBeTruthy();
    expect(screen.getByText('Choose one')).toBeTruthy();
  });

  it('should render according to config with custom label, id, and without footer border', () => {
    const config: IonModalConfig = {
      id: '1',
      title: 'Ion Test',

      footer: {
        showDivider: false,
        primaryButton: {
          label: 'Ion Cancel',
          iconType: 'icon',
        },
        secondaryButton: {
          label: 'Ion Confirm',
          iconType: 'icon',
        },
      },
    };

    component.setConfig(config);

    fixture.detectChanges();

    expect(screen.getByTestId('modal').id).toBe(config.id);
    expect(screen.getByText(config.title)).toBeTruthy();
    expect(screen.getByText(config.footer.primaryButton.label)).toBeTruthy();
    expect(screen.getByText(config.footer.secondaryButton.label)).toBeTruthy();
    expect(footer().classList.contains('divider')).toBe(false);
  });

  it('should close modal using esc key', () => {
    jest.spyOn(component, 'closeModal');
    fireEvent.keyDown(screen.getByTestId('modalOverlay'), {
      key: 'Escape',
      code: 'Escape',
      keyCode: 27,
      charCode: 27,
    });

    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should close modal clicking in overlay when config allow it', () => {
    jest.spyOn(component, 'closeModal');

    component.config.overlayCanDismiss = false;

    fireEvent(screen.getByTestId('modalOverlay'), new MouseEvent('click'));
    expect(component.closeModal).not.toHaveBeenCalled();

    component.config.overlayCanDismiss = true;

    fireEvent(screen.getByTestId('modalOverlay'), new MouseEvent('click'));
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should hide footer when its true on config', () => {
    const modalFooter = footer();

    expect(modalFooter).toBeInTheDocument();

    component.config.footer.hide = true;
    fixture.detectChanges();

    expect(modalFooter).not.toBeInTheDocument();
  });

  it('should hide overlay when its true on config', () => {
    expect(overlay().classList.contains('hide')).toBe(false);

    component.config.showOverlay = false;
    fixture.detectChanges();

    expect(overlay().classList.contains('hide')).toBe(true);
  });

  it('should emit event when call closeModal function', () => {
    jest.spyOn(component.ionOnClose, 'emit');

    component.closeModal(component.handleDynamicComponentDataToEmit());

    expect(component.ionOnClose.emit).toHaveBeenCalledWith({ state: 'Ceará' });
  });
});
