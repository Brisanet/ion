import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { screen, fireEvent, render } from '@testing-library/angular';
import { IonAccordionModule } from '../accordion.module';
import { IonIconModule } from '../../icon/icon.module';
import { IonAccordionItemComponent } from './accordion-item.component';
import { IonAccordionItemProps } from '../../core/types';
import { SafeAny } from '../../utils/safe-any';

@Component({
  template: `<ion-accordion-item [templateHeader]="customHeader" [data]="data">
      <p data-testid="ion-accordion-item__main-paragraph">Context Main</p>
    </ion-accordion-item>
    <ng-template #customHeader> {{ data.name }}</ng-template>`,
})
class AccordionItemTestComponent {
  data = { name: 'Accordion header' };
}

@NgModule({
  declarations: [AccordionItemTestComponent],
  imports: [CommonModule, IonAccordionModule, IonIconModule],
})
class AccordionTestModule {}

describe('IonAccordionItem', () => {
  let accordionTestComponent!: AccordionItemTestComponent;
  let fixture!: ComponentFixture<AccordionItemTestComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [AccordionTestModule],
    }).compileComponents();
    fixture = TestBed.createComponent(AccordionItemTestComponent);
    accordionTestComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    fixture.destroy();
  });

  it('should render ion-accordion-item', async () => {
    expect(screen.getByTestId('ion-accordion-item')).toBeTruthy();
  });

  it('should render the header with the name Brisanet', async () => {
    const accordionHeader = 'Brisanet';
    accordionTestComponent.data.name = accordionHeader;
    fixture.detectChanges();
    expect(screen.getByTestId('ion-accordion-item__header')).toHaveTextContent(
      accordionHeader
    );
  });

  it('should render the chevron by default', async () => {
    expect(document.getElementById('ion-icon-semi-down')).toBeTruthy();
  });

  it('should render main when clicking on header', async () => {
    const header = screen.getByTestId('ion-accordion-item__header');
    fireEvent.click(header);
    fixture.detectChanges();
    expect(screen.getByTestId('ion-accordion-item__main')).toBeTruthy();
    expect(
      screen.getByTestId('ion-accordion-item__main-paragraph')
    ).toHaveTextContent('Context Main');
  });

  it('should not render main when clicking on header twice', async () => {
    const header = screen.getByTestId('ion-accordion-item__header');
    fireEvent.click(header);
    fireEvent.click(header);
    fixture.detectChanges();
    expect(screen.queryByTestId('ion-accordion-item__main')).not.toBeTruthy();
  });
});

describe('IonAccordionItem - throw an error', () => {
  const sut = async (
    customProps: IonAccordionItemProps = {} as SafeAny
  ): Promise<void> => {
    await render(IonAccordionItemComponent, {
      componentProperties: { ...customProps },
      imports: [CommonModule, IonIconModule],
    });
  };

  it('should throw an error when templateHeader propertie do not exist', async () => {
    try {
      await sut();
    } catch (error) {
      expect(error.message).toBe(
        'The templateHeader propertie were not set correctly'
      );
    }
  });
});
