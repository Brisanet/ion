import { Component, computed, inject, input, output, signal } from '@angular/core';
import { IonButtonComponent } from 'ion';
import { BnFormField } from '../bn-form/bn-form.types';
import { BnFormService } from '../bn-form/bn-form.service';
import { BnFormComponent } from '../bn-form/bn-form.component';

@Component({
  standalone: true,
  selector: 'bn-filter',
  imports: [IonButtonComponent, BnFormComponent],
  templateUrl: './bn-filter.component.html',
  styleUrl: './bn-filter.component.scss'
})
export class BnFilterComponent {
  private formService = inject(BnFormService);

  pageTitle = input<string>('Filtro');
  fields = input<BnFormField[]>([]);

  applied = output<any>();
  cleared = output<void>();

  open = signal(false);

  formGroup = computed(() => this.formService.createFormGroup(this.fields()));

  hasRequiredFields = computed(() => this.fields().some(field => field.required));

  apply(): void {
    this.applied.emit(this.formGroup().value);
  }

  clear(): void {
    this.formGroup().reset();
    this.cleared.emit();
    this.apply();
  }
}
