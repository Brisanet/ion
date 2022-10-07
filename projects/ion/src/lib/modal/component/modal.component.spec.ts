import { IonModalConfig } from './../models/modal.interface';
import { Component } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing'; // DO not forget to Import
import { fireEvent, screen } from '@testing-library/angular';
import { ButtonComponent } from '../../button/button.component';
import { IonIconComponent } from '../../icon/icon.component';
import { ModalComponent } from './modal.component';

@Component({
  template: `
    <label>Choose one</label>
    <select
      style="padding: 5px;
    border: none;
    box-shadow: 0 3px 6px -4px rgb(0 0 0 / 15%), 0px 0px 2px rgb(0 0 0 / 15%);
    background: white;
    margin-left: 16px
    "
      [(ngModel)]="state"
    >
      <option>Ceará</option>
      <option>Espirito Santo</option>
    </select>
  `,
})
class SelectTemplateComponent {
  state: string;
}

fdescribe('ModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ModalComponent,
        IonIconComponent,
        ButtonComponent,
        SelectTemplateComponent,
      ],
      imports: [FormsModule],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: {
          entryComponents: [SelectTemplateComponent],
        },
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    component.componentToBody = SelectTemplateComponent;
    fixture.detectChanges();
  });

  const footer = () => screen.getByTestId('modalTitle');

  it('should create modal with default ', () => {
    expect(component).toBeTruthy();
  });

  it('should render with custom labels and without footer divider by config', () => {
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

    expect(screen.getByText(config.title)).toBeTruthy();
    expect(footer().classList.contains('divider')).toBe(false);
    expect(screen.getByText(config.footer.primaryButton.label)).toBeTruthy();
    expect(screen.getByText(config.footer.secondaryButton.label)).toBeTruthy();
    expect(screen.getByTestId('modal').id).toBe(config.id);
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
});
