import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { StatusType } from '../core/types';
import { IconType } from '../core/types/icon';

const iconTypes = {
  success: 'check-solid',
  warning: 'exclamation-solid',
  info: 'info-solid',
  negative: 'close-solid',
};

@Component({
  selector: 'ion-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class IonAlertComponent implements OnInit, OnChanges {
  @Input() message!: string;
  @Input() type?: StatusType = 'success';
  @Input() closable? = false;
  @Input() hideBackground? = false;

  @ViewChild('ionAlert', { static: false }) private ionAlert: ElementRef;

  iconType: IconType;

  closeEvent(): void {
    this.ionAlert.nativeElement.remove();
  }

  setIcon(): void {
    this.iconType = iconTypes[this.type];
  }

  ngOnInit(): void {
    if (this.hideBackground) {
      this.closable = false;
    }
  }
  
  ngOnChanges(): void {
    this.setIcon();
  }
}
