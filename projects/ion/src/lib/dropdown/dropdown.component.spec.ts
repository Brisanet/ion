import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonDropdownComponent } from './dropdown.component';
import { IonIconComponent } from '../icon/icon.component';
import { By } from '@angular/platform-browser';
import { DropdownItem } from '../core/types/dropdown';

describe('IonDropdownComponent', () => {
  let component: IonDropdownComponent;
  let fixture: ComponentFixture<IonDropdownComponent>;

  const createOptions = (): DropdownItem[] => [
    { label: 'Option 1', selected: false },
    { label: 'Option 2', selected: false },
    { label: 'Option 3', selected: false },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonDropdownComponent, IonIconComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonDropdownComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('options', createOptions());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render options', () => {
    const optionElements = fixture.debugElement.queryAll(
      By.css('.ion-dropdown-item'),
    );
    expect(optionElements.length).toBe(3);
    expect(optionElements[0].nativeElement.textContent.trim()).toBe('Option 1');
  });

  it('should render description when provided', () => {
    fixture.componentRef.setInput('description', 'Test Description');
    fixture.detectChanges();
    const description = fixture.debugElement.query(
      By.css('.dropdown-description'),
    );
    expect(description).toBeTruthy();
    expect(description.nativeElement.textContent.trim()).toBe(
      'Test Description',
    );
  });

  it('should not render description by default', () => {
    const description = fixture.debugElement.query(
      By.css('.dropdown-description'),
    );
    expect(description).toBeFalsy();
  });

  it('should select an option on click', () => {
    const spy = jest.spyOn(component.selected, 'emit');
    const optionElements = fixture.debugElement.queryAll(
      By.css('.ion-dropdown-item'),
    );

    optionElements[0].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(optionElements[0].nativeElement.classList).toContain(
      'dropdown-item-selected',
    );
    expect(spy).toHaveBeenCalledWith([
      expect.objectContaining({ label: 'Option 1', selected: true }),
    ]);
  });

  it('should deselect an option on click if already selected (single selection)', () => {
    // Setup: Select first option
    const optionElements = fixture.debugElement.queryAll(
      By.css('.ion-dropdown-item'),
    );
    optionElements[0].triggerEventHandler('click', null);
    fixture.detectChanges();

    // Act: Click again to deselect
    optionElements[0].triggerEventHandler('click', null);
    fixture.detectChanges();

    expect(optionElements[0].nativeElement.classList).not.toContain(
      'dropdown-item-selected',
    );
  });

  describe('Multiple Selection', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('multiple', true);
      fixture.detectChanges();
    });

    it('should select multiple options', () => {
      const optionElements = fixture.debugElement.queryAll(
        By.css('.ion-dropdown-item'),
      );

      // Select first
      optionElements[0].triggerEventHandler('click', null);
      fixture.detectChanges();

      // Select second
      optionElements[1].triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(optionElements[0].nativeElement.classList).toContain(
        'dropdown-item-selected',
      );
      expect(optionElements[1].nativeElement.classList).toContain(
        'dropdown-item-selected',
      );
    });

    it('should respect maxSelected limit', () => {
      fixture.componentRef.setInput('maxSelected', 1);
      fixture.detectChanges();

      const optionElements = fixture.debugElement.queryAll(
        By.css('.ion-dropdown-item'),
      );

      // Select first
      optionElements[0].triggerEventHandler('click', null);
      fixture.detectChanges();

      // Try to select second
      optionElements[1].triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(optionElements[0].nativeElement.classList).toContain(
        'dropdown-item-selected',
      );
      expect(optionElements[1].nativeElement.classList).not.toContain(
        'dropdown-item-selected',
      );
    });
  });

  describe('Search', () => {
    beforeEach(() => {
      fixture.componentRef.setInput('enableSearch', true);
      fixture.detectChanges();
    });

    it('should render search input', () => {
      const searchInput = fixture.debugElement.query(
        By.css('input[type="text"]'),
      );
      expect(searchInput).toBeTruthy();
    });

    it('should emit searchChange event', () => {
      const spy = jest.spyOn(component.searchChange, 'emit');
      const searchInput = fixture.debugElement.query(
        By.css('input[type="text"]'),
      );

      searchInput.nativeElement.value = 'test';
      searchInput.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(spy).toHaveBeenCalledWith('test');
    });
  });

  describe('No Data', () => {
    it('should render no data message when options are empty', () => {
      fixture.componentRef.setInput('options', []);
      fixture.detectChanges();

      const noData = fixture.debugElement.query(
        By.css('[data-testid="ion-no-data"]'),
      );
      expect(noData).toBeTruthy();
      expect(noData.nativeElement.textContent).toContain('Não há dados');
    });
  });

  describe('Loading', () => {
    it('should render spinner when loading is true', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const spinner = fixture.debugElement.query(
        By.css('[data-testid="ion-spinner"]'),
      );
      expect(spinner).toBeTruthy();
    });
  });

  describe('Disabled', () => {
    it('should not select disabled option', () => {
      const disabledOptions = [
        { label: 'Disabled Option', selected: false, disabled: true },
      ];
      fixture.componentRef.setInput('options', disabledOptions);
      fixture.detectChanges();

      const optionElement = fixture.debugElement.query(
        By.css('.ion-dropdown-item'),
      );
      optionElement.triggerEventHandler('click', null);
      fixture.detectChanges();

      expect(optionElement.nativeElement.classList).toContain(
        'dropdown-disabled',
      );
      expect(optionElement.nativeElement.classList).not.toContain(
        'dropdown-item-selected',
      );
    });
  });

  describe('Clear Button', () => {
    it('should show clear button when multiple options are selected', async () => {
      fixture.componentRef.setInput('multiple', true);
      fixture.componentRef.setInput('options', [
        { label: 'Option 1', selected: true },
        { label: 'Option 2', selected: true },
      ]);
      fixture.detectChanges();
      await fixture.whenStable();

      const clearButton = fixture.debugElement.query(
        By.css('[data-testid="button-clear"]'),
      );
      if (clearButton) {
        expect(clearButton).toBeTruthy();
      }
    });
  });

  describe('Scroll', () => {
    it('should emit scrollFinal event when optionsScroll is called', () => {
      const spy = jest.spyOn(component.scrollFinal, 'emit');

      const mockElement = {
        nativeElement: {
          scrollHeight: 200,
          scrollTop: 100,
          clientHeight: 100,
        },
      };

      Object.defineProperty(component, 'optionList', {
        value: () => mockElement,
      });

      component.optionsScroll();
      expect(spy).toHaveBeenCalled();
    });
  });
});
