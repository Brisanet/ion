import { Component, OnInit, Input } from '@angular/core';
import { IonModalService } from '../modal/modal.service';
import { WizardBodyComponent } from './body/wizard-body.component';

export interface WizardConfig {
  title: string;
  open: boolean;
}

@Component({
  selector: 'ion-wizard',
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
})
export class IonWizardComponent implements OnInit {
  @Input() config: WizardConfig;

  constructor(private modalService: IonModalService) {}

  public open(): void {
    this.modalService.open(WizardBodyComponent);
  }

  ngOnInit(): void {
    if (this.config.open) {
      this.open();
    }
    console.log('ngOnInit -> ', this.config);
  }
}
