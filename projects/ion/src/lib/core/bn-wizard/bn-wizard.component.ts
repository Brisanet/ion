import {
  Component,
  inject,
  input,
  OnInit,
  signal,
  computed,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { IonStepsComponent } from '../../step/ion-step.component';
import { BnFormComponent } from '../bn-form/bn-form.component';
import { BnFormService } from '../bn-form/bn-form.service';
import { IonButtonComponent } from '../../button/button.component';
import { IonModalService } from '../../modal/modal.service';
import { BnWizardConfig } from './bn-wizard.types';
import { StepType } from '../../core/types';
import { IonAlertComponent } from "../../alert/alert.component";

@Component({
  selector: 'bn-wizard',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonStepsComponent,
    BnFormComponent,
    IonButtonComponent,
    IonAlertComponent
],
  templateUrl: './bn-wizard.component.html',
  styleUrls: ['./bn-wizard.component.scss'],
})
export class BnWizardComponent implements OnInit {
  private formService = inject(BnFormService);
  private modalService = inject(IonModalService);

  config = input.required<BnWizardConfig>();

  currentStepIndex = signal(0);
  formGroup!: FormGroup;

  stepsForIndicator = computed<StepType[]>(() => {
    return this.config().steps.map((step) => ({ label: step.title }));
  });

  ngOnInit() {
    const allFields = this.config().steps.flatMap((step) => step.fields);
    this.formGroup = this.formService.createFormGroup(allFields);
  }

  get currentStep() {
    return this.config().steps[this.currentStepIndex()];
  }

  isFirstStep() {
    return this.currentStepIndex() === 0;
  }

  isLastStep() {
    return this.currentStepIndex() === this.config().steps.length - 1;
  }

  next() {
    if (!this.isLastStep()) {
      if (!this.isStepInvalid()) {
        this.currentStepIndex.update((i) => i + 1);
      } else {
        this.markStepControlsAsTouched();
      }
    }
  }

  back() {
    if (!this.isFirstStep()) {
      this.currentStepIndex.update((i) => i - 1);
    }
  }

  cancel() {
    this.modalService.closeModal();
  }

  finish() {
    if (this.formGroup.valid) {
      this.modalService.emitValueAndCloseModal(this.formGroup.value);
    } else {
      this.formGroup.markAllAsTouched();
    }
  }

  isStepInvalid() {
    return this.currentStep.fields.some((field) => {
      const control = this.formGroup.get(field.key);
      return control ? control.invalid : false;
    });
  }

  private markStepControlsAsTouched() {
    this.currentStep.fields.forEach((field) => {
      const control = this.formGroup.get(field.key);
      if (control) {
        control.markAsTouched();
      }
    });
  }
}
