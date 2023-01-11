import {
  AfterViewInit,
  ApplicationRef,
  Component,
  ComponentFactoryResolver,
  ElementRef,
  Injector,
  Input,
  OnChanges,
  Renderer2,
  SimpleChange,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { SafeAny } from '../utils/safe-any';
import { FormField } from './core/baseField';

@Component({
  selector: 'ion-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements AfterViewInit, OnChanges {
  @Input() config: FormField<Component>[];
  @Input() model: SafeAny;
  @ViewChild('formContainer', { static: false }) container: ElementRef;

  formulary = new FormGroup({
    name: new FormControl('aaaaaa'),
    email: new FormControl(null),
  });

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private renderer: Renderer2,
    private formBuilder: FormBuilder
  ) {}

  renderField(field: FormField<SafeAny>): void {
    this.renderer.appendChild(
      this.container.nativeElement,
      field.generateComponent(
        this.componentFactoryResolver,
        this.injector,
        this.appRef
      )
    );
    field.onValueChange().subscribe((value) => {
      this.model = {
        ...this.model,
        [field.key]: value,
      };
    });
  }

  renderFields(): void {
    this.config.forEach((field) => {
      this.model = {
        ...this.model,
        [field.key]: null,
      };
      this.renderField(field);
    });
  }

  checkAndRenderNewFields(config: SimpleChange): void {
    config.currentValue.forEach((currentField) => {
      if (!Object.keys(this.model).includes(currentField.key)) {
        this.renderField(
          this.config.find((field) => field.key === currentField.key)
        );
      }
    });
  }

  ngOnChanges(change: SimpleChanges): void {
    // const { config, model } = change;
    // if (!config.firstChange) {
    //   this.checkAndRenderNewFields(config);
    // }
    // if (model && model.currentValue) {
    //   console.log(model.currentValue);
    // }
  }

  ngAfterViewInit(): void {
    // setTimeout(() => {
    //   this.renderFields();
    // }, 5000);
  }
}
