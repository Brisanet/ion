import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonIconComponent } from './icon.component';
import { Highlight } from '../core/types/icon';

describe('IonIconComponent', () => {
  let component: IonIconComponent;
  let fixture: ComponentFixture<IonIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonIconComponent);
    component = fixture.componentInstance;
  });

  it('should render a correct icon', () => {
    fixture.componentRef.setInput('type', 'pencil');
    fixture.detectChanges();
    const elementRendered =
      fixture.nativeElement.querySelector('#ion-icon-pencil');
    expect(elementRendered).toBeTruthy();
  });

  it('should render icon with default size', () => {
    fixture.componentRef.setInput('type', 'trash');
    fixture.detectChanges();
    const svgElement = fixture.nativeElement.querySelector('svg');
    const defaultSize = '24px';
    expect(svgElement.getAttribute('height')).toBe(defaultSize);
    expect(svgElement.getAttribute('width')).toBe(defaultSize);
  });

  it('should render icon with default color', () => {
    fixture.componentRef.setInput('type', 'trash');
    fixture.detectChanges();
    const svgElement = fixture.nativeElement.querySelector('svg');
    const defaultColor = '#282b33';
    expect(svgElement.getAttribute('fill')).toBe(defaultColor);
  });

  it('should render icon with custom size', () => {
    const size = 60;
    fixture.componentRef.setInput('type', 'trash');
    fixture.componentRef.setInput('size', size);
    fixture.detectChanges();
    const svgElement = fixture.nativeElement.querySelector('svg');
    expect(svgElement.getAttribute('width')).toBe(`${size}px`);
  });

  it('should render icon with custom color', () => {
    const color = 'red';
    fixture.componentRef.setInput('type', 'trash');
    fixture.componentRef.setInput('color', color);
    fixture.detectChanges();
    const svgElement = fixture.nativeElement.querySelector('svg');
    expect(svgElement.getAttribute('fill')).toBe(color);
  });

  const iconSizes = {
    sm: 16,
    md: 24,
  };

  describe('IonIconComponent - With Simple Highlight', () => {
    it('should render the outside circle with double the icon size and the color with a 10% transparency', () => {
      fixture.componentRef.setInput('type', 'box');
      fixture.componentRef.setInput('color', '#FF0016');
      fixture.componentRef.setInput('size', iconSizes.sm);
      fixture.componentRef.setInput('highlight', Highlight.SIMPLE);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector(
        '[data-testid="outside-container"]',
      );

      // Check individual styles instead of exact string match to be more robust
      expect(container.style.backgroundColor).toBe('rgba(255, 0, 22, 0.102)');
      expect(container.style.width).toBe(`${iconSizes.sm * 2}px`);
      expect(container.style.height).toBe(`${iconSizes.sm * 2}px`);
    });
  });

  describe('IonIconComponent - With Double Highlight', () => {
    it('should render the outer circle with the right proportion when the icon size is smaller than md', () => {
      fixture.componentRef.setInput('type', 'left');
      fixture.componentRef.setInput('color', '#FF0016');
      fixture.componentRef.setInput('size', iconSizes.sm);
      fixture.componentRef.setInput('highlight', Highlight.DOUBLE);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector(
        '[data-testid="outside-container"]',
      );

      expect(container.style.backgroundColor).toBe('rgba(255, 0, 22, 0.102)');
      expect(container.style.width).toBe(`${iconSizes.sm * 2.5}px`);
      expect(container.style.height).toBe(`${iconSizes.sm * 2.5}px`);
    });

    it('should render the outer circle with the right proportion when the icon size is at least md', () => {
      fixture.componentRef.setInput('type', 'box');
      fixture.componentRef.setInput('color', '#FF0016');
      fixture.componentRef.setInput('size', iconSizes.md);
      fixture.componentRef.setInput('highlight', Highlight.DOUBLE);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector(
        '[data-testid="outside-container"]',
      );

      expect(container.style.backgroundColor).toBe('rgba(255, 0, 22, 0.102)');
      expect(container.style.width).toBe(`${iconSizes.md * 2.25}px`);
      expect(container.style.height).toBe(`${iconSizes.md * 2.25}px`);
    });

    it('should render the inner circle with the right proportion and the color with 25% trasparency when the icon size is smaller than md', () => {
      fixture.componentRef.setInput('type', 'left');
      fixture.componentRef.setInput('color', '#FF0016');
      fixture.componentRef.setInput('size', iconSizes.sm);
      fixture.componentRef.setInput('highlight', Highlight.DOUBLE);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector(
        '[data-testid="inner-container"]',
      );

      expect(container.style.backgroundColor).toBe('rgba(255, 0, 22, 0.251)');
      expect(container.style.width).toBe(`${iconSizes.sm * 1.75}px`);
      expect(container.style.height).toBe(`${iconSizes.sm * 1.75}px`);
    });

    it('should render the inner circle with the right proportion and the color with 25% trasparency when the icon size is at least md', () => {
      fixture.componentRef.setInput('type', 'box');
      fixture.componentRef.setInput('color', '#FF0016');
      fixture.componentRef.setInput('size', iconSizes.md);
      fixture.componentRef.setInput('highlight', Highlight.DOUBLE);
      fixture.detectChanges();

      const container = fixture.nativeElement.querySelector(
        '[data-testid="inner-container"]',
      );

      expect(container.style.backgroundColor).toBe('rgba(255, 0, 22, 0.251)');
      expect(container.style.width).toBe(`${iconSizes.md * 1.5}px`);
      expect(container.style.height).toBe(`${iconSizes.md * 1.5}px`);
    });
  });
});
