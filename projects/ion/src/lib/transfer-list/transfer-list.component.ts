import {
  Component,
  input,
  output,
  signal,
  computed,
  OnInit,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonIconComponent } from '../icon/icon.component';
import { IonButtonComponent } from '../button/button.component';
import { IonInputComponent } from '../input/input.component';
import { IonCheckboxComponent } from '../checkbox/checkbox.component';
import { DropdownItem } from '../core/types/dropdown';

@Component({
  selector: 'ion-transfer-list',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    IonIconComponent,
    IonButtonComponent,
    IonInputComponent,
    IonCheckboxComponent,
  ],
  templateUrl: './transfer-list.component.html',
  styleUrls: ['./transfer-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonTransferListComponent implements OnInit {
  leftOptions = input<DropdownItem[]>([]);
  rightOptions = input<DropdownItem[]>([]);
  leftTitle = input<string>('Disponível');
  rightTitle = input<string>('Selecionado');
  disabled = input<boolean>(false);
  searchable = input<boolean>(false);

  transfer = output<{ left: DropdownItem[]; right: DropdownItem[] }>();

  leftList = signal<DropdownItem[]>([]);
  rightList = signal<DropdownItem[]>([]);

  leftSelected = signal<DropdownItem[]>([]);
  rightSelected = signal<DropdownItem[]>([]);

  leftSearch = signal<string>('');
  rightSearch = signal<string>('');

  filteredLeftList = computed(() => {
    const search = this.leftSearch().toLowerCase();
    return this.leftList().filter((item) =>
      item.label.toLowerCase().includes(search)
    );
  });

  filteredRightList = computed(() => {
    const search = this.rightSearch().toLowerCase();
    return this.rightList().filter((item) =>
      item.label.toLowerCase().includes(search)
    );
  });

  ngOnInit(): void {
    this.leftList.set([...this.leftOptions()]);
    this.rightList.set([...this.rightOptions()]);
  }

  toggleLeftItem(item: DropdownItem): void {
    if (this.disabled()) return;
    this.leftSelected.update((selected) => {
      if (selected.includes(item)) {
        return selected.filter((i) => i !== item);
      }
      return [...selected, item];
    });
  }

  toggleRightItem(item: DropdownItem): void {
    if (this.disabled()) return;
    this.rightSelected.update((selected) => {
      if (selected.includes(item)) {
        return selected.filter((i) => i !== item);
      }
      return [...selected, item];
    });
  }

  moveToRight(): void {
    const selected = this.leftSelected();
    if (selected.length === 0) return;

    this.leftList.update((list) => list.filter((i) => !selected.includes(i)));
    this.rightList.update((list) => [...list, ...selected]);
    this.leftSelected.set([]);
    this.emitTransfer();
  }

  moveToLeft(): void {
    const selected = this.rightSelected();
    if (selected.length === 0) return;

    this.rightList.update((list) => list.filter((i) => !selected.includes(i)));
    this.leftList.update((list) => [...list, ...selected]);
    this.rightSelected.set([]);
    this.emitTransfer();
  }

  moveAllToRight(): void {
    const currentLeft = this.leftList();
    if (currentLeft.length === 0) return;

    this.rightList.update((list) => [...list, ...currentLeft]);
    this.leftList.set([]);
    this.leftSelected.set([]);
    this.emitTransfer();
  }

  moveAllToLeft(): void {
    const currentRight = this.rightList();
    if (currentRight.length === 0) return;

    this.leftList.update((list) => [...list, ...currentRight]);
    this.rightList.set([]);
    this.rightSelected.set([]);
    this.emitTransfer();
  }

  private emitTransfer(): void {
    this.transfer.emit({
      left: this.leftList(),
      right: this.rightList(),
    });
  }
}
