import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { screen } from '@testing-library/angular';
import { IonNavbarComponent } from './navbar.component';
import { IonButtonProps } from '../core/types/button';
import { IonInputProps } from '../core/types/input';
import { IonAlertProps } from '../core/types/alert';
import { AvatarType } from '../core/types/avatar';

describe('IonNavbarComponent', () => {
  let component: IonNavbarComponent;
  let fixture: ComponentFixture<IonNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonNavbarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonNavbarComponent);
    component = fixture.componentInstance;

    // Provide required avatar input
    fixture.componentRef.setInput('avatar', {
      type: AvatarType.initials,
      value: 'Iury Nogueira',
    });

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render left action button when provided', () => {
    const leftAction: IonButtonProps = {
      iconType: 'left-arrow',
      tooltip: 'Back',
    };
    fixture.componentRef.setInput('leftAction', leftAction);
    fixture.detectChanges();

    const leftButton = fixture.nativeElement.querySelector('ion-button');
    expect(leftButton).toBeTruthy();
  });

  it('should emit leftActionOutput when left action button is clicked', () => {
    const leftAction: IonButtonProps = { iconType: 'left-arrow' };
    fixture.componentRef.setInput('leftAction', leftAction);
    fixture.detectChanges();

    jest.spyOn(component.leftActionOutput, 'emit');
    const leftButton = fixture.debugElement.query(By.css('ion-button'));
    leftButton.triggerEventHandler('ionOnClick', null);

    expect(component.leftActionOutput.emit).toHaveBeenCalled();
  });

  it('should render search input when provided', () => {
    const inputSearch: IonInputProps = { placeholder: 'Search...' };
    fixture.componentRef.setInput('inputSearch', inputSearch);
    fixture.detectChanges();

    const searchInput = fixture.nativeElement.querySelector('ion-input');
    expect(searchInput).toBeTruthy();
  });

  it('should emit valueChange when search input value changes', () => {
    const inputSearch: IonInputProps = { placeholder: 'Search...' };
    fixture.componentRef.setInput('inputSearch', inputSearch);
    fixture.detectChanges();

    jest.spyOn(component.valueChange, 'emit');
    const searchInput = fixture.debugElement.query(By.css('ion-input'));

    // Simulate value change event from IonInput
    searchInput.triggerEventHandler('valueChange', 'test');

    expect(component.valueChange.emit).toHaveBeenCalledWith('test');
  });

  it('should render alert when provided', () => {
    const alert: IonAlertProps = { message: 'Alert message', type: 'info' };
    fixture.componentRef.setInput('alert', alert);
    fixture.detectChanges();

    const alertElement = fixture.nativeElement.querySelector('ion-alert');
    expect(alertElement).toBeTruthy();
  });

  it('should render right action buttons when provided', () => {
    const rightActions: Partial<IonButtonProps & { action: string }>[] = [
      { iconType: 'plus', action: 'add' },
      { iconType: 'trash', action: 'delete' },
    ];
    fixture.componentRef.setInput('rightActions', rightActions);
    fixture.detectChanges();

    const buttons = fixture.nativeElement.querySelectorAll('ion-button');
    // 0 index is left button if it exists, but here only right actions are set
    expect(buttons.length).toBe(2);
  });

  it('should emit rightActionOutput with correct action when a right action button is clicked', () => {
    const rightActions: Partial<IonButtonProps & { action: string }>[] = [
      { iconType: 'plus', action: 'add' },
      { iconType: 'trash', action: 'delete' },
    ];
    fixture.componentRef.setInput('rightActions', rightActions);
    fixture.detectChanges();

    jest.spyOn(component.rightActionOutput, 'emit');
    const buttons = fixture.debugElement.queryAll(By.css('ion-button'));

    buttons[0].triggerEventHandler('ionOnClick', null);
    expect(component.rightActionOutput.emit).toHaveBeenCalledWith('add');

    buttons[1].triggerEventHandler('ionOnClick', null);
    expect(component.rightActionOutput.emit).toHaveBeenCalledWith('delete');
  });

  it('should render user info container with correct data', () => {
    const avatar = fixture.nativeElement.querySelector('ion-avatar');
    const userName = screen.getByTestId('user-name');

    expect(avatar).toBeTruthy();
    expect(userName.textContent).toContain('Iury Nogueira');
  });
});
