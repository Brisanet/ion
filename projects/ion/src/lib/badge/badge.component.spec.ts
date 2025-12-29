import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonBadgeComponent } from './badge.component';
import { BadgeType } from '../core/types';

describe('BadgeComponent', () => {
  let component: IonBadgeComponent;
  let fixture: ComponentFixture<IonBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonBadgeComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonBadgeComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render badge with label', () => {
    const label = 'Projeto';
    fixture.componentRef.setInput('label', label);
    fixture.componentRef.setInput('type', 'primary');
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.ion-badge span');
    expect(badge.textContent).toBe(label);
  });

  it.each([10, 99, 6, 0])(
    'should render badge with value %i',
    (value: number) => {
      fixture.componentRef.setInput('value', value);
      fixture.componentRef.setInput('type', 'primary');
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.ion-badge span');
      expect(badge.textContent).toBe(value.toString());
    },
  );

  it('should render badge with value when has label and value', () => {
    const value = 10;
    const label = 'label and value';
    fixture.componentRef.setInput('value', value);
    fixture.componentRef.setInput('label', label);
    fixture.componentRef.setInput('type', 'primary');
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.ion-badge span');
    expect(badge.textContent).toBe(value.toString());
    expect(badge.textContent).not.toBe(label);
  });

  it.each([100, 101, 1000])(
    'should render 99+ when value is %i (bigger than 99)',
    (value: number) => {
      fixture.componentRef.setInput('value', value);
      fixture.componentRef.setInput('type', 'primary');
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.ion-badge span');
      expect(badge.textContent).toBe('99+');
    },
  );

  const badgeTypes: BadgeType[] = [
    'primary',
    'secondary',
    'neutral',
    'negative',
    'warning',
  ];

  badgeTypes.forEach((type: BadgeType) => {
    it(`should render badge with correct class for type ${type}`, () => {
      fixture.componentRef.setInput('type', type);
      fixture.componentRef.setInput('label', type);
      fixture.detectChanges();

      const badge = fixture.nativeElement.querySelector('.ion-badge span');
      expect(badge.classList.contains(`badge-${type}`)).toBe(true);
      expect(badge.textContent).toBe(type);
    });
  });
});
