import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { BnFormField, BnFormFieldType } from '../bn-form/bn-form.types';
import { BnFormService } from '../bn-form/bn-form.service';
import { BnFormComponent } from '../bn-form/bn-form.component';
import { IonButtonComponent } from '../../button/button.component';
import { IonDividerComponent } from '../../divider/divider.component';
import { CommonModule } from '@angular/common';
import { IonChipComponent } from '../../chip/chip.component';
import { IonTooltipDirective } from '../../tooltip/tooltip.directive';
import { TooltipPosition } from '../types/tooltip';

@Component({
  standalone: true,
  selector: 'bn-filter',
  imports: [
    CommonModule,
    IonButtonComponent,
    BnFormComponent,
    IonDividerComponent,
    IonChipComponent,
    IonTooltipDirective,
  ],
  templateUrl: './bn-filter.component.html',
  styleUrl: './bn-filter.component.scss',
})
export class BnFilterComponent implements OnInit {
  private formService = inject(BnFormService);

  pageTitle = input<string>('Filtro');
  fields = input<BnFormField[]>([]);

  applied = output<any>();
  cleared = output<void>();

  open = signal(false);

  selectedChips = signal<
    {
      field: BnFormField;
      badge: {
        show: boolean;
        value: number;
      };
      tooltipContext: {
        values: string[];
        show?: boolean;
        type: BnFormFieldType;
      };
    }[]
  >([]);

  readonly TooltipPosition = TooltipPosition;

  formGroup = computed(() => this.formService.createFormGroup(this.fields()));

  ngOnInit(): void {
    this.setSelectedLabels();
    this.formGroup().valueChanges.subscribe(() => {
      this.updateChipBadges();
    });
  }

  apply(closeFilters = false): void {
    const values = this.formGroup().value;
    this.applied.emit(values);

    this.setSelectedLabels();

    closeFilters && this.open.set(false);
  }

  clear(): void {
    this.formGroup().reset();
    this.cleared.emit();
    this.apply();
  }

  private isFieldFilled(
    field: BnFormField,
    values: Record<string, any>,
  ): boolean {
    const value = values[field.key];

    if (value == null) return false;

    if (typeof value === 'string') return value.trim() !== '';

    if (Array.isArray(value)) return value.length > 0;

    if (typeof value === 'boolean') return value === true;

    if (typeof value === 'object') return Object.keys(value).length > 0;

    return true;
  }

  setSelectedLabels(): void {
    const values = this.formGroup().value;
    this.selectedChips.set(
      this.fields()
        .filter((field) => this.isFieldFilled(field, values))
        .map((f) => {
          let labels = Array.isArray(values[f.key])
            ? values[f.key]
            : [values[f.key]];

          if (f.type === 'triple-toggle') {
            const option = f.options.find((o) => o.value === values[f.key]);
            if (option) {
              labels = [option.label];
            }
          }

          return {
            field: f,
            badge: this.makeChipBadge(f, values),
            tooltipContext: {
              values: labels,
              type: f.type!,
            },
          };
        }),
    );
  }

  updateChipBadges(): void {
    const values = this.formGroup().value;
    this.selectedChips.update((chips) =>
      chips.map((chip) => {
        const badge = this.makeChipBadge(chip.field, values);
        return { ...chip, badge };
      }),
    );
  }

  showChipBadge(field: BnFormField, values: Record<string, any>): boolean {
    return !!(
      field.type === 'select' &&
      Array.isArray(values[field.key]) &&
      values[field.key].length > 1
    );
  }

  makeChipBadge(
    field: BnFormField,
    values: Record<string, any>,
  ): { show: boolean; value: number } {
    const showBadge = this.showChipBadge(field, values);
    const badge = { show: showBadge, value: 0 };
    if (showBadge) {
      badge.value = (values[field.key] as any[]).length;
    }
    return badge;
  }

  deselectFilter(field: BnFormField): void {
    this.formGroup().get(field.key)?.reset();
    this.apply();
  }
}
