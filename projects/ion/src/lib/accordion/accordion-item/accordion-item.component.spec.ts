import { Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonAccordionItemComponent } from './accordion-item.component';
import { IonIconComponent } from '../../icon/icon.component';

import { SafeAny } from '../../utils/safe-any';
import { fireEvent, screen } from '@testing-library/dom';
import { By } from '@angular/platform-browser';

@Component({
  template: `
    <ion-accordion-item
      [templateHeader]="headerTemplate"
      [data]="data"
      [show]="show"
      (activeChange)="toggle()"
    >
      <p data-testid="ion-accordion-item__main-paragraph">Context Main</p>
    </ion-accordion-item>
    <ng-template #headerTemplate let-data>
      <span>{{ data.name }}</span>
    </ng-template>
  `,
  standalone: true,
  imports: [IonAccordionItemComponent],
})
class AccordionItemTestComponent {
  data = { name: 'Accordion header' };
  show = false;
  headerTemplate = viewChild.required<TemplateRef<SafeAny>>('headerTemplate');

  toggle() {
    this.show = !this.show;
  }
}

describe('IonAccordionItemComponent', () => {
  let component: AccordionItemTestComponent;
  let fixture: ComponentFixture<AccordionItemTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AccordionItemTestComponent,
        IonAccordionItemComponent,
        IonIconComponent,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionItemTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render ion-accordion-item', () => {
    expect(screen.getByTestId('ion-accordion-item')).toBeTruthy();
  });

  it('should render the header with the name Brisanet', () => {
    const accordionHeader = 'Brisanet';
    component.data = { name: accordionHeader };
    fixture.detectChanges();
    expect(screen.getByTestId('ion-accordion-item__header')).toHaveTextContent(
      accordionHeader,
    );
  });

  it('should render the chevron by default', () => {
    const iconDebugElement = fixture.debugElement.query(
      By.directive(IonIconComponent),
    );
    expect(iconDebugElement).toBeTruthy();
    const iconInstance = iconDebugElement.componentInstance as IonIconComponent;
    expect(iconInstance.type()).toBe('semi-down');
  });

  it('should render main when clicking on header', () => {
    const header = screen.getByTestId('ion-accordion-item__header');
    fireEvent.click(header);
    fixture.detectChanges();
    expect(screen.getByTestId('ion-accordion-item__main')).toBeTruthy();
    expect(
      screen.getByTestId('ion-accordion-item__main-paragraph'),
    ).toHaveTextContent('Context Main');
  });

  it('should not render main when clicking on header twice', () => {
    const header = screen.getByTestId('ion-accordion-item__header');
    fireEvent.click(header);
    fixture.detectChanges();
    fireEvent.click(header);
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-accordion-item__main')).toBeNull();
  });
});
