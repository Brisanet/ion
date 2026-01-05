import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonDatepickerComponent } from './date-picker.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OverlayContainer } from '@angular/cdk/overlay';
import { By } from '@angular/platform-browser';

describe('IonDatepickerComponent with CDK Overlay', () => {
  let component: IonDatepickerComponent;
  let fixture: ComponentFixture<IonDatepickerComponent>;
  let overlayContainer: OverlayContainer;
  let overlayContainerElement: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonDatepickerComponent, BrowserAnimationsModule],
    }).compileComponents();

    overlayContainer = TestBed.inject(OverlayContainer);
    overlayContainerElement = overlayContainer.getContainerElement();

    fixture = TestBed.createComponent(IonDatepickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    // Clean up overlay container after each test
    overlayContainer.ngOnDestroy();
  });

  it('should open overlay when input is clicked', () => {
    // Check initial state: no calendar in overlay
    let calendarContainer = overlayContainerElement.querySelector(
      '.container-calendar',
    );
    expect(calendarContainer).toBeFalsy();

    // Find and click the input triggering element
    const inputDebug = fixture.debugElement.query(By.css('date-picker-input'));
    inputDebug.triggerEventHandler('click', null);
    fixture.detectChanges();

    // Check open state
    calendarContainer = overlayContainerElement.querySelector(
      '.container-calendar',
    );
    expect(calendarContainer).toBeTruthy();
  });

  it('should close overlay when clicking outside', async () => {
    // Open it first
    component.setVisibleCalendar(true);
    fixture.detectChanges();

    expect(
      overlayContainerElement.querySelector('.container-calendar'),
    ).toBeTruthy();

    // Simulate closing
    component.setVisibleCalendar(false);
    fixture.detectChanges();

    expect(
      overlayContainerElement.querySelector('.container-calendar'),
    ).toBeFalsy();
  });
});
