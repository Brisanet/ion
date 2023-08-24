import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultImageDirective } from '../defaultImage.directive';
import { IonIconModule } from '../icon/icon.module';
import { IonWizardComponent } from './wizard.component';
import { IonModalModule } from '../modal/modal.module';
import { WizardBodyComponent } from './body/wizard-body.component';

@NgModule({
  entryComponents: [WizardBodyComponent],
  declarations: [
    IonWizardComponent,
    DefaultImageDirective,
    WizardBodyComponent,
  ],
  imports: [CommonModule, IonIconModule, IonModalModule],
  exports: [IonWizardComponent, DefaultImageDirective],
})
export class IonWizardModule {}
