import { TestBed } from '@angular/core/testing';
import { IonTooltipComponent } from './tooltip.component';
import { TooltipService } from './tooltip.service';

const tooltipTestId = 'ion-tooltip';

describe('IonTooltipComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonTooltipComponent],
      providers: [TooltipService],
    }).compileComponents();
  });

  it('should render title', () => {
    const ionTooltipTitle = 'Eu sou um tooltip.';

    const fixture = TestBed.createComponent(IonTooltipComponent);
    fixture.componentRef.setInput('ionTooltipTitle', ionTooltipTitle);
    fixture.detectChanges();

    const tooltipElement = fixture.nativeElement.querySelector(
      '[data-testid="ion-tooltip"]',
    );
    expect(tooltipElement.textContent.trim()).toBe(ionTooltipTitle);
  });

  it('should render dark color scheme by default', () => {
    const fixture = TestBed.createComponent(IonTooltipComponent);
    fixture.componentRef.setInput('ionTooltipTitle', 'Title');
    fixture.detectChanges();

    const tooltipElement = fixture.nativeElement.querySelector(
      '[data-testid="ion-tooltip"]',
    );
    expect(tooltipElement.className).toContain('ion-tooltip-dark');
  });

  it('should render light color scheme', () => {
    const fixture = TestBed.createComponent(IonTooltipComponent);
    fixture.componentRef.setInput('ionTooltipTitle', 'Title');
    fixture.componentRef.setInput('ionTooltipColorScheme', 'light');
    fixture.detectChanges();

    const tooltipElement = fixture.nativeElement.querySelector(
      '[data-testid="ion-tooltip"]',
    );
    expect(tooltipElement.className).toContain('ion-tooltip-light');
  });

  it('should not have visible class when visibility is false', () => {
    const fixture = TestBed.createComponent(IonTooltipComponent);
    fixture.componentRef.setInput('ionTooltipTitle', 'Title');
    fixture.detectChanges();

    const tooltipElement = fixture.nativeElement.querySelector(
      '[data-testid="ion-tooltip"]',
    );
    expect(tooltipElement.className).not.toContain('ion-tooltip--visible');
  });

  it('should have visible class when visibility is true', () => {
    const fixture = TestBed.createComponent(IonTooltipComponent);
    fixture.componentRef.setInput('ionTooltipTitle', 'Title');
    fixture.componentInstance.ionTooltipVisible.set(true);
    fixture.detectChanges();

    const tooltipElement = fixture.nativeElement.querySelector(
      '[data-testid="ion-tooltip"]',
    );
    expect(tooltipElement.className).toContain('ion-tooltip--visible');
  });

  it('should have custom class', () => {
    const ionTooltipCustomClass = 'custom-class';

    const fixture = TestBed.createComponent(IonTooltipComponent);
    fixture.componentRef.setInput('ionTooltipTitle', 'Title');
    fixture.componentRef.setInput(
      'ionTooltipCustomClass',
      ionTooltipCustomClass,
    );
    fixture.detectChanges();

    const tooltipElement = fixture.nativeElement.querySelector(
      '[data-testid="ion-tooltip"]',
    );
    expect(tooltipElement.className).toContain(ionTooltipCustomClass);
  });
});
