import {
  Component,
  ChangeDetectionStrategy,
  input,
  output,
  effect,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonTabComponent } from '../tab/tab.component';
import {
  BorderDirectionType,
  DirectionType,
  TabInGroup,
  TabSize,
} from '../core/types';

@Component({
  selector: 'ion-tab-group',
  imports: [CommonModule, IonTabComponent],
  templateUrl: './tab-group.component.html',
  styleUrl: './tab-group.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonTabGroupComponent {
  tabs = input.required<TabInGroup[]>();
  direction = input<DirectionType>('horizontal');
  border = input<BorderDirectionType>('bottom');
  size = input<TabSize>('sm');

  selected = output<TabInGroup>();

  // Internal signal to track computed border
  private computedBorder = signal<BorderDirectionType>('bottom');

  constructor() {
    // Synchronize direction and border inputs
    effect(() => {
      const currentDirection = this.direction();
      const currentBorder = this.border();

      // Update computed border based on direction if border doesn't match
      if (!this.isBorderDirectionCorrect(currentDirection, currentBorder)) {
        this.computedBorder.set(this.getBorderByDirection(currentDirection));
      } else {
        this.computedBorder.set(currentBorder);
      }
    });
  }

  selectTab(tabSelected: TabInGroup): void {
    this.clearTabs();
    tabSelected.selected = true;
    this.selected.emit(tabSelected);
  }

  getEffectiveBorder(): BorderDirectionType {
    return this.computedBorder();
  }

  private getBorderByDirection(direction: DirectionType): BorderDirectionType {
    const directions: { [key in DirectionType]: BorderDirectionType } = {
      horizontal: 'bottom',
      vertical: 'right',
    };

    return directions[direction];
  }

  private isBorderDirectionCorrect(
    direction: DirectionType,
    border: BorderDirectionType
  ): boolean {
    const directions = {
      horizontal: border === 'top' || border === 'bottom',
      vertical: border === 'left' || border === 'right',
    };

    return directions[direction];
  }

  private clearTabs(): void {
    this.tabs().forEach((tab) => {
      tab.selected = false;
    });
  }
}
