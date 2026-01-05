import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BnAboutComponent } from './bn-about.component';
import { BnFormField } from '../bn-form/bn-form.types';

describe('BnAboutComponent', () => {
  let component: BnAboutComponent;
  let fixture: ComponentFixture<BnAboutComponent>;

  const mockFields: BnFormField[] = [
    {
      key: 'name',
      label: 'Nome',
      required: true,
      initialValue: 'Test Name',
    },
    {
      key: 'status',
      label: 'Status',
      initialValue: 'Active',
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnAboutComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(BnAboutComponent);
    component = fixture.componentInstance;
    
    // Provide required input
    fixture.componentRef.setInput('pageTitle', { title: 'Detalhes', icon: 'receipt' });
    fixture.componentRef.setInput('fields', mockFields);
    
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render the correct title', () => {
    const titleElement = fixture.debugElement.query(By.css('.title')).nativeElement;
    expect(titleElement.textContent).toBe('Detalhes');
  });

  it('should render the icon when provided', () => {
    const iconElement = fixture.debugElement.query(By.css('ion-icon'));
    expect(iconElement).toBeTruthy();
    expect(iconElement.componentInstance.type).toBe('receipt');
  });

  it('should not render icon when not provided', () => {
    fixture.componentRef.setInput('pageTitle', { title: 'Sem Ícone' });
    fixture.detectChanges();
    
    const iconElement = fixture.debugElement.query(By.css('ion-icon'));
    expect(iconElement).toBeFalsy();
  });

  it('should render header button when provided and call action on click', () => {
    const actionSpy = jest.fn();
    fixture.componentRef.setInput('headerButton', { label: 'Imprimir', action: actionSpy });
    fixture.detectChanges();

    const button = fixture.debugElement.query(By.css('ion-button'));
    expect(button).toBeTruthy();
    expect(button.componentInstance.label()).toBe('Imprimir');

    button.triggerEventHandler('click', null);
    expect(actionSpy).toHaveBeenCalled();
  });

  it('should not render header button when not provided', () => {
    const button = fixture.debugElement.query(By.css('ion-button'));
    expect(button).toBeFalsy();
  });

  it('should disable all fields on init', () => {
    // Current fields should be disabled
    component.fields().forEach(field => {
      expect(field.disabled).toBeTruthy();
    });
  });

  it('should create form group with values from fields', () => {
    const formGroup = component.formGroup();
    expect(formGroup.get('name')?.value).toBe('Test Name');
    expect(formGroup.get('status')?.value).toBe('Active');
  });

  it('should have all form controls disabled', () => {
    const formGroup = component.formGroup();
    expect(formGroup.get('name')?.disabled).toBeTruthy();
    expect(formGroup.get('status')?.disabled).toBeTruthy();
  });
});
