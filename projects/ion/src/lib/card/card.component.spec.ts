import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  NgModule,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fireEvent, screen } from '@testing-library/angular';

import { IonCardComponent } from './card.component';
import { IonChipModule } from '../chip/chip.module';
import { IonButtonModule } from '../button/button.module';
import { IonIconModule } from '../icon/icon.module';
import { IonTooltipModule } from '../tooltip/tooltip.module';
import {
  IonCard,
  CardEvent,
  TooltipPosition,
  TooltipTrigger,
} from '../core/types';
import { IonChipProps } from '../core/types/chip';

let renderFooter = false;

@Component({
  template: `<ion-button
    [label]="label"
    [type]="'primary'"
    data-testid="buttonBody"
  ></ion-button>`,
})
class ButtonTestComponent {
  label = 'Botão no body';
}

@Component({
  template: `<h1 data-testid="footerTest">Aqui é o footer</h1>`,
})
class FooterTestComponent {}

@Component({
  template: `<ion-card
    [configuration]="cardConfig"
    (events)="cardEvents($event)"
  ></ion-card>`,
})
class CardTestComponent implements AfterViewInit {
  cardConfig: IonCard = {
    body: ButtonTestComponent,
    header: { title: 'Título do card' },
    footer: renderFooter
      ? { body: FooterTestComponent }
      : { buttons: { primary: { label: 'Confirmar' } } },
  };

  constructor(private cdr: ChangeDetectorRef) {}

  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }

  cardEvents(event: CardEvent): void {
    const newTitle = `Opa, eu fui clicado evento: ${JSON.stringify(
      event
    ).replace('\\"', '')}`;
    this.cardConfig.header.title = newTitle;
  }
}

@NgModule({
  imports: [
    CommonModule,
    IonIconModule,
    IonButtonModule,
    IonChipModule,
    IonTooltipModule,
  ],
  declarations: [
    CardTestComponent,
    IonCardComponent,
    ButtonTestComponent,
    FooterTestComponent,
  ],
  entryComponents: [
    CardTestComponent,
    ButtonTestComponent,
    FooterTestComponent,
  ],
})
class TestModule {}

describe('CardComponent', () => {
  let cardComponent!: CardTestComponent;
  let fixture!: ComponentFixture<CardTestComponent>;
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestModule],
    }).compileComponents();
    fixture = TestBed.createComponent(CardTestComponent);
    cardComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    fixture.destroy();
  });

  it('should render cardComponent', async () => {
    expect(cardComponent).toBeTruthy();
  });

  it('should render body in cardComponent', async () => {
    expect(screen.getByTestId('buttonBody')).toBeTruthy();
  });
  it('should change the card header label when the event is triggered', async () => {
    const header = screen.getByTestId('cardHeader');
    expect(header.textContent).toBe('Título do card');

    const buttonPrimary = screen.getByTestId('btn-Confirmar');
    fireEvent.click(buttonPrimary);
    fixture.detectChanges();
    expect(header.textContent).toBe(
      'Opa, eu fui clicado evento: {"buttonAction":"primary"}'
    );
  });

  it('should render icon on title', () => {
    cardComponent.cardConfig.header.icon = 'add';
    fixture.detectChanges();
    expect(screen.getByTestId('icon-title')).toBeInTheDocument();
  });

  it('should not render icon on title when pass null', () => {
    cardComponent.cardConfig.header.icon = undefined;
    fixture.detectChanges();
    expect(screen.queryByTestId('icon-title')).toBeNull();
  });

  it('should render info icon', () => {
    cardComponent.cardConfig.header.infoTooltip = {
      ionTooltipTitle: 'ionTooltipTitle',
      ionTooltipPosition: TooltipPosition.CENTER_LEFT,
      ionTooltipColorScheme: 'dark',
      ionTooltipTrigger: TooltipTrigger.HOVER,
      ionTooltipShowDelay: 2,
      ionTooltipArrowPointAtCenter: true,
    };
    fixture.detectChanges();
    expect(screen.queryByTestId('icon-info')).toBeInTheDocument();
  });

  it('should render footer in cardComponent', async () => {
    renderFooter = true;
    fixture = TestBed.createComponent(CardTestComponent);
    fixture.detectChanges();
    expect(screen.getByTestId('footerTest')).toBeInTheDocument();
  });

  it('should not render chips by default', async () => {
    cardComponent.cardConfig.header.chips = undefined;
    fixture.detectChanges();
    const chipsContainer = screen.queryByTestId('chips-container');
    expect(chipsContainer).toBeNull();
  });

  const testChips = [{ label: 'first' }, { label: 'second' }];
  const chipWithOptions = [
    {
      label: 'Choose one',
      options: [{ label: 'first' }, { label: 'second' }],
      dropdownSearchConfig: {
        enableSearch: true,
        searchOptions: {
          placeholder: 'Busque um animal',
        },
      },
    },
  ];

  it.each(testChips)(
    'should render chip with label $label',
    async (chip: IonChipProps) => {
      cardComponent.cardConfig.header.chips = testChips;
      fixture.detectChanges();
      expect(screen.getByText(chip.label)).toBeTruthy();
    }
  );
  it.each(testChips)(
    'chip with label $label should not be selected',
    async (chip: IonChipProps) => {
      cardComponent.cardConfig.header.chips = testChips;
      fixture.detectChanges();
      expect(screen.getByText(chip.label)).not.toHaveClass('chip-selected');
    }
  );

  it('should emit an event when a chip is clicked', async () => {
    const header = screen.getByTestId('cardHeader');
    cardComponent.cardConfig.header.chips = testChips;
    fixture.detectChanges();
    fireEvent.click(screen.getByText(testChips[0].label));
    fixture.detectChanges();
    expect(header.textContent).toBe(
      'Opa, eu fui clicado evento: {"chipSelected":{"chip":{"label":"first"},"index":0}}'
    );
  });

  it('should emit an event when a option is selected from chip dropdown', async () => {
    const header = screen.getByTestId('cardHeader');
    cardComponent.cardConfig.header.chips = chipWithOptions;
    fixture.detectChanges();
    const chip = screen.getByText('Choose one');
    fireEvent.click(chip);
    fixture.detectChanges();
    const firstOption = screen.getByText(chipWithOptions[0].options[0].label);
    fireEvent.click(firstOption);
    fixture.detectChanges();

    expect(header.textContent).toBe(
      `Opa, eu fui clicado evento: {"selectedFromChipDropdown":[{"label":"${chipWithOptions[0].options[0].label}","selected":true}]}`
    );
  });
});
