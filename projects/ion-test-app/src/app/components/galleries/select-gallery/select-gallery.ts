import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  DropdownItem,
  IonButtonComponent,
  IonSelectComponent,
  IonInputComponent,
  IonSelectSize,
  IonSelectStatus,
  IonSelectType,
} from 'ion';

const GALLERY_THEMES = [
  { key: 'light', label: 'Azul · claro' },
  { key: 'orange-light', label: 'Laranja · claro' },
  { key: 'light-v2', label: 'Azul · claro v2' },
  { key: 'orange-light-v2', label: 'Laranja · claro v2' },
] as const;

type ThemePreview = (typeof GALLERY_THEMES)[number]['key'];
type OptionsScenario = 'default' | 'with-disabled' | 'with-icons' | 'empty';

@Component({
  selector: 'app-select-gallery',
  imports: [IonSelectComponent, IonButtonComponent, IonInputComponent],
  templateUrl: './select-gallery.html',
  styleUrl: './select-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGalleryComponent {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
  private readonly initialTheme = this.document.body.getAttribute('ion-theme');
  readonly themes = GALLERY_THEMES;
  readonly themePreview = signal<ThemePreview>('light');
  readonly colorTokens = [
    'primary-1',
    'primary-2',
    'primary-3',
    'primary-4',
    'primary-5',
    'primary-6',
    'primary-7',
    'primary-8',
    'negative-5',
    'negative-6',
    'positive-5',
    'positive-6',
  ];
  readonly typeOptions: DropdownItem[] = [
    { label: 'Single', key: 'single' },
    { label: 'Multi', key: 'multi' },
  ];
  readonly sizeOptions: DropdownItem[] = [
    { label: 'Base', key: 'base' },
    { label: 'Large', key: 'large' },
  ];
  readonly statusOptions: DropdownItem[] = [
    { label: 'Default', key: 'default' },
    { label: 'Error', key: 'error' },
    { label: 'Success', key: 'success' },
  ];
  readonly scenarioOptions: DropdownItem[] = [
    { label: 'Padrão (8 frutas)', key: 'default' },
    { label: 'Com item desabilitado', key: 'with-disabled' },
    { label: 'Com ícones', key: 'with-icons' },
    { label: 'Lista vazia (no-data)', key: 'empty' },
  ];
  readonly baseOptions: DropdownItem[] = [
    { label: 'Maçã', key: 'apple' },
    { label: 'Banana', key: 'banana' },
    { label: 'Laranja', key: 'orange' },
    { label: 'Uva', key: 'grape' },
    { label: 'Morango', key: 'strawberry' },
    { label: 'Manga', key: 'mango' },
    { label: 'Abacaxi', key: 'pineapple' },
    { label: 'Melancia', key: 'watermelon' },
  ];
  readonly optionsWithDisabledItem: DropdownItem[] = this.baseOptions.map(
    (option) => ({
      ...option,
      disabled: option.key === 'mango',
    })
  );
  readonly optionsWithIcons: DropdownItem[] = [
    { label: 'Relatório Geral', key: 'report', icon: 'file' },
    { label: 'Configurações', key: 'settings', icon: 'config' },
    { label: 'Usuários Ativos', key: 'users', icon: 'user' },
    { label: 'Alertas Críticos', key: 'alerts', icon: 'exclamation-rounded' },
    {
      label: 'Arquivados (indisponível)',
      key: 'archived',
      icon: 'trash',
      disabled: true,
    },
  ];
  readonly supportingTextOptions: DropdownItem[] = [
    { label: 'Automático (por status)', key: 'auto' },
    { label: 'Texto personalizado', key: 'custom' },
    { label: 'Sem texto de apoio', key: 'none' },
  ];
  readonly enableSearchOptions: DropdownItem[] = [
    { label: 'Habilitado', key: 'true' },
    { label: 'Desabilitado', key: 'false' },
  ];
  
  readonly emptyOptions: DropdownItem[] = [];

  // Estado do Sandbox Interativo
  readonly sandboxType = signal<IonSelectType>('single');
  readonly sandboxSize = signal<IonSelectSize>('base');
  readonly sandboxStatus = signal<IonSelectStatus>('default');
  readonly sandboxScenario = signal<OptionsScenario>('default');
  readonly sandboxLabel = signal('Frutas selecionadas');
  readonly sandboxPlaceholder = signal('Selecione uma opção');
  readonly sandboxSupportingText = signal<string>('Texto de apoio');
  readonly sandboxEnableSearch = signal<boolean>(true);
  
  readonly sandboxSearchTerm = signal('');
  readonly sandboxValue = signal<unknown>(null);
  readonly sandboxSelectedItems = signal<DropdownItem[]>([]);
  readonly sandboxEventLog = signal<string>('Aguardando interação...');

  readonly sandboxSourceOptions = computed<DropdownItem[]>(() => {
    switch (this.sandboxScenario()) {
      case 'with-disabled':
        return this.optionsWithDisabledItem;
      case 'with-icons':
        return this.optionsWithIcons;
      case 'empty':
        return this.emptyOptions;
      default:
        return this.baseOptions;
    }
  });

  readonly sandboxFilteredOptions = computed<DropdownItem[]>(() => {
    const source = this.sandboxSourceOptions();
    const term = this.sandboxSearchTerm().trim().toLowerCase();
    if (!this.sandboxEnableSearch() || !term) {
      return source;
    }
    return source.filter((item) => item.label.toLowerCase().includes(term));
  });

  onSandboxSupportingTextChange(value: string): void {
    this.sandboxSupportingText.set(value);
    this.sandboxEventLog.set(`supportingText -> "${value}"`);
  }

  toggleSandboxEnableSearch(): void {
    const next = !this.sandboxEnableSearch();
    this.sandboxEnableSearch.set(next);
    if (!next) {
      this.sandboxSearchTerm.set('');
    }
    this.sandboxEventLog.set(`enableSearch -> ${next}`);
  }

  readonly sandboxFormattedValue = computed(() => {
    const val = this.sandboxValue();
    return val === undefined ? 'undefined' : JSON.stringify(val);
  });

  constructor() {
    if (this.isThemePreview(this.initialTheme)) {
      this.themePreview.set(this.initialTheme);
    }

    effect(() => {
      this.syncOverlayTheme(this.themePreview());
    });

    const overlayObserver = new MutationObserver(() => {
      this.syncOverlayTheme(this.themePreview());
    });
    overlayObserver.observe(this.document.body, { childList: true });

    this.destroyRef.onDestroy(() => {
      overlayObserver.disconnect();
      this.document
        .querySelector('.cdk-overlay-container')
        ?.removeAttribute('data-theme-preview');
    });
  }

  setThemePreview(theme: ThemePreview): void {
    this.themePreview.set(theme);
  }

  onSandboxTypeChange(value: unknown): void {
    if (value !== 'single' && value !== 'multi') return;
    this.sandboxType.set(value);
    this.sandboxValue.set(value === 'multi' ? [] : null);
    this.sandboxSelectedItems.set([]);
    this.sandboxEventLog.set(`Modo alterado para "${value}"`);
  }

  onSandboxSizeChange(value: unknown): void {
    if (value === 'base' || value === 'large') {
      this.sandboxSize.set(value);
      this.sandboxEventLog.set(`Tamanho alterado para "${value}"`);
    }
  }

  onSandboxStatusChange(value: unknown): void {
    if (value === 'default' || value === 'error' || value === 'success') {
      this.sandboxStatus.set(value);
      this.sandboxSupportingText.set(this.getDefaultSupportingText(value));
      this.sandboxEventLog.set(`Status alterado para "${value}"`);
    }
  }

  private getDefaultSupportingText(status: IonSelectStatus): string {
    switch (status) {
      case 'error':
        return 'Selecione uma opção válida para continuar.';
      case 'success':
        return 'Seleção validada com sucesso.';
      default:
        return 'Texto de apoio configurado no sandbox.';
    }
  }

  onSandboxScenarioChange(value: unknown): void {
    if (
      value === 'default' ||
      value === 'with-disabled' ||
      value === 'with-icons' ||
      value === 'empty'
    ) {
      this.sandboxScenario.set(value);
      this.sandboxSearchTerm.set('');
      this.sandboxValue.set(this.sandboxType() === 'multi' ? [] : null);
      this.sandboxSelectedItems.set([]);
      this.sandboxEventLog.set(`Cenário alterado para "${value}"`);
    }
  }

  onSandboxValueChange(value: unknown): void {
    this.sandboxValue.set(value);
    this.sandboxEventLog.set(`(valueChange) -> ${JSON.stringify(value)}`);
  }

  onSandboxSelected(items: DropdownItem[]): void {
    this.sandboxSelectedItems.set(items);
  }

  onSandboxSearch(term: string): void {
    this.sandboxSearchTerm.set(term);
    this.sandboxEventLog.set(`(search) -> "${term}"`);
  }

  clearSandboxSelection(): void {
    this.sandboxValue.set(this.sandboxType() === 'multi' ? [] : null);
    this.sandboxSelectedItems.set([]);
    this.sandboxEventLog.set('Seleção limpa');
  }

  resetSandbox(): void {
    this.sandboxType.set('single');
    this.sandboxSize.set('base');
    this.sandboxStatus.set('default');
    this.sandboxScenario.set('default');
    this.sandboxLabel.set('Frutas selecionadas');
    this.sandboxPlaceholder.set('Selecione uma opção');
    this.sandboxSupportingText.set('auto');
    this.sandboxSearchTerm.set('');
    this.sandboxValue.set(null);
    this.sandboxSelectedItems.set([]);
    this.sandboxEventLog.set('Sandbox resetado');
    this.sandboxSupportingText.set(this.getDefaultSupportingText('default'));
  }

  private syncOverlayTheme(theme: ThemePreview): void {
    this.document
      .querySelector('.cdk-overlay-container')
      ?.setAttribute('data-theme-preview', theme);
  }

  private isThemePreview(value: unknown): value is ThemePreview {
    return (
      typeof value === 'string' &&
      this.themes.some((theme) => theme.key === value)
    );
  }
}