import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonInfoBadgeComponent } from './info-badge.component';
import { InfoBadgeStatus } from '../core/types/info-badge';

describe('IonInfoBadgeComponent', () => {
  let component: IonInfoBadgeComponent;
  let fixture: ComponentFixture<IonInfoBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonInfoBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonInfoBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render an empty info badge', () => {
    fixture.componentRef.setInput('variant', 'primary');
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector(
      '[data-testid="info-badge"]',
    );
    expect(badge).toBeTruthy();
  });

  it('should render an info badge with icon', () => {
    const icon = 'check';
    fixture.componentRef.setInput('icon', icon);
    fixture.componentRef.setInput('variant', 'primary');
    fixture.detectChanges();

    const badgeIcon = fixture.nativeElement.querySelector(
      '[data-testid="info-badge-icon"]',
    );
    expect(badgeIcon).toBeTruthy();
  });

  it('should render an info badge with text', () => {
    const text = 'Lorem ipsum';
    fixture.componentRef.setInput('text', text);
    fixture.componentRef.setInput('variant', 'primary');
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector(
      '[data-testid="info-badge"]',
    );
    expect(badge.textContent?.trim()).toBe(text);
  });

  const variants: InfoBadgeStatus[] = [
    'primary',
    'success',
    'info',
    'warning',
    'negative',
  ];
  variants.forEach((variant) => {
    it(`should render an info badge with ${variant} variant`, () => {
      const icon = 'check';
      fixture.componentRef.setInput('icon', icon);
      fixture.componentRef.setInput('variant', variant);
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector(
        '[data-testid="info-badge"]',
      );
      expect(badge.classList.contains(variant)).toBe(true);
    });
  });
});
