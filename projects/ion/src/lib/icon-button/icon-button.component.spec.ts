import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IonIconButtonComponent } from './icon-button.component';

describe('IonIconButtonComponent', () => {
  let fixture: ComponentFixture<IonIconButtonComponent>;
  let component: IonIconButtonComponent;

  const getButton = (): HTMLButtonElement =>
    fixture.nativeElement.querySelector('button');

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IonIconButtonComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IonIconButtonComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('ariaLabel', 'Fechar');
    fixture.componentRef.setInput('icon', 'close');
    fixture.detectChanges();
  });

  describe('Renderização e valores padrão', () => {
    it('renderiza o botão com atributos e classes padrão', () => {
      const button = getButton();

      expect(button).toHaveAttribute('type', 'button');
      expect(button).toHaveAttribute('aria-label', 'Fechar');
      expect(button).toHaveAttribute('data-testid', 'icon-btn-Fechar');
      expect(button).not.toHaveAttribute('aria-busy');
      expect(button).not.toBeDisabled();

      expect(button).toHaveClass(
        'ion-icon-button',
        'ion-icon-button--primary',
        'ion-icon-button--medium',
        'ion-icon-button--default'
      );
      expect(button).not.toHaveClass('danger', 'loading');
    });

    it('renderiza o ícone decorativo corretamente', () => {
      const button = getButton();
      const icon = button.querySelector('ion-icon');

      expect(icon).toHaveAttribute('aria-hidden', 'true');
      expect(icon?.querySelector('svg')).toHaveAttribute(
        'id',
        'ion-icon-close'
      );
    });

    it('atualiza aria-label, data-testid e ícone dinamicamente', () => {
      fixture.componentRef.setInput('ariaLabel', 'Editar');
      fixture.componentRef.setInput('icon', 'edit');
      fixture.detectChanges();

      const button = getButton();

      expect(button).toHaveAttribute('aria-label', 'Editar');
      expect(button).toHaveAttribute('data-testid', 'icon-btn-Editar');
      expect(button.querySelector('ion-icon svg')).toHaveAttribute(
        'id',
        'ion-icon-edit'
      );
    });
  });

  describe('Variantes e estilos', () => {
    it.each(['primary', 'secondary', 'ghost', 'dashed'] as const)(
      'aplica a classe correspondente ao tipo %s',
      (type) => {
        fixture.componentRef.setInput('type', type);
        fixture.detectChanges();

        expect(getButton()).toHaveClass(`ion-icon-button--${type}`);
      }
    );

    it.each([
      ['small', 'ion-icon-button--small', 16],
      ['medium', 'ion-icon-button--medium', 16],
      ['large', 'ion-icon-button--large', 24],
    ] as const)(
      'suporta o tamanho %s e ajusta o ícone para %dpx',
      (size, cssClass, iconSize) => {
        fixture.componentRef.setInput('size', size);
        fixture.detectChanges();

        const svg = getButton().querySelector('ion-icon svg');

        expect(getButton()).toHaveClass(cssClass);
        expect(svg).toHaveAttribute('width', `${iconSize}px`);
        expect(svg).toHaveAttribute('height', `${iconSize}px`);
      }
    );

    it.each([
      ['default', 'ion-icon-button--default'],
      ['full', 'ion-icon-button--full'],
    ] as const)(
      'suporta o arredondamento %s',
      (rounding, cssClass) => {
        fixture.componentRef.setInput('rounding', rounding);
        fixture.detectChanges();

        expect(getButton()).toHaveClass(cssClass);
      }
    );

    it('alterna a classe danger conforme o input', () => {
      expect(getButton()).not.toHaveClass('danger');

      fixture.componentRef.setInput('danger', true);
      fixture.detectChanges();

      expect(getButton()).toHaveClass('danger');
    });
  });

  describe('Estado de carregamento (loading)', () => {
    it('exibe spinner, oculta ícone e desabilita o botão durante o loading', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      const button = getButton();
      const spinner = button.querySelector('ion-spinner');

      expect(button).toBeDisabled();
      expect(button).toHaveClass('loading');
      expect(button).toHaveAttribute('aria-busy', 'true');
      expect(spinner).toHaveAttribute('aria-hidden', 'true');
      expect(button.querySelector('ion-icon')).toBeNull();
    });

    it('restaura o ícone e reabilita o botão quando loading volta para false', () => {
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      fixture.componentRef.setInput('loading', false);
      fixture.detectChanges();

      const button = getButton();

      expect(button).not.toBeDisabled();
      expect(button).not.toHaveClass('loading');
      expect(button).not.toHaveAttribute('aria-busy');
      expect(button.querySelector('ion-spinner')).toBeNull();
      expect(button.querySelector('ion-icon')).not.toBeNull();
    });

    it.each([
      ['small', 16],
      ['medium', 16],
      ['large', 24],
    ] as const)(
      'mantém o spinner com %dpx no tamanho %s',
      (size, iconSize) => {
        fixture.componentRef.setInput('size', size);
        fixture.componentRef.setInput('loading', true);
        fixture.detectChanges();

        const spinner: HTMLElement | null = getButton().querySelector(
          'ion-spinner .ion-spinner'
        );

        expect(spinner).toHaveStyle({
          width: `${iconSize}px`,
          height: `${iconSize}px`,
        });
      }
    );
  });

  describe('Interações e eventos', () => {
    it('emite ionOnClick ao clicar quando habilitado', () => {
      const clickSpy = jest.fn();
      component.ionOnClick.subscribe(clickSpy);

      getButton().click();

      expect(clickSpy).toHaveBeenCalledTimes(1);
    });

    it('não emite ionOnClick quando disabled está ativo', () => {
      const clickSpy = jest.fn();
      component.ionOnClick.subscribe(clickSpy);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      getButton().click();
      component.handleClick();

      expect(clickSpy).not.toHaveBeenCalled();
    });

    it('não emite ionOnClick quando loading está ativo', () => {
      const clickSpy = jest.fn();
      component.ionOnClick.subscribe(clickSpy);
      fixture.componentRef.setInput('loading', true);
      fixture.detectChanges();

      getButton().click();
      component.handleClick();

      expect(clickSpy).not.toHaveBeenCalled();
    });
  });
});