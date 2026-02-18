import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonAvatarComponent } from './avatar.component';
import { AvatarType } from '../core/types/avatar';
import { SizeType } from '../core/types/size';

describe('AvatarComponent', () => {
  let component: IonAvatarComponent;
  let fixture: ComponentFixture<IonAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonAvatarComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonAvatarComponent);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Basics', () => {
    const sizes: SizeType[] = ['lg', 'md', 'sm', 'xs'];

    sizes.forEach((size: SizeType) => {
      it(`should have size-${size} class`, () => {
        fixture.componentRef.setInput('type', AvatarType.initials);
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const avatar = fixture.nativeElement.querySelector(
          '[data-testid="ion-avatar"]',
        );
        expect(avatar.classList.contains(`size-${size}`)).toBe(true);
      });
    });

    it('should have default size-md when no size is passed', () => {
      fixture.componentRef.setInput('type', AvatarType.initials);
      fixture.detectChanges();

      const avatar = fixture.nativeElement.querySelector(
        '[data-testid="ion-avatar"]',
      );
      expect(avatar.classList.contains('size-md')).toBe(true);
    });
  });

  describe('Initials', () => {
    it('should render correct initials when type is initials', () => {
      fixture.componentRef.setInput('type', AvatarType.initials);
      fixture.componentRef.setInput('value', 'Taylor Swift');
      fixture.detectChanges();

      const span = fixture.nativeElement.querySelector('span');
      expect(span.textContent).toBe('TS');
    });

    it('should render initials in uppercase', () => {
      fixture.componentRef.setInput('type', AvatarType.initials);
      fixture.componentRef.setInput('value', 'beyoncé knowles');
      fixture.detectChanges();

      const span = fixture.nativeElement.querySelector('span');
      expect(span.textContent).toBe('BK');
    });

    it('should render two first initials when value have more than two words', () => {
      fixture.componentRef.setInput('type', AvatarType.initials);
      fixture.componentRef.setInput(
        'value',
        'Stefanni Joanne Angelina Germanotta',
      );
      fixture.detectChanges();

      const span = fixture.nativeElement.querySelector('span');
      expect(span.textContent).toBe('SJ');
    });

    it('should render -- when no value is provided', () => {
      fixture.componentRef.setInput('type', AvatarType.initials);
      fixture.detectChanges();

      const span = fixture.nativeElement.querySelector('span');
      expect(span.textContent).toBe('--');
    });

    it('should only show initials', () => {
      fixture.componentRef.setInput('type', AvatarType.initials);
      fixture.componentRef.setInput('value', 'Taylor Swift');
      fixture.detectChanges();

      const span = fixture.nativeElement.querySelector('span');
      const icon = fixture.nativeElement.querySelector('ion-icon');
      const img = fixture.nativeElement.querySelector('img');

      expect(span).toBeTruthy();
      expect(span.textContent).toBe('TS');
      expect(icon).toBeFalsy();
      expect(img).toBeFalsy();
    });
  });

  describe('Icon', () => {
    it('should render correct icon when type is icon', () => {
      fixture.componentRef.setInput('type', AvatarType.icon);
      fixture.detectChanges();

      const icon = fixture.nativeElement.querySelector('ion-icon');
      expect(icon).toBeTruthy();
      expect(icon.querySelector('svg')).toHaveAttribute('id', 'ion-icon-union');
    });
  });

  describe('Photo', () => {
    it('should render avatar with image when type is photo', () => {
      const imageUrl = 'https://example.com/avatar.jpg';
      fixture.componentRef.setInput('type', AvatarType.photo);
      fixture.componentRef.setInput('image', imageUrl);
      fixture.detectChanges();

      const img = fixture.nativeElement.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.getAttribute('src')).toBe(imageUrl);
    });

    it('should render avatar with default image', () => {
      fixture.componentRef.setInput('type', AvatarType.photo);
      fixture.componentRef.setInput('image', 'assets/default.svg');
      fixture.detectChanges();

      const img = fixture.nativeElement.querySelector('img');
      expect(img).toBeTruthy();
      expect(img.getAttribute('src')).toBe('assets/default.svg');
    });
  });
});
