import { Component, NgModule } from '@angular/core';
import { IonAccordionModule } from '../accordion/accordion.module';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { screen } from '@testing-library/angular';

@Component({
  template: `<ion-accordion-group>
    <ion-accordion name="Brisanet">
      <p data-testID="ion-accordion__main-paragraph">Context Main</p>
    </ion-accordion>
  </ion-accordion-group>`,
})
class AccordionGroupTestComponent {
  name = 'Name';
}

@NgModule({
  declarations: [AccordionGroupTestComponent],
  imports: [IonAccordionModule],
})
class AccordionTestModule {}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
let accordionTestComponent!: AccordionGroupTestComponent;
let fixture!: ComponentFixture<AccordionGroupTestComponent>;
beforeEach(async () => {
  TestBed.configureTestingModule({
    imports: [AccordionTestModule],
  }).compileComponents();
  fixture = TestBed.createComponent(AccordionGroupTestComponent);
  accordionTestComponent = fixture.componentInstance;
  fixture.detectChanges();
});

afterEach(async () => {
  fixture.destroy();
});
describe('IonAccordionGroup', () => {
  it('should render ion-accordion-group', () => {
    expect(screen.getByTestId('ion-accordion-group')).toBeTruthy();
  });

  it('should render ion-accordion with name Brisanet', () => {
    expect(screen.getByTestId('ion-accordion__header-name')).toHaveTextContent(
      'Brisanet'
    );
  });
});
