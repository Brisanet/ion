import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonDrawerComponent } from './drawer.component';
import { IonButtonProps } from '../core/types/button';
import { By } from '@angular/platform-browser';

describe('IonDrawerComponent', () => {
  let component: IonDrawerComponent;
  let fixture: ComponentFixture<IonDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonDrawerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('isOpen', () => {
    it('should show the drawer when isOpen is true', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
      const drawer = fixture.nativeElement.querySelector('.ion-drawer-content');
      expect(drawer.classList.contains('ion-drawer-open')).toBe(true);
    });

    it('should hide the drawer when isOpen is false', () => {
      fixture.componentRef.setInput('isOpen', false);
      fixture.detectChanges();
      const drawer = fixture.nativeElement.querySelector('.ion-drawer-content');
      expect(drawer.classList.contains('ion-drawer-open')).toBe(false);
    });

    it('should show the backdrop when isOpen is true', () => {
      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('.ion-drawer-backdrop')).toBeTruthy();
    });
  });

  describe('direction', () => {
    const directions: Array<'left' | 'right' | 'top' | 'bottom'> = [
      'left',
      'right',
      'top',
      'bottom',
    ];
    directions.forEach((direction) => {
      it(`should render the drawer with direction ${direction}`, () => {
        fixture.componentRef.setInput('direction', direction);
        fixture.detectChanges();
        const drawer = fixture.nativeElement.querySelector('.ion-drawer-content');
        expect(drawer.classList.contains(`ion-drawer-${direction}`)).toBe(true);
      });
    });
  });

  describe('title and iconTitle', () => {
    it('should render the title', () => {
      const title = 'Drawer Title';
      fixture.componentRef.setInput('title', title);
      fixture.detectChanges();
      expect(fixture.nativeElement.textContent).toContain(title);
    });

    it('should render the icon when iconTitle is provided', () => {
      fixture.componentRef.setInput('title', 'Title');
      fixture.componentRef.setInput('iconTitle', 'trash');
      fixture.detectChanges();
      expect(fixture.nativeElement.querySelector('ion-icon')).toBeTruthy();
    });
  });

  describe('size', () => {
    it('should set the drawer size correctly', () => {
      fixture.componentRef.setInput('size', 50);
      fixture.detectChanges();
      expect(
        fixture.nativeElement.style.getPropertyValue('--ion-drawer-size')
      ).toBe('50%');
    });

    it('should cap the size at 75%', () => {
      fixture.componentRef.setInput('size', 90);
      fixture.detectChanges();
      expect(
        fixture.nativeElement.style.getPropertyValue('--ion-drawer-size')
      ).toBe('75%');
    });
  });

  describe('Buttons and Actions', () => {
    const submitButton: IonButtonProps = { label: 'Submit' };
    const cancelButton: IonButtonProps = { label: 'Cancel' };
    const secondaryButton: IonButtonProps = { label: 'Secondary' };

    it('should render submit and cancel buttons when provided', () => {
      fixture.componentRef.setInput('submitButton', submitButton);
      fixture.componentRef.setInput('cancelButton', cancelButton);
      fixture.detectChanges();

      const buttons = fixture.nativeElement.querySelectorAll('ion-button');
      const buttonLabels = Array.from(buttons).map((btn: any) =>
        btn.getAttribute('ng-reflect-label')
      );

      expect(buttonLabels).toContain('Submit');
      expect(buttonLabels).toContain('Cancel');
    });

    it('should emit ionOnSubmit when submit button is clicked', () => {
      const ionOnSubmitSpy = jest.fn();
      component.ionOnSubmit.subscribe(ionOnSubmitSpy);

      fixture.componentRef.setInput('submitButton', submitButton);
      fixture.detectChanges();

      const submitBtn = fixture.debugElement.query(
        By.css('.ion-drawer-footer-actions ion-button:last-child')
      );
      submitBtn.triggerEventHandler('ionOnClick', null);

      expect(ionOnSubmitSpy).toHaveBeenCalled();
    });

    it('should emit ionOnClose (via close()) when cancel button is clicked', () => {
      const ionOnCloseSpy = jest.fn();
      component.ionOnClose.subscribe(ionOnCloseSpy);

      fixture.componentRef.setInput('cancelButton', cancelButton);
      fixture.detectChanges();

      const cancelBtn = fixture.debugElement.query(
        By.css('.ion-drawer-footer-actions ion-button:first-child')
      );
      cancelBtn.triggerEventHandler('ionOnClick', null);

      expect(ionOnCloseSpy).toHaveBeenCalled();
    });

    it('should emit ionOnClose when close icon is clicked', () => {
      const ionOnCloseSpy = jest.fn();
      component.ionOnClose.subscribe(ionOnCloseSpy);
      fixture.detectChanges();

      const closeIconBtn = fixture.debugElement.query(
        By.css('header ion-button')
      );
      closeIconBtn.triggerEventHandler('ionOnClick', null);

      expect(ionOnCloseSpy).toHaveBeenCalled();
    });

    it('should emit ionOnSecondary when secondary button is clicked', () => {
      const ionOnSecondarySpy = jest.fn();
      component.ionOnSecondary.subscribe(ionOnSecondarySpy);

      fixture.componentRef.setInput('submitButton', submitButton);
      fixture.componentRef.setInput('secondaryButton', secondaryButton);
      fixture.detectChanges();

      const secondaryBtn = fixture.debugElement.query(
        By.css('.ion-drawer-footer > ion-button')
      );
      secondaryBtn.triggerEventHandler('ionOnClick', null);

      expect(ionOnSecondarySpy).toHaveBeenCalled();
    });
  });

  describe('Closing events', () => {
    it('should emit ionOnClose when backdrop is clicked', () => {
      const ionOnCloseSpy = jest.fn();
      component.ionOnClose.subscribe(ionOnCloseSpy);

      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const backdrop = fixture.nativeElement.querySelector(
        '.ion-drawer-backdrop'
      );
      backdrop.click();

      expect(ionOnCloseSpy).toHaveBeenCalled();
    });

    it('should emit ionOnClose when Escape key is pressed on backdrop', () => {
      const ionOnCloseSpy = jest.fn();
      component.ionOnClose.subscribe(ionOnCloseSpy);

      fixture.componentRef.setInput('isOpen', true);
      fixture.detectChanges();

      const backdrop = fixture.nativeElement.querySelector(
        '.ion-drawer-backdrop'
      );
      backdrop.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

      expect(ionOnCloseSpy).toHaveBeenCalled();
    });
  });
});
