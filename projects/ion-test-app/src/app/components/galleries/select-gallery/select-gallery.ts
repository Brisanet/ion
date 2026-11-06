import { DOCUMENT, NgStyle } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import {
  DropdownItem,
  ION_SELECT_THEME_VARIABLES,
  IonIconComponent,
  IonSelectComponent,
  IonSelectFieldComponent,
  IonSelectTheme,
} from 'ion';

type ThemePreview = Extract<IonSelectTheme, 'light' | 'orange-light'>;

@Component({
  selector: 'app-select-gallery',
  imports: [
    NgStyle,
    IonSelectComponent,
    IonSelectFieldComponent,
    IonIconComponent,
  ],
  templateUrl: './select-gallery.html',
  styleUrl: './select-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGalleryComponent {
  private readonly document = inject(DOCUMENT);
  private readonly initialTheme = this.document.body.getAttribute('ion-theme');

  readonly options: DropdownItem[] = [
    { label: 'Maçã', key: 'apple'},
    { label: 'Banana', key: 'banana'},
    { label: 'Laranja', key: 'orange'},
    { label: 'Uva', key: 'grape'},
    { label: 'Morango', key: 'strawberry'},
    { label: 'Manga', key: 'mango' },
    { label: 'Abacaxi', key: 'pineapple' },
    { label: 'Melancia', key: 'watermelon'},
  ];

  readonly optionsWithDisabledItem: DropdownItem[] = this.options.map(
    (option) => ({
      ...option,
      disabled: option.key === 'mango',
    })
  );

  readonly emptyOptions: DropdownItem[] = [];
  readonly legacySingleValue = 'banana';
  readonly legacyMultiValue = ['apple', 'orange'];
  readonly singleValue = signal<string | null>('banana');
  readonly multiValue = signal<string[]>([
    'apple',
    'banana',
    'orange',
    'grape',
    'strawberry',
    'mango',
  ]);
  readonly requiredMultiValue = ['apple', 'banana'];
  readonly searchQuery = signal('');
  readonly themePreview = signal<ThemePreview>('light');
  readonly themeStyles = computed(
    () => ION_SELECT_THEME_VARIABLES[this.themePreview()]
  );
  readonly themes: { key: ThemePreview; label: string }[] = [
    { key: 'light', label: 'Azul · claro' },
    { key: 'orange-light', label: 'Laranja · claro' },
  ];
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

  constructor() {
    if (this.isThemePreview(this.initialTheme)) {
      this.themePreview.set(this.initialTheme);
    }
  }

  readonly searchableOptions = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase();
    if (!query) {
      return this.options;
    }

    return this.options.filter((option) =>
      option.label.toLocaleLowerCase().includes(query)
    );
  });

  onSingleValueChange(value: unknown): void {
    this.singleValue.set(typeof value === 'string' ? value : null);
  }

  onMultiValueChange(value: unknown): void {
    this.multiValue.set(Array.isArray(value) ? value : []);
  }

  onSearch(value: string): void {
    this.searchQuery.set(value);
  }

  setThemePreview(theme: ThemePreview): void {
    this.themePreview.set(theme);
  }

  private isThemePreview(value: string | null): value is ThemePreview {
    return this.themes.some((theme) => theme.key === value);
  }
}
