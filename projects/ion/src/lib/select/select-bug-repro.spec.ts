import { TestBed } from '@angular/core/testing';
import { IonSelectComponent } from './select.component';

describe('IonSelectComponent Bug Reproduction', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonSelectComponent],
    }).compileComponents();
  });

  it('should preserve selection when options change (search scenario)', async () => {
    const fixture = TestBed.createComponent(IonSelectComponent);
    const options = [
      { label: 'Apple', key: 'apple' },
      { label: 'Banana', key: 'banana' },
    ];
    fixture.componentRef.setInput('options', options);
    fixture.componentRef.setInput('multiple', true);
    fixture.componentRef.setInput('value', ['apple']);
    fixture.detectChanges();
    
    // Initial selection should be Apple
    expect(fixture.componentInstance.dropdownSelectedItems()).toHaveLength(1);
    expect((fixture.componentInstance.dropdownSelectedItems()[0] as any).label).toBe('Apple');

    // Change options (simulate search result)
    const newOptions = [
      { label: 'Banana', key: 'banana' },
    ];
    fixture.componentRef.setInput('options', newOptions);
    fixture.detectChanges();

    // Verification of the bug: if this fails, the bug is reproduced
    expect(fixture.componentInstance.dropdownSelectedItems()).toHaveLength(1);
    expect((fixture.componentInstance.dropdownSelectedItems()[0] as any).label).toBe('Apple');
  });
});
