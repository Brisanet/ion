import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  signal,
  viewChild,
} from '@angular/core';
import {
  ChipInGroup,
  IconSize,
  IconSizeMap,
  IconType,
  IonButtonProps,
  IonChipGroupComponent,
  IonIconComponent,
  IonInputComponent,
} from 'ion';
import { iconsPaths } from '../../../ion/src/lib/icon/svgs/icons';

type SizeMode = 'px' | 'preset';

interface AlphaGroups {
  label: string;
  range?: [string, string];
}

const PRESETS: { key: IconSize; label: string }[] = (
  Object.entries(IconSizeMap) as [IconSize, number][]
).map(([key, px]) => ({
  key,
  label: `${key} (${px}px)`,
}));

const ALPHA_GROUPS: AlphaGroups[] = [
  { label: 'Todos' },
  { label: 'A-D', range: ['a', 'd'] },
  { label: 'E-H', range: ['e', 'h'] },
  { label: 'I-L', range: ['i', 'l'] },
  { label: 'K-O', range: ['k', 'o'] },
  { label: 'P-S', range: ['p', 's'] },
  { label: 'T-Z', range: ['t', 'z'] },
]

@Component({
  selector: 'app-icon-gallery',
  imports: [IonIconComponent, IonInputComponent, IonChipGroupComponent],
  templateUrl: './icon-gallery.component.html',
  styleUrl: './icon-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconGalleryComponent {
  private readonly allIcons: IconType[] = Object.keys(iconsPaths).sort((a, b) =>
    a.localeCompare(b),
  );

  readonly applyButton: IonButtonProps = { label: 'Aplicar' };
  readonly presets = PRESETS;
  readonly alphaGroups = ALPHA_GROUPS;
  readonly itemsPerRow = 5;
  readonly itemHeight = 135;
  private readonly viewport = viewChild<ElementRef<HTMLDivElement>>('viewport');

  sizeMode = signal<SizeMode>('px');
  sizeModeChips = signal<ChipInGroup[]>([
    { label: 'Pixels', selected: true },
    { label: 'Predefinido', selected: false },
  ]);
  presetChips = signal<ChipInGroup[]>(
    PRESETS.map((preset) => ({
      label: preset.label,
      selected: preset.key === 'large',
    })),
  );

  sizeDraft = signal('24');
  iconSizePx = signal(24);
  preset = signal<IconSize>('large');
  sizeError = signal('');
  search = signal('');

  bgColor = signal('#ffffff');
  copiedIcon = signal<string | null>(null);
  selectedGroup = signal<string>('Todos');
  startIndex = signal(0);
  endIndex = signal(30);

  iconContrastColor = computed(() => this.calculateContrast(this.bgColor()));
  iconSize = computed(() =>
    this.sizeMode() === 'px' ? this.iconSizePx() : this.preset(),
  );

  sizeSummary = computed(() => {
    const size = this.iconSize();
    if (typeof size === 'number') {
      return `${size}px`;
    }
    return `${size} (${IconSizeMap[size]}px)`;
  });

  filteredIcons = computed(() => {
    const term = this.search().trim().toLowerCase();
    const groupName = this.selectedGroup();
    const group = this.alphaGroups.find((g) => g.label === groupName);

    return this.allIcons.filter((name) => {
      const matchesSearch = !term || name.toLocaleLowerCase().includes(term);
      const firstChar = name.trim().charAt(0).toLowerCase();

      if (!matchesSearch) {
        return false
      }
      if (!group?.range){
        return true
      }

      return firstChar >= group.range[0] && firstChar <= group.range[1];
    })
  });

  visibleIcons = computed(() => {
    return this.filteredIcons().slice(this.startIndex(), this.endIndex());
  });

  virtualHeight = computed(
    () =>
      Math.ceil(this.filteredIcons().length / this.itemsPerRow) *
      this.itemHeight,
  );

  offsetY = computed(
    () => Math.floor(this.startIndex() / this.itemsPerRow) * this.itemHeight,
  );

  onSizeMode(chip: ChipInGroup): void {
    if (!chip.selected) {
      return;
    }
    this.sizeMode.set(chip.label === 'Pixels' ? 'px' : 'preset');
    if (this.sizeMode() === 'preset') {
      this.sizeError.set('');
    }
  }

  onPreset(chip: ChipInGroup): void {
    if (!chip.selected) {
      return;
    }
    const match = PRESETS.find((preset) => preset.label === chip.label);
    if (match) {
      this.preset.set(match.key);
    }
  }

  onSizeDraft(value: string): void {
    this.sizeDraft.set(String(value ?? ''));
  }

  onSearch(value: string): void {
    this.search.set(value ?? '');
    this.resetVirtualScroll();
  }

  onGridScroll(event: Event): void {
    const target = event.target as HTMLElement;
    const currentRow = Math.floor(target.scrollTop / this.itemHeight);
    const firstVisibleRow = Math.max(0, currentRow - 1);
    const visibleRows = Math.ceil(target.clientHeight / this.itemHeight) + 2;

    this.startIndex.set(firstVisibleRow * this.itemsPerRow);
    this.endIndex.set((firstVisibleRow + visibleRows) * this.itemsPerRow);
  }

  onBgColor(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.bgColor.set(input.value);
  }

  async copyCode(iconName: string): Promise<void> {
    const code = `<ion-icon type="${iconName}"></ion-icon>`;

    try {
      await navigator.clipboard.writeText(code);
      this.copiedIcon.set(iconName);

      setTimeout(() => {
        if (this.copiedIcon() === iconName) {
          this.copiedIcon.set(null);
        }
      }, 2000);
    } catch (err) {
      console.error('Falha ao copiar o código', err);
    }
  }

  applySize(): void {
    const parsed = Number(this.sizeDraft());
    if (!Number.isFinite(parsed) || parsed <= 0) {
      this.sizeError.set('Informe um número maior que zero.');
      return;
    }
    this.sizeError.set('');
    this.iconSizePx.set(parsed);
  }

  selectGroup(label: string): void {
    this.selectedGroup.set(label);
    this.resetVirtualScroll();
  }

  private resetVirtualScroll(): void {
    this.startIndex.set(0);
    this.endIndex.set(30);
    const viewport = this.viewport();
    if (viewport) {
      viewport.nativeElement.scrollTop = 0;
    }
  }

  private calculateContrast(hexColor: string): string {
    const cleanHex = hexColor.replace('#', '');
    const red = parseInt(cleanHex.substring(0, 2), 16) || 0;
    const green = parseInt(cleanHex.substring(2, 4), 16) || 0;
    const blue = parseInt(cleanHex.substring(4, 6), 16) || 0;
    const yiq = (red * 299 + green * 587 + blue * 114) / 1000;

    return yiq >= 128 ? '#1f2937' : '#ffffff';
  }
}
