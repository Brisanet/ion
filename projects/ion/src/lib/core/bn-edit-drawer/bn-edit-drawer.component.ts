import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
  effect,
  inject,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { IonDrawerComponent, IonDrawerDirection } from '../../drawer/drawer.component';
import { BnFormComponent } from '../bn-form/bn-form.component';
import { BnFormService } from '../bn-form/bn-form.service';
import { BnFormField } from '../bn-form/bn-form.types';
import { IonButtonProps } from '../../core/types/button';
import { IconType } from '../types/icon';

@Component({
  selector: 'bn-edit-drawer',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonDrawerComponent,
    BnFormComponent,
  ],
  templateUrl: './bn-edit-drawer.component.html',
  styleUrl: './bn-edit-drawer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BnEditDrawerComponent {
  private bnFormService = inject(BnFormService);

  isOpen = input<boolean>(false);
  title = input<string>('');
  iconTitle = input<IconType>();
  size = input<number>(30);
  direction = input<IonDrawerDirection>('right');
  
  fields = input.required<BnFormField[]>();
  data = input<any>();
  loading = input<boolean>(false);

  submitButton = input<IonButtonProps>({ label: 'Salvar', loading: false });
  cancelButton = input<IonButtonProps>({ label: 'Cancelar' });

  finalSubmitButton = computed(() => {
    return {
      ...this.submitButton(),
      loading: this.loading(),
    };
  });

  ionOnSave = output<any>();
  ionOnClose = output<void>();

  formGroup!: FormGroup;

  constructor() {
    effect(() => {
      const fields = this.fields();
      if (fields) {
        this.formGroup = this.bnFormService.createFormGroup(fields);
        this.patchFormData();
      }
    });

    effect(() => {
      this.patchFormData();
    });
  }

  private patchFormData(): void {
    const data = this.data();
    if (data && this.formGroup) {
      this.formGroup.patchValue(data, { emitEvent: false });
    }
  }

  close(): void {
    this.ionOnClose.emit();
  }

  submit(): void {
    if (this.formGroup.valid) {
      this.ionOnSave.emit(this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }
}
