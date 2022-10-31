import { DropdownComponent } from '../dropdown/dropdown.component';
import { BadgeComponent } from '../badge/badge.component';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  NgModule,
} from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { fireEvent, screen } from '@testing-library/angular';
import { ButtonComponent } from '../button/button.component';
import { IonIconComponent } from '../icon/icon.component';
import { CardEvent, CardIonComponent, IonCard } from './card.component';

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
    this.cardConfig.header.title = `Opa, eu fui clicado evento: ${event.buttonAction}`;
  }
}

@NgModule({
  imports: [CommonModule],
  declarations: [
    CardTestComponent,
    CardIonComponent,
    ButtonComponent,
    IonIconComponent,
    ButtonTestComponent,
    FooterTestComponent,
    DropdownComponent,
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
    expect(header.textContent).toBe('Opa, eu fui clicado evento: primary');
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
});
