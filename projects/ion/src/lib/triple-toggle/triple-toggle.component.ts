import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Size, TripleToggleOption } from '../core/types';
import { SafeAny } from '../utils/safe-any';

@Component({
  selector: 'ion-triple-toggle',
  templateUrl: './triple-toggle.component.html',
  styleUrls: ['./triple-toggle.component.scss'],
})
export class IonTripleToggleComponent implements OnInit, OnChanges {
  @Input() value: SafeAny;
  @Input() disabled = false;
  @Input() size: Size = 'md';
  @Input() options: [
    TripleToggleOption,
    TripleToggleOption,
    TripleToggleOption
  ];

  @Output() ionClick = new EventEmitter();

  private defaultConfiguration: [
    TripleToggleOption,
    TripleToggleOption,
    TripleToggleOption
  ] = [
    {
      value: true,
      label: 'Sim',
    },
    {
      value: undefined,
      label: '-',
      selected: true,
    },
    {
      value: false,
      label: 'Não',
    },
  ];

  handleClick(option: TripleToggleOption): void {
    this.selectOption(option);
  }

  ngOnInit(): void {
    this.checkConfiguration();
    if (this.value !== undefined) {
      this.changeOptionByValue();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.changeOptionByValue();
    }
  }

  private unselectAllOptions(): void {
    this.options.forEach((option) => {
      option.selected = false;
    });
  }

  private selectOption(option: TripleToggleOption): void {
    this.value = option.value;
    this.unselectAllOptions();
    option.selected = true;
    this.ionClick.emit(option.value);
  }

  private changeOptionByValue(): void {
    if (!this.disabled && this.options) {
      const option = this.options.find((option) => option.value === this.value);
      if (option) {
        this.selectOption(option);
      }
    }
  }

  private checkHasSomeItemSelected(): void {
    const hasSomeSelected = this.options.some((option) => option.selected);
    if (!hasSomeSelected) {
      this.options[1].selected = true;
    }
  }

  private checkConfiguration(): void {
    if (!this.options) {
      this.options = this.defaultConfiguration;
      return;
    }
    this.checkHasSomeItemSelected();
  }
}
