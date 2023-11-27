import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'; // DO not forget to Import
import { fireEvent, screen } from '@testing-library/angular';
import { IonButtonModule } from '../../button/button.module';
import { SelectMockComponent } from '../mock/select-mock.component';
import { IonModalConfiguration } from './../models/modal.interface';
import { IonModalComponent } from './modal.component';

describe('IonModalComponent', () => {
  let component: IonModalComponent;
  let fixture: ComponentFixture<IonModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [IonModalComponent, SelectMockComponent],
      imports: [FormsModule, IonButtonModule],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [SelectMockComponent],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IonModalComponent);
    component = fixture.componentInstance;
    component.componentToBody = SelectMockComponent;
    fixture.detectChanges();
  });

  const footer = (): HTMLElement => screen.getByTestId('modalFooter');
  const overlay = (): HTMLElement => screen.getByTestId('modalOverlay');

  it('should create modal with custom component', () => {
    expect(component).toBeTruthy();
    expect(screen.getByText('Choose one')).toBeTruthy();
  });

  it('should render primary button enable by default', () => {
    expect(screen.getByTestId('modal-primary-btn')).not.toHaveAttribute(
      'ng-reflect-disabled'
    );
  });

  it('should show custom label from ionParams of modal service', () => {
    const label = 'Matheusis';
    const modalPrimaryDisabled: IonModalConfiguration = {
      id: '1',
      title: 'Modal primary disabled',
      ionParams: {
        label,
      },
      footer: {
        showDivider: false,
        primaryButton: {
          label: 'Confirmar',
          disabled: true,
        },
      },
    };

    component.setConfig(modalPrimaryDisabled);
    component.ngOnInit();
    fixture.detectChanges();

    expect(screen.getByText(label)).toBeInTheDocument();
  });

  it('should render primary button disabled when informed', () => {
    const modalPrimaryDisabled: IonModalConfiguration = {
      id: '1',
      title: 'Modal primary disabled',
      footer: {
        showDivider: false,
        primaryButton: {
          label: 'Confirmar',
          disabled: true,
        },
      },
    };

    component.setConfig(modalPrimaryDisabled);
    fixture.detectChanges();

    expect(screen.getByTestId('modal-primary-btn')).toHaveAttribute(
      'ng-reflect-disabled',
      'true'
    );
  });

  it('should render according to configuration with custom label, id, and without footer border', () => {
    const configuration: IonModalConfiguration = {
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

    component.setConfig(configuration);
    fixture.detectChanges();

    expect(screen.getByTestId('modal').id).toBe(configuration.id);
    expect(screen.getByText(configuration.title)).toBeTruthy();
    expect(
      screen.getByText(configuration.footer.primaryButton.label)
    ).toBeTruthy();
    expect(
      screen.getByText(configuration.footer.secondaryButton.label)
    ).toBeTruthy();
    expect(footer().classList.contains('divider')).toBe(false);
  });

  it('should close modal using esc key', () => {
    const escapeKeyCode = 27;

    jest.spyOn(component, 'closeModal');
    fireEvent.keyDown(screen.getByTestId('modalOverlay'), {
      key: 'Escape',
      code: 'Escape',
      keyCode: escapeKeyCode,
      charCode: escapeKeyCode,
    });
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should close modal clicking in overlay when configuration allow it', () => {
    jest.spyOn(component, 'closeModal');
    component.configuration.overlayCanDismiss = true;
    fireEvent(screen.getByTestId('modalOverlay'), new MouseEvent('click'));
    expect(component.closeModal).toHaveBeenCalled();
  });

  it('should not close modal clicking in overlay when configuration disallow it', () => {
    jest.spyOn(component, 'closeModal');
    component.configuration.overlayCanDismiss = false;
    fireEvent(screen.getByTestId('modalOverlay'), new MouseEvent('click'));
    expect(component.closeModal).not.toHaveBeenCalled();
  });

  it('should hide footer when its true on configuration', () => {
    const modalFooter = footer();
    expect(modalFooter).toBeInTheDocument();
    component.configuration.footer.hide = true;
    fixture.detectChanges();
    expect(modalFooter).not.toBeInTheDocument();
  });

  it('should hide overlay when its true on configuration', () => {
    expect(overlay().classList.contains('hide')).toBe(false);
    component.configuration.showOverlay = false;
    fixture.detectChanges();
    expect(overlay().classList.contains('hide')).toBe(true);
  });

  it('should emit event when call closeModal function', () => {
    jest.spyOn(component.ionOnClose, 'emit');
    component.closeModal(component.getChildComponentPropertiesValue());
    expect(component.ionOnClose.emit).toHaveBeenCalledWith({ state: 'ceara' });
  });

  it('should have close button', () => {
    expect(screen.getByTestId('close-icon')).toBeInTheDocument();
  });

  it('should hide close button when informed', () => {
    const configuration: IonModalConfiguration = {
      hideCloseButton: true,
    };
    component.setConfig(configuration);
    fixture.detectChanges();

    expect(screen.queryByTestId('close-icon')).not.toBeInTheDocument();
  });

  it('should render the width of the default modal', () => {
    const modalElement =
      fixture.nativeElement.querySelector('.modal-container').style.width;
    expect(modalElement).toBe('500px');
  });

  it('should render width of custom modal', () => {
    const modalConfig: IonModalConfiguration = {
      id: '1',
      title: 'Modal primary disabled',
      width: 200,
    };

    component.setConfig(modalConfig);
    component.ngOnInit();
    fixture.detectChanges();

    const modalElement =
      fixture.nativeElement.querySelector('.modal-container').style.width;
    expect(modalElement).toBe(`${modalConfig.width}px`);
  });

  describe('IonModalComponent - Header left button', () => {
    const configuration: IonModalConfiguration = {
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

      headerButton: {
        icon: 'left',
        label: 'voltar',
      },
    };

    it('should not be rendered as default', () => {
      expect(screen.queryByTestId('btn-voltar')).not.toBeInTheDocument();
    });

    it('should emit event when call emitHeaderButtonAction function', () => {
      jest.spyOn(component.ionOnHeaderButtonAction, 'emit');
      component.emitHeaderButtonAction(
        component.getChildComponentPropertiesValue()
      );
      expect(component.ionOnHeaderButtonAction.emit).toHaveBeenCalled();
    });

    it('should be visible as default if the config is informed', () => {
      component.setConfig(configuration);
      fixture.detectChanges();
      expect(screen.getByTestId('btn-voltar')).toBeVisible();
    });

    it('should be enabled as default', () => {
      component.setConfig(configuration);
      fixture.detectChanges();
      expect(screen.getByTestId('btn-voltar')).toBeEnabled();
    });

    it('should be disabled when informed', () => {
      configuration.headerButton.disabled = (): boolean => true;
      component.setConfig(configuration);
      fixture.detectChanges();
      expect(screen.getByTestId('btn-voltar')).toBeDisabled();
    });

    it('should render the specified icon', () => {
      component.setConfig(configuration);
      fixture.detectChanges();
      const icon = document.getElementById('ion-icon-left');
      expect(icon).toBeVisible();
    });

    it('should be hidden when informed', () => {
      configuration.headerButton.hidden = (): boolean => true;

      component.setConfig(configuration);
      fixture.detectChanges();
      expect(screen.queryByTestId('btn-voltar')).not.toBeInTheDocument();
    });
  });
});
