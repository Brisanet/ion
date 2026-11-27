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
  IonIconComponent,
  IonInputComponent,
  IonSelectComponent,
  IonSelectSize,
} from 'ion';

const GALLERY_THEMES = [
  { key: 'light', label: 'Azul · claro' },
  { key: 'dark', label: 'Azul · escuro' },
  { key: 'orange-light', label: 'Laranja · claro' },
  { key: 'orange-dark', label: 'Laranja · escuro' },
  { key: 'light-v2', label: 'Azul · claro v2' },
  { key: 'orange-light-v2', label: 'Laranja · claro v2' },
] as const;

type ThemePreview = (typeof GALLERY_THEMES)[number]['key'];
type ValidationMode = 'default' | 'invalid' | 'valid' | 'both';
type OptionsScenario =
  | 'default'
  | 'with-disabled'
  | 'with-icons'
  | 'custom-props'
  | 'empty';
type ToggleKey =
  | 'enableSearch'
  | 'required'
  | 'disabled'
  | 'loading'
  | 'returnFullObject'
  | 'leadingSlot'
  | 'actionSlot';

const DEFAULT_FLAGS: Record<ToggleKey, boolean> = {
  enableSearch: true,
  required: false,
  disabled: false,
  loading: false,
  returnFullObject: false,
  leadingSlot: false,
  actionSlot: false,
};

const SUPPORTING_MESSAGES: Record<ValidationMode, string> = {
  default: 'Texto de apoio configurado no sandbox.',
  invalid: 'Selecione uma opção válida para continuar.',
  valid: 'Seleção validada com sucesso.',
  both: 'Invalid sobrepõe valid quando ambos estão ativos.',
};

