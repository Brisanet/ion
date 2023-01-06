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
  SimpleChanges,
  ViewChild,
} from '@angular/core';
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

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private appRef: ApplicationRef,
    private injector: Injector,
    private renderer: Renderer2
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

  ngOnChanges(change: SimpleChanges): void {
    if (!change.firstChange) {
      const { config } = change;
      config.currentValue.forEach((currentField) => {
        if (!Object.keys(this.model).includes(currentField.key)) {
          this.renderer.appendChild(
            this.container.nativeElement,
            this.config
              .find((field) => field.key === currentField.key)
              .generateComponent(
                this.componentFactoryResolver,
                this.injector,
                this.appRef
              )
          );
        }
      });
    }
  }

  ngAfterViewInit(): void {
    this.renderFields();
  }
}
