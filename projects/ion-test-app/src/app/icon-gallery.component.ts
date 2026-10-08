import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import {
  IconType,
  IonButtonProps,
  IonIconComponent,
  IonInputComponent,
} from 'ion';
import { iconsPaths } from '../../../ion/src/lib/icon/svgs/icons';

@Component({
  selector: 'app-icon-gallery',
  imports: [IonIconComponent, IonInputComponent],
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

  sizeDraft = signal('24');
  iconSize = signal(24);
  sizeError = signal('');
  search = signal('');

  filteredIcons = computed(() => {
    const term = this.search().trim().toLowerCase();
    if (!term) {
      return this.allIcons;
    }
    return this.allIcons.filter((name) => name.toLowerCase().includes(term));
  });

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
    this.iconSize.set(parsed);
  }
}
