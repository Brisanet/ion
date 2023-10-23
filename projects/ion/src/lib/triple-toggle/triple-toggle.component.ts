import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Size, TripleToggleSetting } from '../core/types';
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
  @Input() configuration: TripleToggleSetting[];

  @Output() ionClick = new EventEmitter();

  private defaultConfiguration: TripleToggleSetting[] = [
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

  handleClick(item: TripleToggleSetting): void {
    this.selectItem(item);
    this.ionClick.emit(item.value);
  }

  ngOnInit(): void {
    this.checkConfiguration();
    if (this.value !== undefined) {
      this.changeItemByValue();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.value) {
      this.changeItemByValue();
    }
  }

  private selectItem(item: TripleToggleSetting): void {
    this.value = item;
    this.configuration.forEach((item) => {
      item.selected = false;
    });
    item.selected = true;
  }

  private changeItemByValue(): void {
    if (!this.disabled && this.configuration) {
      const item = this.configuration.find((item) => item.value === this.value);
      if (item) {
        this.selectItem(item);
        this.checkHasSomeItemSelected();
      }
    }
  }

  private checkHasSomeItemSelected(): void {
    const hasSomeSelected = this.configuration.some((item) => item.selected);
    if (!hasSomeSelected) {
      this.configuration[1].selected = true;
    }
  }

  private checkConfiguration(): void {
    if (!this.configuration || this.configuration.length !== 3) {
      this.configuration = this.defaultConfiguration;
      return;
    }
    this.checkHasSomeItemSelected();
  }
}
