import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  inject,
  signal,
} from '@angular/core';
import {
  IonButtonComponent,
  IonInputComponent,
  IonNotificationService,
} from 'ion';

export interface ColorItem {
  name: string;
  hex: string;
}

export interface ColorGroup {
  name: string;
  colors: ColorItem[];
}

@Component({
  selector: 'app-color-gallery',
  imports: [IonButtonComponent, IonInputComponent],
  templateUrl: './color-gallery-component.html',
  styleUrl: './color-gallery-component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ColorGalleryComponent implements AfterViewInit {
  private readonly host = inject(ElementRef<HTMLElement>);
  private readonly notificationService = inject(IonNotificationService);
  private readonly allColors = signal<ColorItem[]>([]);
  readonly hiddenCopyButtonFor = signal<string | null>(null);

  get total(): number {
    return this.allColors().length;
  }

  search = signal('');

  filteredGroups = computed(() => {
    const term = this.search().trim().toLowerCase();
    const groups = new Map<string, ColorItem[]>();

    for (const color of this.allColors()) {
      if (
        term &&
        !color.name.toLowerCase().includes(term) &&
        !color.hex.toLowerCase().includes(term)
      ) {
        continue;
      }

      const groupName = color.name.replace(/-\d+$/, '');
      const groupColors = groups.get(groupName) ?? [];
      groupColors.push(color);
      groups.set(groupName, groupColors);
    }

    return [...groups.entries()]
      .map(([name, colors]) => ({ name, colors }))
      .sort((a, b) => {
        if (a.name === 'info') return -1;
        if (b.name === 'info') return 1;
        return a.name.localeCompare(b.name);
      });
  });

  filteredColorCount = computed(() =>
    this.filteredGroups().reduce((count, group) => count + group.colors.length, 0),
  );

  ngAfterViewInit(): void {
    const styles = getComputedStyle(this.host.nativeElement);
    const rawNames = styles
      .getPropertyValue('--ion-gallery-token-names')
      .trim()
      .replace(/^\(|\)$/g, '');
    const names = rawNames
      .split(',')
      .map((name) => name.trim().replace(/^['"]|['"]$/g, ''));

    if (!rawNames || names.some((name) => !name)) {
      throw new Error('Color gallery token names are missing from its styles.');
    }

    this.allColors.set(
      names
        .map((name) => {
          const hex = styles
            .getPropertyValue(`--ion-gallery-token-${name}`)
            .trim();
          if (!hex) {
            throw new Error(`Color gallery token "${name}" has no value.`);
          }
          return { name, hex };
        })
        .sort((a, b) => a.name.localeCompare(b.name)),
    );
  }

  onSearch(value: string): void {
    this.search.set(value ?? '');
  }

  onColorPointerLeave(color: ColorItem): void {
    if (this.hiddenCopyButtonFor() === color.name) {
      this.hiddenCopyButtonFor.set(null);
    }
  }

  async copyScss(color: ColorItem): Promise<void> {
    this.hiddenCopyButtonFor.set(color.name);
    const declaration = `$${color.name}: ${color.hex};`;

    try {
      if (!navigator.clipboard) {
        throw new Error('A área de transferência não está disponível.');
      }

      await navigator.clipboard.writeText(declaration);
      this.notificationService.success('Copiado', declaration);
    } catch (error) {
      console.error('Não foi possível copiar a declaração SCSS.', error);
      this.notificationService.error(
        'Falha ao copiar',
        'Não foi possível copiar a declaração SCSS.',
      );
    }
  }
}