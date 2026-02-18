
import { Component, computed, input } from '@angular/core';
import { IonIconComponent } from '../icon/icon.component';
import { TagStatus } from '../core/types';
import { IconType } from '../core/types/icon';
import { validateHexColor } from '../utils';

const defaultColor = '#505566';

@Component({
  selector: 'ion-tag',
  standalone: true,
  imports: [IonIconComponent],
  templateUrl: './ion-tag.component.html',
  styleUrls: ['./ion-tag.component.scss'],
})
export class IonTagComponent {
  outline = input<boolean>(true);
  label = input.required<string>();
  status = input<TagStatus>();
  color = input<string>(defaultColor);
  backgroundColor = input<string>();
  icon = input<IconType>();

  tagType = computed(() => {
    return `ion-tag ${this.outline() ? 'outline' : ''} ${
      this.status() ? this.status() : ''
    }`;
  });

  tagStyle = computed(() => {
    return !this.status() && this.getTagColor();
  });

  tagBackgroundColor = computed(() => {
    if (this.status()) {
      return '';
    }

    const bgColor = this.backgroundColor();
    if (bgColor && validateHexColor(bgColor)) {
      return bgColor;
    }

    const styleColor = this.tagStyle();
    return styleColor ? styleColor + '1A' : '';
  });

  private getTagColor(): string {
    const color = this.color();
    return validateHexColor(color) ? color : defaultColor;
  }
}
