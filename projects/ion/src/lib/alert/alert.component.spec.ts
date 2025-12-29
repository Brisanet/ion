import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonAlertComponent } from './alert.component';
import { IonIconComponent } from '../icon/icon.component';
import { By } from '@angular/platform-browser';
import { StatusType } from '../core/types/status';

describe('IonAlertComponent', () => {
  let component: IonAlertComponent;
  let fixture: ComponentFixture<IonAlertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonAlertComponent, IonIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonAlertComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('message', 'Mensagem padrão');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render alert with default class', () => {
    const alert = fixture.debugElement.query(By.css('.ion-alert'));
    expect(alert).toBeTruthy();
  });

  it('should render with success icon by default', () => {
    const icon = fixture.debugElement.query(
      By.css('[data-testid="status-icon"]'),
    );
    expect(icon).toBeTruthy();
  });

  const alertTypes: StatusType[] = ['success', 'warning', 'info', 'negative'];

  alertTypes.forEach((type) => {
    it(`should render ${type} type`, () => {
      fixture.componentRef.setInput('type', type);
      fixture.detectChanges();
      const alert = fixture.debugElement.query(By.css('.ion-alert'));
      expect(alert.nativeElement.classList).toContain(type);
    });
  });

  it('should render closable alert', () => {
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();
    const alert = fixture.debugElement.query(By.css('.ion-alert'));
    expect(alert.nativeElement.classList).toContain('closable-true');
  });

  it('should render close icon when is closable', () => {
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();
    const closeIcon = fixture.debugElement.query(
      By.css('[data-testid="close-icon"]'),
    );
    expect(closeIcon).toBeTruthy();
  });

  it('should close alert', () => {
    fixture.componentRef.setInput('closable', true);
    fixture.detectChanges();
    const closeIcon = fixture.debugElement.query(
      By.css('[data-testid="close-icon"]'),
    );
    closeIcon.triggerEventHandler('click', null);
    fixture.detectChanges();
    // Since nativeElement.remove() is called, we can check if the element is still in the DOM
    // However, debugElement might still reference it.
    // A better check might be spying on remove, but let's try checking parentNode
    expect(fixture.nativeElement.querySelector('.ion-alert')).toBeFalsy();
  });

  it('should render without background', () => {
    fixture.componentRef.setInput('hideBackground', true);
    fixture.detectChanges();
    const alert = fixture.debugElement.query(By.css('.ion-alert'));
    expect(alert.nativeElement.classList).toContain('without-background');
  });

  it('should render with description', () => {
    fixture.componentRef.setInput('description', 'Testing description');
    fixture.detectChanges();
    const description = fixture.debugElement.query(By.css('.description'));
    expect(description.nativeElement.textContent.trim()).toBe(
      'Testing description',
    );
  });

  it('should render without radius', () => {
    fixture.componentRef.setInput('noRadius', true);
    fixture.detectChanges();
    const alert = fixture.debugElement.query(By.css('.ion-alert'));
    expect(alert.nativeElement.classList).toContain('no-radius');
  });

  it('should render with custom message', () => {
    fixture.componentRef.setInput('message', 'Custom message');
    fixture.detectChanges();
    const message = fixture.debugElement.query(
      By.css('[data-testid="ion-alert-message"]'),
    );
    expect(message.nativeElement.textContent).toContain('Custom message');
  });
});
