import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { IonButtonComponent } from '../button/button.component';
import { IonTooltipDirective } from '../tooltip/tooltip.directive';
import {
  Size,
  TripleToggleOption,
  TripleToggleOptions,
  TripleToggleOptionsToRender,
} from '../core/types';
import { SafeAny } from '../utils/safe-any';

const FIRST_INDEX = 0;
const SECOND_INDEX = 1;

const DEFAULT_LEFT_OPTION: TripleToggleOption = {
  value: true,
  label: 'Sim',
};

const DEFAULT_MIDDLE_OPTION: TripleToggleOption = {
  value: undefined,
  label: '-',
  selected: true,
};

const DEFAULT_RIGHT_OPTION: TripleToggleOption = {
  value: false,
  label: 'Não',
};

@Component({
  selector: 'ion-triple-toggle',
  standalone: true,
  imports: [IonButtonComponent, IonTooltipDirective],
  templateUrl: './triple-toggle.component.html',
  styleUrls: ['./triple-toggle.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonTripleToggleComponent {
  value = input<SafeAny>();
  disabled = input<boolean>(false);
  size = input<Size>('md');
  options = input<TripleToggleOptions>();
  onlyShowIcon = input<boolean>(false);
  ionClick = output<SafeAny>();

  public middleOptionIndex = 1;

  private selectedIndexSignal = signal<number>(1);

  public optionsToRender = computed<TripleToggleOptionsToRender>(() => {
    const opts = this.options();
    const selectedIndex = this.selectedIndexSignal();

    const leftOption = opts?.[FIRST_INDEX] || DEFAULT_LEFT_OPTION;
    const rightOption = opts?.[SECOND_INDEX] || DEFAULT_RIGHT_OPTION;

    return [
      { ...leftOption, selected: selectedIndex === 0 },
      { ...DEFAULT_MIDDLE_OPTION, selected: selectedIndex === 1 },
      { ...rightOption, selected: selectedIndex === 2 },
    ];
  });

  constructor() {
    effect(() => {
      const currentValue = this.value();
      if (currentValue !== undefined && !this.disabled()) {
        this.changeOptionByValue(currentValue);
      }
    });
  }

  handleClick(option: TripleToggleOption, index: number): void {
    if (!this.disabled()) {
      this.selectOption(option, index);
    }
  }

  private selectOption(option: TripleToggleOption, index: number): void {
    this.selectedIndexSignal.set(index);
    this.ionClick.emit(option.value);
  }

  private changeOptionByValue(value: SafeAny): void {
    const opts = this.optionsToRender();
    const foundIndex = opts.findIndex((option) => option.value === value);
    if (foundIndex !== -1) {
      this.selectedIndexSignal.set(foundIndex);
    }
  }
}
