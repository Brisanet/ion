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
import { SafeAny } from '../utils/safe-any';

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
  @Input() message!: string | TemplateRef<string>;
  @Input() type?: StatusType = 'success';
  @Input() closable? = false;
  @Input() hideBackground? = false;

  @ViewChild('ionAlert') private ionAlert!: ElementRef;

  public template!: TemplateRef<string>;

  iconType!: IconType;

  hasPlainText!: boolean;

  closeEvent(): void {
    this.ionAlert.nativeElement.remove();
  }

  setIcon(): void {
    this.iconType = iconTypes[this.type || 'success'];
  }

  ngOnInit(): void {
    if (this.hideBackground) {
      this.closable = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.setIcon();
    if (changes['message']) {
      this.hasPlainText = typeof this.message === 'string';

      if (!this.hasPlainText) {
        this.template = this.message as unknown as TemplateRef<string>;
      }
    }
  }
}
