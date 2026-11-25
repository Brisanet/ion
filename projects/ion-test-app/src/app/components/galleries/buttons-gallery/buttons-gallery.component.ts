import {
  ChangeDetectionStrategy,
  Component,
  WritableSignal,
  computed,
  signal,
} from '@angular/core';
import {
  DropdownItem,
  IonButtonComponent,
  IonCardComponent,
  IonIconButtonComponent,
  IonChipGroupComponent,
  IonDividerComponent,
  IonHeadingComponent,
  IonInputComponent,
  IonSelectComponent,
  IonButtonProps,
  ChipInGroup,
  IconType,
  IconButtonType,
  IconButtonSize,
  IconButtonRounding,
} from 'ion';
import { iconsPaths } from '../../../../../../ion/src/lib/icon/svgs/icons';

type IconOption = DropdownItem & { key: IconType };

@Component({
  selector: 'app-buttons-gallery',
  imports: [
    IonButtonComponent,
    IonIconButtonComponent,
    IonCardComponent,
    IonChipGroupComponent,
    IonDividerComponent,
    IonHeadingComponent,
    IonInputComponent,
    IonSelectComponent,
  ],
  templateUrl: './buttons-gallery.component.html',
  styleUrl: './buttons-gallery.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonsGalleryComponent {
  readonly iconCount = Object.keys(iconsPaths).length;
  private readonly allIconOptions: IconOption[] = Object.keys(iconsPaths)
    .sort((a, b) => a.localeCompare(b))
    .map((icon) => ({ label: icon, key: icon, icon }));

  buttonIconSearch = signal('');
  iconButtonSearch = signal('');
  buttonIconOptions = computed(() =>
    this.filterIconOptions(this.buttonIconSearch()),
  );
  iconButtonOptions = computed(() =>
    this.filterIconOptions(this.iconButtonSearch()),
  );

  // ==== Shared Controls ====================================================
  // Button controls
  buttonLabel = signal('Button');
  buttonType = signal<NonNullable<IonButtonProps['type']>>('primary');
  buttonSize = signal<NonNullable<IonButtonProps['size']>>('md');
  buttonDanger = signal(false);
  buttonDisabled = signal(false);
  buttonLoading = signal(false);
  buttonExpand = signal(false);
  buttonCircular = signal(false);
  buttonRightIcon = signal(false);
  buttonIcon = signal('');

  // IconButton controls
  iconAriaLabel = signal('Icon button');
  iconType = signal<IconType>('pencil');
  iconButtonType = signal<IconButtonType>('primary');
  iconButtonSize = signal<IconButtonSize>('md');
  iconButtonRounding = signal<IconButtonRounding>('default');
  iconDanger = signal(false);
  iconDisabled = signal(false);
  iconLoading = signal(false);
  iconTooltip = signal('');

  // ==== Chip groups for selection ===========================================
  buttonTypeChips = signal([
    { label: 'Primary', selected: true },
    { label: 'Secondary', selected: false },
    { label: 'Ghost', selected: false },
    { label: 'Dashed', selected: false },
  ]);

  buttonSizeChips = signal([
    { label: 'SM', selected: false },
    { label: 'MD', selected: true },
    { label: 'LG', selected: false },
    { label: 'XL', selected: false },
  ]);

  buttonFlagChips = signal<ChipInGroup[]>([
    { label: 'Danger', selected: false },
    { label: 'Disabled', selected: false },
    { label: 'Loading', selected: false },
    { label: 'Expand', selected: false },
    { label: 'Circular', selected: false },
    { label: 'Right Icon', selected: false },
  ]);

  iconButtonTypeChips = signal([
    { label: 'Primary', selected: true },
    { label: 'Secondary', selected: false },
    { label: 'Ghost', selected: false },
    { label: 'Dashed', selected: false },
  ]);

  iconSizeChips = signal([
    { label: 'SM', selected: false },
    { label: 'MD', selected: true },
    { label: 'LG', selected: false },
  ]);

  iconRoundingChips = signal([
    { label: 'Default', selected: true },
    { label: 'Full', selected: false },
  ]);

  iconFlagChips = signal<ChipInGroup[]>([
    { label: 'Danger', selected: false },
    { label: 'Disabled', selected: false },
    { label: 'Loading', selected: false },
  ]);

  // ==== Handlers ===========================================================
  onButtonTypeSelect(chip: ChipInGroup): void {
    if (!chip.selected) return;
    const map: Record<string, IonButtonProps['type']> = {
      Primary: 'primary',
      Secondary: 'secondary',
      Ghost: 'ghost',
      Dashed: 'dashed',
    };
    this.buttonType.set(map[chip.label] ?? 'primary');
  }

  onButtonSizeSelect(chip: ChipInGroup): void {
    if (!chip.selected) return;
    const map: Record<string, IonButtonProps['size']> = {
      SM: 'sm',
      MD: 'md',
      LG: 'lg',
      XL: 'xl',
    };
    this.buttonSize.set(map[chip.label] ?? 'md');
  }

  onIconButtonTypeSelect(chip: ChipInGroup): void {
    if (!chip.selected) return;
    const map: Record<string, IconButtonType> = {
      Primary: 'primary',
      Secondary: 'secondary',
      Ghost: 'ghost',
      Dashed: 'dashed',
    };
    this.iconButtonType.set(map[chip.label] ?? 'primary');
  }

  onButtonIconSearch(value: string): void {
    this.buttonIconSearch.set(value);
  }

  onButtonIconChange(value: string): void {
    this.buttonIcon.set(value);
    this.buttonIconSearch.set('');
  }

  onIconButtonSearch(value: string): void {
    this.iconButtonSearch.set(value);
  }

  onIconButtonChange(value: string): void {
    this.iconType.set(value);
    this.iconButtonSearch.set('');
  }

  onIconSizeSelect(chip: ChipInGroup): void {
    if (!chip.selected) return;
    const map: Record<string, IconButtonSize> = {
      SM: 'sm',
      MD: 'md',
      LG: 'lg',
    };
    this.iconButtonSize.set(map[chip.label] ?? 'md');
  }

  onIconRoundingSelect(chip: ChipInGroup): void {
    if (!chip.selected) return;
    const map: Record<string, IconButtonRounding> = {
      Default: 'default',
      Full: 'full',
    };
    this.iconButtonRounding.set(map[chip.label] ?? 'default');
  }

  // Toggle boolean flags (used by a generic chip group in the template)
  onButtonFlagToggle(event: ChipInGroup): void {
    const { label, selected } = event;
    const active = !!selected;
    this.updateFlagIndicator(this.buttonFlagChips, label, active);

    switch (label) {
      case 'Danger':
        this.buttonDanger.set(active);
        break;
      case 'Disabled':
        this.buttonDisabled.set(active);
        break;
      case 'Loading':
        this.buttonLoading.set(active);
        break;
      case 'Expand':
        this.buttonExpand.set(active);
        break;
      case 'Circular':
        this.buttonCircular.set(active);
        break;
      case 'Right Icon':
        this.buttonRightIcon.set(active);
        break;
    }
  }

  onIconFlagToggle(event: ChipInGroup): void {
    const { label, selected } = event;
    const active = !!selected;
    this.updateFlagIndicator(this.iconFlagChips, label, active);

    switch (label) {
      case 'Danger':
        this.iconDanger.set(active);
        break;
      case 'Disabled':
        this.iconDisabled.set(active);
        break;
      case 'Loading':
        this.iconLoading.set(active);
        break;
    }
  }

  private updateFlagIndicator(
    flags: WritableSignal<ChipInGroup[]>,
    label: string,
    active: boolean,
  ): void {
    flags.update((chips) =>
      chips.map((chip) =>
        chip.label === label
          ? { ...chip, selected: active, icon: active ? 'check' : undefined }
          : chip,
      ),
    );
  }

  private filterIconOptions(search: string): IconOption[] {
    const query = search.trim().toLocaleLowerCase();
    const options = query
      ? this.allIconOptions.filter((option) =>
          option.label.toLocaleLowerCase().includes(query),
        )
      : this.allIconOptions;

    return options.map((option) => ({ ...option }));
  }
}
