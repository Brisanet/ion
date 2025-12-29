import { Component, TemplateRef, viewChild } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonAccordionComponent } from './accordion.component';
import { CommonModule } from '@angular/common';
import { SafeAny } from '../utils/safe-any';
import { fireEvent, screen } from '@testing-library/dom';
import { AccordionItem } from '../core/types/accordion';

interface Websites {
  name: string;
  url: string;
}

const webSites = [
  { name: 'Brisanet', url: 'https://www.brisanet.com.br/' },
  { name: 'Google', url: 'https://www.google.com.br/' },
];

@Component({
  template: `
    <ion-accordion
      [accordions]="accordions"
      [modeAccordion]="modeAccordion"
      [templateBody]="bodyTemplate"
      [templateHeader]="headerTemplate"
    >
    </ion-accordion>

    <ng-template #headerTemplate let-data>
      <span>{{ data.name }}</span>
    </ng-template>

    <ng-template #bodyTemplate let-data>
      <div>
        <h3>Url</h3>
        <p>{{ data.url }}</p>
      </div>
    </ng-template>
  `,
  standalone: true,
  imports: [IonAccordionComponent, CommonModule],
})
class AccordionTestComponent {
  accordions: any[] = webSites;
  modeAccordion = true;
  headerTemplate = viewChild.required<TemplateRef<SafeAny>>('headerTemplate');
  bodyTemplate = viewChild.required<TemplateRef<SafeAny>>('bodyTemplate');
}

describe('IonAccordionComponent', () => {
  let component: AccordionTestComponent;
  let fixture: ComponentFixture<AccordionTestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccordionTestComponent, IonAccordionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AccordionTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render ion-accordion', () => {
    expect(screen.getByTestId('ion-accordion')).toBeTruthy();
  });

  it('should render headers correctly', () => {
    const headers = screen.getAllByTestId('ion-accordion-item__header');
    expect(headers[0]).toHaveTextContent(component.accordions[0].name);
    expect(headers[1]).toHaveTextContent(component.accordions[1].name);
  });

  it('should correctly render the main of the corresponding header', () => {
    const headers = screen.getAllByTestId('ion-accordion-item__header');

    // Open first one
    fireEvent.click(headers[0]);
    fixture.detectChanges();
    let mains = screen.getAllByTestId('ion-accordion-item__main');
    expect(mains.length).toBe(1);
    expect(mains[0]).toHaveTextContent(webSites[0].url);

    // Open second one (should close first one)
    fireEvent.click(headers[1]);
    fixture.detectChanges();
    mains = screen.getAllByTestId('ion-accordion-item__main');
    expect(mains.length).toBe(1);
    expect(mains[0]).toHaveTextContent(webSites[1].url);
  });
});
