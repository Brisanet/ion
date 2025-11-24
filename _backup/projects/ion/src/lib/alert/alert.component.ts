import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  TemplateRef,
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
  @Input() message!: string | TemplateRef<void>;
  @Input() type?: StatusType = 'success';
  @Input() closable? = false;
  @Input() hideBackground? = false;
  @Input() noRadius? = false;
  @Input() description?: string;

  @ViewChild('ionAlert', { static: false }) private ionAlert: ElementRef;

  iconType: IconType;

  hasPlainText: boolean;

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

  ngOnChanges(changes: SimpleChanges): void {
    this.setIcon();
    if (changes.message) {
      this.hasPlainText = typeof this.message === 'string';
    }
  }
}
