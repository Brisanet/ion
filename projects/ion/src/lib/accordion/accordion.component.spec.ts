import { screen, fireEvent } from '@testing-library/angular';

import { Component, NgModule } from '@angular/core';
import { IonAccordionModule } from './accordion.module';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { IonIconModule } from '../icon/icon.module';

@Component({
  template: `<ion-accordion [name]="name">
    <p data-testID="ion-accordion__main-paragraph">Context Main</p>
  </ion-accordion>`,
})
class AccordionTestComponent {
  name = '';
}

@Component({
  template: `<ion-accordion [templateHeader]="customHeader">
      <p data-testID="ion-accordion__main-paragraph">Context Main</p>
    </ion-accordion>
    <ng-template #customHeader>
      <div data-testId="ion-accordion__header-custom">
        Custom template header
        <ion-icon type="zoom-in"></ion-icon></div
    ></ng-template>`,
})
class AccordionWithTemplateHeaderTestComponent {}

@NgModule({
  declarations: [
    AccordionTestComponent,
    AccordionWithTemplateHeaderTestComponent,
  ],
  imports: [IonAccordionModule, IonIconModule],
})
class AccordionTestModule {}

describe('IonAccordion', () => {
  let accordionTestComponent!: AccordionTestComponent;
  let fixture!: ComponentFixture<AccordionTestComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AccordionTestModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AccordionTestComponent);
    accordionTestComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    fixture.destroy();
  });

  it('should render ion-accordion', async () => {
    expect(screen.getByTestId('ion-accordion')).toBeTruthy();
  });

  it('should render ion-accordion with name Brisanet', async () => {
    const accordionName = 'Brisanet';
    accordionTestComponent.name = accordionName ;
    fixture.detectChanges();
    expect(screen.getByTestId('ion-accordion__header-name')).toHaveTextContent(
      accordionName 
    );
  });

  it('should render main when clicking on header', async () => {
    const header = screen.getByTestId('ion-accordion__header-name');
    fireEvent.click(header);
    fixture.detectChanges();
    expect(screen.getByTestId('ion-accordion__main')).toBeTruthy();
    expect(
      screen.getByTestId('ion-accordion__main-paragraph')
    ).toHaveTextContent('Context Main');
  });

  it('should not render main when clicking on header twice', async () => {
    const header = screen.getByTestId('ion-accordion__header-name');
    fireEvent.click(header);
    fireEvent.click(header);
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-accordion__main')).not.toBeTruthy();
  });
});

describe('IonAccordion - template header', () => {
  let accordionWithTemplateHeaderTestComponent!: AccordionWithTemplateHeaderTestComponent;
  let fixture!: ComponentFixture<AccordionWithTemplateHeaderTestComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [CommonModule, AccordionTestModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AccordionWithTemplateHeaderTestComponent);
    accordionWithTemplateHeaderTestComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    fixture.destroy();
  });

  it('should render template header', async () => {
    const headerCustom = await screen.getByTestId(
      'ion-accordion__header-custom'
    );
    expect(headerCustom).toBeTruthy();
    expect(headerCustom).toHaveTextContent('Custom template header');
    expect(document.getElementById('ion-icon-zoom-in')).toBeTruthy();
  });
});
