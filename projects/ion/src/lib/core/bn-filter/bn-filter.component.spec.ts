import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BnFilterComponent } from './bn-filter.component';
import { BnFormField } from '../bn-form/bn-form.types';
import { screen } from '@testing-library/angular';

describe('BnFilterComponent', () => {
  let component: BnFilterComponent;
  let fixture: ComponentFixture<BnFilterComponent>;

  const mockFields: BnFormField[] = [
    {
      key: 'name',
      label: 'Nome',
      required: true,
    },
    {
      key: 'status',
      label: 'Status',
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BnFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BnFilterComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('fields', mockFields);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have default pageTitle', () => {
    expect(component.pageTitle()).toBe('Filtro');
  });

  it('should toggle expansion when header button is clicked', () => {
    const button = fixture.debugElement.query(
      By.css('.bn-filter-header ion-button'),
    );

    // Initially closed
    expect(component.open()).toBeFalsy();

    // Click to open
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.open()).toBeTruthy();

    // Check if content is rendered
    const content = fixture.debugElement.query(By.css('.filter-content'));
    expect(content).toBeTruthy();

    // Click to close
    button.triggerEventHandler('click', null);
    fixture.detectChanges();
    expect(component.open()).toBeFalsy();
  });

  it('should render correct pageTitle', () => {
    fixture.componentRef.setInput('pageTitle', 'Custom Title');
    fixture.detectChanges();
    const title = fixture.debugElement.query(By.css('.title')).nativeElement;
    expect(title.textContent).toContain('Custom Title');
  });

  it('should create form group with provided fields', () => {
    const formGroup = component.formGroup();
    expect(formGroup.get('name')).toBeTruthy();
    expect(formGroup.get('status')).toBeTruthy();
  });

  it('should disable apply button when form is invalid', () => {
    component.open.set(true);
    fixture.detectChanges();

    const applyButton = screen.getByTestId('apply-button');

    // Form is invalid because 'name' is required and empty
    expect(component.formGroup().invalid).toBeTruthy();
    expect(applyButton).toBeDisabled();

    // Fill the required field
    component.formGroup().get('name')?.setValue('Test');
    fixture.detectChanges();

    expect(component.formGroup().valid).toBeTruthy();
    expect(applyButton).not.toBeDisabled();
  });

  it('should emit applied event when apply is called', () => {
    const appliedSpy = jest.spyOn(component.applied, 'emit');
    component.formGroup().get('name')?.setValue('Luke');
    component.formGroup().get('status')?.setValue('active');

    component.apply();

    expect(appliedSpy).toHaveBeenCalledWith({
      name: 'Luke',
      status: 'active',
    });
  });

  it('should emit cleared event and reset form when clear is called', () => {
    const clearedSpy = jest.spyOn(component.cleared, 'emit');
    const appliedSpy = jest.spyOn(component.applied, 'emit');

    component.formGroup().get('name')?.setValue('Luke');

    component.clear();

    expect(component.formGroup().get('name')?.value).toBeNull();
    expect(clearedSpy).toHaveBeenCalled();
    expect(appliedSpy).toHaveBeenCalled();
  });
});
