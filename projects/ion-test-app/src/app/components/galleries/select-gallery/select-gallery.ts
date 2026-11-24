import { DOCUMENT } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  effect,
  inject,
  signal,
} from '@angular/core';
import {
  DropdownItem,
  IonSelectComponent,
  IonSelectFieldComponent,
} from 'ion';

const GALLERY_THEMES = [
  { key: 'light', label: 'Azul · claro' },
  { key: 'orange-light', label: 'Laranja · claro' },
  { key: 'light-v2', label: 'Azul · claro v2' },
  { key: 'orange-light-v2', label: 'Laranja · claro v2' },
] as const;

type ThemePreview = (typeof GALLERY_THEMES)[number]['key'];

@Component({
  selector: 'app-select-gallery',
  imports: [IonSelectComponent, IonSelectFieldComponent],
  templateUrl: './select-gallery.html',
  styleUrl: './select-gallery.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectGalleryComponent {
  private readonly document = inject(DOCUMENT);
  private readonly destroyRef = inject(DestroyRef);
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
  readonly themePreview = signal<ThemePreview>('light');
  readonly themes = GALLERY_THEMES;
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

  onSingleValueChange(value: unknown): void {
    this.singleValue.set(typeof value === 'string' ? value : null);
  }

  onMultiValueChange(value: unknown): void {
    this.multiValue.set(Array.isArray(value) ? value : []);
  }

  setThemePreview(theme: ThemePreview): void {
    this.themePreview.set(theme);
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