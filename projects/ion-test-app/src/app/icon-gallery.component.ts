import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
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

const PRESETS: { key: IconSize; label: string }[] = (
  Object.entries(IconSizeMap) as [IconSize, number][]
).map(([key, px]) => ({
  key,
  label: `${key} (${px}px)`,
}));

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

  readonly total = this.allIcons.length;
  readonly applyButton: IonButtonProps = { label: 'Aplicar' };
  readonly presets = PRESETS;

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
    if (!term) {
      return this.allIcons;
    }
    return this.allIcons.filter((name) => name.toLowerCase().includes(term));
  });

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
}
