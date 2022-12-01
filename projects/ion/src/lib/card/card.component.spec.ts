import { BadgeComponent } from 'projects/ion/src/public-api';
import { ChipComponent, IonChipProps } from './../chip/chip.component';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  NgModule,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fireEvent, screen } from '@testing-library/angular';
import { CardEvent, CardIonComponent, IonCard } from './card.component';
import { InfoBadgeComponent } from '../info-badge/info-badge.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { IonIconComponent } from '../icon/icon.component';
import { ButtonComponent } from '../button/button.component';

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
  imports: [CommonModule],
  declarations: [
    CardTestComponent,
    CardIonComponent,
    ButtonTestComponent,
    FooterTestComponent,
    ChipComponent,
    InfoBadgeComponent,
    DropdownComponent,
    IonIconComponent,
    ButtonComponent,
    BadgeComponent,
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

    const buttonPrimary = screen.getByTestId('buttonPrimary');
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
  it.each(testChips)(
    'should render chip with label %i',
    async (chip: IonChipProps) => {
      cardComponent.cardConfig.header.chips = testChips;
      fixture.detectChanges();
      expect(screen.getByText(chip.label)).toBeTruthy();
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
});
