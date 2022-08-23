import { IonIconComponent } from '../icon/icon.component';
import { CardEvent, CardIonComponent, IonCard } from './card.component';
import { ButtonComponent } from '../button/button.component';
import { TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  NgModule,
} from '@angular/core';
import { fireEvent, screen } from '@testing-library/angular';

let renderFooter = false;

@Component({
  template: `<ion-button
    [label]="label"
    [type]="'primary'"
    data-testid="buttonBody"
  ></ion-button>`,
})
class ButtonTestComponent {
  public label = 'Botão no body';
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
  constructor(private cdr: ChangeDetectorRef) {}
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  public cardConfig: IonCard = {
    body: ButtonTestComponent,
    header: { title: 'Título do card' },
    footer: renderFooter
      ? { body: FooterTestComponent }
      : { buttons: { primary: { label: 'Confirmar' } } },
  };

  public cardEvents(event: CardEvent) {
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
  ],
  entryComponents: [
    CardTestComponent,
    ButtonTestComponent,
    FooterTestComponent,
  ],
})
class TestModule {}

describe('CardComponent', () => {
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestModule],
    }).compileComponents();
  });

  it('should render cardComponent', async () => {
    const fixture = TestBed.createComponent(CardTestComponent);
    const cardComponent = fixture.componentInstance;
    fixture.detectChanges();
    expect(cardComponent).toBeTruthy();
    fixture.destroy();
  });

  it('should render body in cardComponent', async () => {
    const fixture = TestBed.createComponent(CardTestComponent);
    fixture.detectChanges();
    expect(screen.getByTestId('buttonBody')).toBeTruthy();
    fixture.destroy();
  });
  it('should change the card header label when the event is triggered', async () => {
    const fixture = TestBed.createComponent(CardTestComponent);
    fixture.detectChanges();

    const header = screen.getByTestId('cardHeader');
    expect(header.textContent).toBe('Título do card');

    const buttonPrimary = screen.getByTestId('buttonPrimary');
    fireEvent.click(buttonPrimary);
    fixture.detectChanges();

    expect(header.textContent).toBe('Opa, eu fui clicado evento: primary');
    fixture.destroy();
  });

  it('should render footer in cardComponent', async () => {
    renderFooter = true;
    const fixture = TestBed.createComponent(CardTestComponent);
    fixture.detectChanges();
    expect(screen.getByTestId('footerTest')).toBeInTheDocument();
  });
});
