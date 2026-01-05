import { Component, computed, inject, input, OnInit } from '@angular/core';
import { IonButtonComponent } from '../../button/button.component';
import { IonIconComponent } from '../../icon/icon.component';
import { BnFormField } from '../bn-form/bn-form.types';
import { BnFormService } from '../bn-form/bn-form.service';
import { BnFormComponent } from '../bn-form/bn-form.component';
import { IonDividerComponent } from "../../divider/divider.component";

@Component({
  standalone: true,
  selector: 'bn-about',
  imports: [IonButtonComponent, BnFormComponent, IonIconComponent, IonDividerComponent],
  templateUrl: './bn-about.component.html',
  styleUrl: './bn-about.component.scss'
})
export class BnAboutComponent implements OnInit {
  private formService = inject(BnFormService);

  pageTitle = input.required<{ title: string; icon?: string }>();
  headerButton = input<{ action: () => void; label: string}>();
  fields = input<BnFormField[]>([]);

  formGroup = computed(() => this.formService.createFormGroup(this.fields()));

  disableAllFields = () => {
    this.fields().forEach((field) => {
      field.disabled = true;
    })
  }
  
  ngOnInit() {
    this.disableAllFields();
    console.log(this.pageTitle());
  }
}