@Component({
  selector: 'app-select-gallery',
  imports: [
    IonSelectComponent,
    IonButtonComponent,
    IonInputComponent,
    IonIconComponent,
  ],
  templateUrl: './select-gallery.html',
  styleUrl: './select-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGalleryComponent {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);

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

  readonly modeOptions: DropdownItem[] = [
    { label: 'Single', key: 'single' },
    { label: 'Multiple (chips)', key: 'multi' },
  ];
  readonly sizeOptions: DropdownItem[] = [
    { label: 'Base (48px)', key: 'base' },
    { label: 'Large (56px)', key: 'large' },
  ];
  readonly validationOptions: DropdownItem[] = [
    { label: 'Default', key: 'default' },
    { label: 'Inválido (invalid)', key: 'invalid' },
    { label: 'Válido (valid)', key: 'valid' },
    { label: 'Ambos (precedência invalid)', key: 'both' },
  ];
  readonly scenarioOptions: DropdownItem[] = [
    { label: 'Padrão (8 frutas)', key: 'default' },
    { label: 'Com item desabilitado', key: 'with-disabled' },
    { label: 'Com ícones', key: 'with-icons' },
    { label: 'Props customizadas (nome/codigo)', key: 'custom-props' },
    { label: 'Lista vazia (no-data)', key: 'empty' },
  ];

  readonly toggleControls: ReadonlyArray<{
    key: ToggleKey;
    fieldLabel: string;
    activeLabel: string;
    inactiveLabel: string;
  }> = [
    {
      key: 'enableSearch',
      fieldLabel: 'Busca (enableSearch)',
      activeLabel: 'Search: Ativo',
      inactiveLabel: 'Search: Inativo',
    },
    {
      key: 'required',
      fieldLabel: 'Obrigatório (required)',
      activeLabel: 'Required: Sim',
      inactiveLabel: 'Required: Não',
    },
    {
      key: 'disabled',
      fieldLabel: 'Desabilitado (disabled)',
      activeLabel: 'Disabled: Sim',
      inactiveLabel: 'Disabled: Não',
    },
    {
      key: 'loading',
      fieldLabel: 'Carregando (loading)',
      activeLabel: 'Loading: Sim',
      inactiveLabel: 'Loading: Não',
    },
    {
      key: 'returnFullObject',
      fieldLabel: 'Retorno (returnFullObject)',
      activeLabel: 'Objeto completo',
      inactiveLabel: 'Apenas chave',
    },
    {
      key: 'leadingSlot',
      fieldLabel: 'Slot inicial (ionSelectLeading)',
      activeLabel: 'Leading: Visível',
      inactiveLabel: 'Leading: Oculto',
    },
    {
      key: 'actionSlot',
      fieldLabel: 'Slot de ação (ionSelectAction)',
      activeLabel: 'Action: Visível',
      inactiveLabel: 'Action: Oculto',
    },
  ];

  private readonly baseOptions: DropdownItem[] = [
    { label: 'Maçã', key: 'apple' },
    { label: 'Banana', key: 'banana' },
    { label: 'Laranja', key: 'orange' },
    { label: 'Uva', key: 'grape' },
    { label: 'Morango', key: 'strawberry' },
    { label: 'Manga', key: 'mango' },
    { label: 'Abacaxi', key: 'pineapple' },
    { label: 'Melancia', key: 'watermelon' },
  ];
  private readonly scenarioMap: Record<OptionsScenario, DropdownItem[]> = {
    default: this.baseOptions,
    'with-disabled': this.baseOptions.map((opt) => ({
      ...opt,
      disabled: opt.key === 'mango',
    })),
    'with-icons': [
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
    ],
    'custom-props': [
      { label: '', nome: 'Fibra 500 Mega', codigo: 101 } as DropdownItem,
      { label: '', nome: 'Fibra 1 Giga', codigo: 102 } as DropdownItem,
      { label: '', nome: 'Link Dedicado Pro', codigo: 103 } as DropdownItem,
    ],
    empty: [],
  };

  // Estado do Sandbox
  readonly sandboxMultiple = signal(false);
  readonly sandboxSize = signal<IonSelectSize>('base');
  readonly sandboxValidation = signal<ValidationMode>('default');
  readonly sandboxScenario = signal<OptionsScenario>('default');
  readonly sandboxLabel = signal('Frutas selecionadas');
  readonly sandboxPlaceholder = signal('Selecione uma opção');
  readonly sandboxSupportingText = signal(SUPPORTING_MESSAGES.default);
  readonly flags = signal<Record<ToggleKey, boolean>>({ ...DEFAULT_FLAGS });

  readonly sandboxSearchTerm = signal('');
  readonly sandboxValue = signal<unknown>(null);
  readonly sandboxSelectedItems = signal<DropdownItem[]>([]);
  readonly sandboxEventLog = signal('Aguardando interação...');

  readonly sandboxInvalid = computed(
    () =>
      this.sandboxValidation() === 'invalid' ||
      this.sandboxValidation() === 'both'
  );
  readonly sandboxValid = computed(
    () =>
      this.sandboxValidation() === 'valid' ||
      this.sandboxValidation() === 'both'
  );
  readonly activePropLabel = computed(() =>
    this.sandboxScenario() === 'custom-props' ? 'nome' : 'label'
  );
  readonly activePropValue = computed(() =>
    this.sandboxScenario() === 'custom-props' ? 'codigo' : 'key'
  );
  readonly sandboxSourceOptions = computed(
    () => this.scenarioMap[this.sandboxScenario()]
  );
  readonly sandboxFormattedValue = computed(() => {
    const val = this.sandboxValue();
    return val === undefined ? 'undefined' : JSON.stringify(val);
  });

  constructor() {
    const initialTheme = this.document.body.getAttribute('ion-theme');
    if (this.themes.some((t) => t.key === initialTheme)) {
      this.themePreview.set(initialTheme as ThemePreview);
    }

    effect(() => this.syncOverlayTheme(this.themePreview()));

    const overlayObserver = new MutationObserver(() =>
      this.syncOverlayTheme(this.themePreview())
    );
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

  toggleFlag(key: ToggleKey): void {
    const next = !this.flags()[key];
    this.flags.update((curr) => ({ ...curr, [key]: next }));
    if (key === 'enableSearch' && !next) {
      this.sandboxSearchTerm.set('');
    }
    this.sandboxEventLog.set(`${key} -> ${next}`);
  }

  onSandboxModeChange(value: unknown): void {
    if (value !== 'single' && value !== 'multi') return;
    this.sandboxMultiple.set(value === 'multi');
    this.clearSelectionState(`multiple -> ${value === 'multi'}`);
  }

  onSandboxSizeChange(value: unknown): void {
    if (value === 'base' || value === 'large') {
      this.sandboxSize.set(value);
      this.sandboxEventLog.set(`size -> "${value}"`);
    }
  }

  onSandboxValidationChange(value: unknown): void {
    if (
      value === 'default' ||
      value === 'invalid' ||
      value === 'valid' ||
      value === 'both'
    ) {
      this.sandboxValidation.set(value);
      this.sandboxSupportingText.set(SUPPORTING_MESSAGES[value]);
      this.sandboxEventLog.set(`validação -> "${value}"`);
    }
  }

  onSandboxScenarioChange(value: unknown): void {
    if (typeof value === 'string' && value in this.scenarioMap) {
      this.sandboxScenario.set(value as OptionsScenario);
      this.sandboxSearchTerm.set('');
      this.clearSelectionState(`cenário -> "${value}"`);
    }
  }

  onSandboxLabelChange(value: string): void {
    this.sandboxLabel.set(value);
    this.sandboxEventLog.set(`label -> "${value}"`);
  }

  onSandboxSupportingTextChange(value: string): void {
    this.sandboxSupportingText.set(value);
    this.sandboxEventLog.set(`supportingText -> "${value}"`);
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

  onSandboxActionClick(): void {
    this.sandboxEventLog.set('(ionSelectAction) clique isolado sem abrir menu');
  }

  applyOverflowPreset(): void {
    this.sandboxScenario.set('default');
    this.sandboxMultiple.set(true);
    const preset = this.baseOptions.slice(0, 6);
    this.sandboxSelectedItems.set(preset);
    this.sandboxValue.set(
      this.flags().returnFullObject ? preset : preset.map((o) => o.key)
    );
    this.sandboxEventLog.set('Preset de overflow aplicado (6 itens)');
  }

  clearSandboxSelection(): void {
    this.clearSelectionState('Seleção limpa');
  }

  resetSandbox(): void {
    this.sandboxMultiple.set(false);
    this.sandboxSize.set('base');
    this.sandboxValidation.set('default');
    this.sandboxScenario.set('default');
    this.sandboxLabel.set('Frutas selecionadas');
    this.sandboxPlaceholder.set('Selecione uma opção');
    this.sandboxSupportingText.set(SUPPORTING_MESSAGES.default);
    this.flags.set({ ...DEFAULT_FLAGS });
    this.sandboxSearchTerm.set('');
    this.clearSelectionState('Sandbox resetado');
  }

  private clearSelectionState(logMessage: string): void {
    this.sandboxValue.set(this.sandboxMultiple() ? [] : null);
    this.sandboxSelectedItems.set([]);
    this.sandboxEventLog.set(logMessage);
  }

  private syncOverlayTheme(theme: ThemePreview): void {
    this.document
      .querySelector('.cdk-overlay-container')
      ?.setAttribute('data-theme-preview', theme);
  }
}