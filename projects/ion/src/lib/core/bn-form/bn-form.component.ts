import {
  ChangeDetectionStrategy,
  Component,
  input,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { debounce, finalize, Subject, timer } from 'rxjs';
import {
  IonInputComponent,
} from '../../input/input.component';
import {
  IonTripleToggleComponent,
} from '../../triple-toggle/triple-toggle.component';
import {
  IonSwitchComponent,
} from '../../switch/switch.component';
import {
  IonDatepickerComponent,
} from '../../picker/date-picker/date-picker.component';
import {
  IonSelectComponent,
} from '../../select/select.component';
import {
  IonInputAreaComponent,
} from '../../input-area/input-area.component';
import {
  BnFormField,
  BnInputFormField,
  BnTripleToggleFormField,
  BnSwitchFormField,
  BnDatePickerFormField,
  BnSelectFormField,
  BnInputAreaFormField,
} from './bn-form.types';
import { IonIconComponent } from "../../icon/icon.component";
import { IonTooltipDirective } from "../../tooltip/tooltip.directive";

@Component({
  selector: 'bn-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    IonInputComponent,
    IonTripleToggleComponent,
    IonSwitchComponent,
    IonDatepickerComponent,
    IonSelectComponent,
    IonInputAreaComponent,
    IonIconComponent,
    IonTooltipDirective
],
  template: `
    <form [formGroup]="formGroup()" class="bn-form-container bn-row">
      @for (field of fields(); track field.key) {
        @if (showField(field)) {
          <div [class]="field.className || 'col-12'" class="bn-form-field">
            <h3>
              {{ field.label }}
              @if (field.required) {
                <span class="required-asterisk">*</span>
              }
              @if (field.description) {
                <ion-icon
                  type="information"
                  [size]="16"
                  ionTooltip
                  [ionTooltipTitle]="field.description"
                  ></ion-icon>
              }
            </h3>
  
            @if (isTripleToggle(field)) {
              <ion-triple-toggle
                [value]="formGroup().get(field.key)?.value"
                [disabled]="isDisabled(field)"
                [size]="field.size ?? 'md'"
                [options]="field.options"
                [onlyShowIcon]="field.onlyShowIcon ?? false"
                (ionClick)="onValueChange(field.key, $event)"
              ></ion-triple-toggle>
            } @else if (isSwitch(field)) {
              <ion-switch
                [value]="formGroup().get(field.key)?.value"
                [disabled]="isDisabled(field)"
                [size]="field.size ?? 'md'"
                (atValueChange)="onValueChange(field.key, $event)"
              ></ion-switch>
            } @else if (isDatePicker(field)) {
              <ion-date-picker
                [format]="field.format ?? 'YYYY-MM-DD'"
                [formatInDateInput]="field.formatInDateInput ?? 'YYYY-MM-DD'"
                [rangePicker]="field.rangePicker ?? false"
                [direction]="field.direction"
                [disabledDate]="field.disabledDate"
                [predefinedRanges]="field.predefinedRanges ?? []"
                [value]="formGroup().get(field.key)?.value"
                (event)="onValueChange(field.key, $event)"
              ></ion-date-picker>
            } @else if (isSelect(field)) {
              <ion-select
                [placeholder]="field.placeholder ?? ''"
                [options]="field.options"
                [multiple]="field.multiple ?? false"
                [enableSearch]="field.enableSearch ?? false"
                [disabled]="isDisabled(field)"
                [propValue]="field.propValue ?? 'value'"
                [propLabel]="field.propLabel ?? 'label'"
                [loading]="field.loading || false"
                [value]="formGroup().get(field.key)?.value"
                [invalid]="
                  !!(
                    formGroup().get(field.key)?.invalid &&
                    formGroup().get(field.key)?.touched
                  )
                "
                (valueChange)="onValueChange(field.key, $event)"
                (search)="onSearch(field, $event)"
              ></ion-select>
            } @else if (isInput(field)) {
              <ion-input
                [placeholder]="field.placeholder ?? ''"
                [inputType]="field.type ?? 'text'"
                [disabled]="isDisabled(field)"
                [readonly]="field.readonly ?? false"
                [maxLength]="field.maxLength ?? null"
                [clearButton]="field.clearButton ?? false"
                [iconInput]="field.iconInput ?? ''"
                [iconDirection]="field.iconDirection"
                [inputButton]="field.inputButton ?? false"
                [inputButtonConfig]="field.inputButtonConfig"
                [invalid]="
                  !!(
                    formGroup().get(field.key)?.invalid &&
                    formGroup().get(field.key)?.touched
                  )
                "
                [errorMsg]="field.errorMsg ?? ''"
                [value]="formGroup().get(field.key)?.value"
                (valueChange)="onValueChange(field.key, $event)"
                (clickButton)="
                  field.onClickButton
                    ? field.onClickButton(formGroup().get(field.key)?.value)
                    : null
                "
              ></ion-input>
            } @else if (isInputArea(field)) {
              <ion-input-area
                [placeholder]="field.placeholder ?? ''"
                [cols]="field.cols ?? '30'"
                [rows]="field.rows ?? '5'"
                [disabled]="isDisabled(field)"
                [value]="formGroup().get(field.key)?.value"
                (valueChange)="onValueChange(field.key, $event)"
              ></ion-input-area>
            }
          </div>
        }
      }
    </form>
  `,
  styles: [
    `
      .bn-form-container {
        width: 100%;
      }
      .bn-row {
        display: flex;
        flex-wrap: wrap;
        margin-right: -10px;
        margin-left: -10px;
      }
      .bn-form-field {
        padding-right: 10px;
        padding-left: 10px;
        margin-bottom: 20px;
        box-sizing: border-box;
      }
      .bn-form-field h3 {
        margin-bottom: 8px;
        font-size: 1rem;
        font-weight: 600;
      }
      .error-text {
        color: var(--ion-color-danger, #eb445a);
        font-size: 0.8rem;
        margin-top: 4px;
      }
      .required-asterisk {
        color: var(--ion-color-danger, #eb445a);
        margin-left: 4px;
      }

      /* 12-column grid system */
      .col-1 {
        flex: 0 0 8.333333%;
        max-width: 8.333333%;
      }
      .col-2 {
        flex: 0 0 16.666667%;
        max-width: 16.666667%;
      }
      .col-3 {
        flex: 0 0 25%;
        max-width: 25%;
      }
      .col-4 {
        flex: 0 0 33.333333%;
        max-width: 33.333333%;
      }
      .col-5 {
        flex: 0 0 41.666667%;
        max-width: 41.666667%;
      }
      .col-6 {
        flex: 0 0 50%;
        max-width: 50%;
      }
      .col-7 {
        flex: 0 0 58.333333%;
        max-width: 58.333333%;
      }
      .col-8 {
        flex: 0 0 66.666667%;
        max-width: 66.666667%;
      }
      .col-9 {
        flex: 0 0 75%;
        max-width: 75%;
      }
      .col-10 {
        flex: 0 0 83.333333%;
        max-width: 83.333333%;
      }
      .col-11 {
        flex: 0 0 91.666667%;
        max-width: 91.666667%;
      }
      .col-12 {
        flex: 0 0 100%;
        max-width: 100%;
      }

      /* Responsive variants (simplified) */
      @media (min-width: 768px) {
        .col-md-1 {
          flex: 0 0 8.333333%;
          max-width: 8.333333%;
        }
        .col-md-2 {
          flex: 0 0 16.666667%;
          max-width: 16.666667%;
        }
        .col-md-3 {
          flex: 0 0 25%;
          max-width: 25%;
        }
        .col-md-4 {
          flex: 0 0 33.333333%;
          max-width: 33.333333%;
        }
        .col-md-5 {
          flex: 0 0 41.666667%;
          max-width: 41.666667%;
        }
        .col-md-6 {
          flex: 0 0 50%;
          max-width: 50%;
        }
        .col-md-7 {
          flex: 0 0 58.333333%;
          max-width: 58.333333%;
        }
        .col-md-8 {
          flex: 0 0 66.666667%;
          max-width: 66.666667%;
        }
        .col-md-9 {
          flex: 0 0 75%;
          max-width: 75%;
        }
        .col-md-10 {
          flex: 0 0 83.333333%;
          max-width: 83.333333%;
        }
        .col-md-11 {
          flex: 0 0 91.666667%;
          max-width: 91.666667%;
        }
        .col-md-12 {
          flex: 0 0 100%;
          max-width: 100%;
        }
      }
    `,
  ],
})
export class BnFormComponent implements OnInit {
  formGroup = input.required<FormGroup>();
  fields = input.required<BnFormField[]>();
  defaultDebounceTime = 600;

