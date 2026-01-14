import { Component } from '@angular/core';
import { render, screen } from '@testing-library/angular';
import { CommonModule } from '@angular/common';

// Importação dos seus componentes
import { IonCardComponent } from './card.component';
import { IonCardHeaderComponent } from './card-header.component';
import { IonCardFooterComponent } from './card-footer.component';
import { IonIconComponent } from '../icon/icon.component';

// --- Constantes para Teste ---
const cardTitle = 'Título do card';
const bodyText = 'Conteúdo do corpo';
const footerText = 'Conteúdo do footer';

// --- Wrapper 1: Cenário Padrão (Inputs e Slots) ---
@Component({
  template: `
    <ion-card>
      <ion-card-header [title]="title" [icon]="icon" [tooltip]="tooltip">
        <div slot="actions" data-testid="actions-content">Actions</div>
      </ion-card-header>

      <div data-testid="card-body">{{ bodyText }}</div>

      <ion-card-footer>
        <div data-testid="card-footer">{{ footerText }}</div>
      </ion-card-footer>
    </ion-card>
  `,
  standalone: true,
  imports: [
    CommonModule,
    IonCardComponent,
    IonCardHeaderComponent,
    IonCardFooterComponent,
    IonIconComponent,
  ],
})
class FullCardTestWrapperComponent {
  title = cardTitle;
  bodyText = bodyText;
  footerText = footerText;
  icon = 'add';
  tooltip = { ionTooltipTitle: 'Tooltip de teste' };
}

// --- Wrapper 2: Cenário Custom Header (Sem Title) ---
@Component({
  template: `
    <ion-card>
      <ion-card-header>
        <div data-testid="custom-header-content">Conteúdo Customizado</div>
      </ion-card-header>
    </ion-card>
  `,
  standalone: true,
  imports: [IonCardComponent, IonCardHeaderComponent],
})
class CustomHeaderTestWrapperComponent {}

// --- Wrapper 3: Cenário de Exclusividade (Title vs Content) ---
@Component({
  template: `
    <ion-card-header title="Titulo Presente">
      <div data-testid="should-not-render">Conteúdo que deve sumir</div>
    </ion-card-header>
  `,
  standalone: true,
  imports: [IonCardHeaderComponent],
})
class ExclusionTestWrapperComponent {}

// --- Suíte de Testes ---
describe('IonCard Component Suite', () => {
  describe('Standard Layout (Inputs & Slots)', () => {
    beforeEach(async () => {
      await render(FullCardTestWrapperComponent);
    });

    it('should render card title correctly from input', () => {
      expect(screen.getByTestId('cardHeader')).toHaveTextContent(cardTitle);
    });

    it('should render card icon when icon input is provided', () => {
      expect(screen.getByTestId('icon-title')).toBeInTheDocument();
    });

    it('should render tooltip icon when configuration is provided', () => {
      expect(screen.getByTestId('icon-info')).toBeInTheDocument();
    });

    it('should project actions content into the specific actions slot', () => {
      expect(screen.getByTestId('actions-content')).toHaveTextContent(
        'Actions'
      );
      expect(screen.getByTestId('header-actions')).toContainElement(
        screen.getByTestId('actions-content')
      );
    });

    it('should project body content into the main container', () => {
      expect(screen.getByTestId('card-body')).toHaveTextContent(bodyText);
    });

    it('should project footer content into ion-card-footer', () => {
      expect(screen.getByTestId('card-footer')).toHaveTextContent(footerText);
    });
  });

  describe('Flexible Header (Content Projection)', () => {
    it('should render custom content in header when no title input is provided', async () => {
      await render(CustomHeaderTestWrapperComponent);
      expect(screen.getByTestId('custom-header-content')).toHaveTextContent(
        'Conteúdo Customizado'
      );
    });

    it('should NOT render projected content if title input is present (Priority Test)', async () => {
      await render(ExclusionTestWrapperComponent);

      // O título deve estar lá
      expect(screen.getByText('Titulo Presente')).toBeInTheDocument();

      // O conteúdo projetado não deve aparecer devido ao @else no template
      const customContent = screen.queryByTestId('should-not-render');
      expect(customContent).not.toBeInTheDocument();
    });
  });

  describe('Edge Cases', () => {
    it('should not render icon-title element if icon input is null', async () => {
      await render(IonCardHeaderComponent, {
        componentInputs: { title: 'Apenas Título', icon: undefined },
      });
      expect(screen.queryByTestId('icon-title')).not.toBeInTheDocument();
    });

    it('should not render tooltip if tooltip configuration is missing', async () => {
      await render(IonCardHeaderComponent, {
        componentInputs: { title: 'Apenas Título' },
      });
      expect(screen.queryByTestId('icon-info')).not.toBeInTheDocument();
    });
  });
});
