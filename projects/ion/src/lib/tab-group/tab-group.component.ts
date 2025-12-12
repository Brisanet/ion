import { CommonModule } from '@angular/common';
import { Component, Input, input, output, signal } from '@angular/core';
import { BorderDirectionType, DirectionType } from '../core/types/direction';
import { TabInGroup } from '../core/types/tab-group';
import { TabSize } from '../core/types/tab';
import { IonTabComponent } from '../tab/tab.component';

@Component({
  selector: 'ion-tab-group',
  standalone: true,
  imports: [CommonModule, IonTabComponent],
  templateUrl: './tab-group.component.html',
  styleUrls: ['./tab-group.component.scss'],
})
export class IonTabGroupComponent {
  tabs = input.required<TabInGroup[]>();
  size = input<TabSize>('sm');

  selected = output<TabInGroup>();

  _direction = signal<DirectionType>('horizontal');
  _border = signal<BorderDirectionType>('bottom');

  @Input() set direction(value: DirectionType) {
    this._direction.set(value);
    this.updateBorder();
  }

  @Input() set border(value: BorderDirectionType) {
    this._border.set(value);
    this.updateDirection();
  }

  selectTab(tabSelected: TabInGroup): void {
    this.clearTabs();
    tabSelected.selected = true;
    this.selected.emit(tabSelected);
  }

  private clearTabs(): void {
    this.tabs().forEach((tab) => {
      tab.selected = false;
    });
  }

  private updateBorder(): void {
    const direction = this._direction();
    const border = this._border();

    if (this.isBorderDirectionCorrect(direction, border)) {
      return;
    }

    const directions: { [key in DirectionType]: BorderDirectionType } = {
      horizontal: 'bottom',
      vertical: 'right',
    };

    this._border.set(directions[direction]);
  }

  private updateDirection(): void {
    const border = this._border();
    const directions: { [key in BorderDirectionType]: DirectionType } = {
      left: 'vertical',
      right: 'vertical',
      top: 'horizontal',
      bottom: 'horizontal',
    };

    this._direction.set(directions[border]);
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
}