  private searchSubject = new Subject<{
    field: BnSelectFormField;
    search: string;
  }>();

  ngOnInit(): void {
    this.searchSubject
      .pipe(
        debounce((data) =>
          timer(data.field.refresh?.debounceTime ?? this.defaultDebounceTime),
        ),
      )
      .subscribe(({ field, search }) => {
        console.log(
          `[BnForm] Executing debounced refresh for ${field.key}:`,
          search,
        );
        if (field.refresh?.use) {
          field.loading = true;
          field.refresh
            .use(field, search)
            .pipe(finalize(() => (field.loading = false)))
            .subscribe((res) => (field.options = res));
        }
      });

    this.fields().forEach((field) => {
      if (this.isSelect(field) && field.refresh?.use) {
        field.loading = true;
        field.refresh
          .use(field)
          .pipe(finalize(() => (field.loading = false)))
          .subscribe((res) => (field.options = res));
      }
    });
  }

  onSearch(field: BnSelectFormField, search: string): void {
    console.log(`[BnForm] Search event for ${field.key}:`, search);
    this.searchSubject.next({ field, search: search ?? '' });
  }

  onValueChange(key: string, value: any): void {
    const control = this.formGroup().get(key);
    if (control && control.value !== value) {
      control.setValue(value);
      control.markAsDirty();
      control.markAsTouched();
    }

    this.fields().forEach((field) => {
      if (field.onChange && field.key === key) {
        field.onChange(this.formGroup());
      }
    });
  }

  showField(field: BnFormField): boolean {
    if (field.onlyShowWhen) {
      return field.onlyShowWhen(this.formGroup());
    }
    return true;
  }

  isDisabled(field: BnFormField): boolean {
    return this.formGroup().get(field.key)?.disabled ?? false;
  }

  isInput(field: BnFormField): field is BnInputFormField {
    return (
      !field.type ||
      ['text', 'password', 'number', 'email'].includes(field.type)
    );
  }

  isTripleToggle(field: BnFormField): field is BnTripleToggleFormField {
    return field.type === 'triple-toggle';
  }

  isSwitch(field: BnFormField): field is BnSwitchFormField {
    return field.type === 'switch';
  }

  isDatePicker(field: BnFormField): field is BnDatePickerFormField {
    return field.type === 'datepicker';
  }

  isSelect(field: BnFormField): field is BnSelectFormField {
    return field.type === 'select';
  }

  isInputArea(field: BnFormField): field is BnInputAreaFormField {
    return field.type === 'input-area';
  }
}
