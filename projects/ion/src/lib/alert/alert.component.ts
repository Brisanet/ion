import {
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  computed,
  input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { StatusType } from '../core/types/status';
import { IconType } from '../core/types/icon';
import { IonIconComponent } from '../icon/icon.component';

const iconTypes: Record<string, string> = {
  success: 'check-solid',
  warning: 'exclamation-solid',
  info: 'info-solid',
  negative: 'close-solid',
};

@Component({
  selector: 'ion-alert',
  standalone: true,
  imports: [CommonModule, IonIconComponent],
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
})
export class IonAlertComponent {
  message = input.required<string | TemplateRef<void>>();
  type = input<StatusType>('success');
  closable = input<boolean>(false);
  hideBackground = input<boolean>(false);
  noRadius = input<boolean>(false);
  description = input<string>();

  @ViewChild('ionAlert', { static: false }) private ionAlert!: ElementRef;

  iconType = computed<IconType>(() => {
    return iconTypes[this.type()] as IconType;
  });

  hasPlainText = computed(() => typeof this.message() === 'string');

  closeEvent(): void {
    this.ionAlert.nativeElement.remove();
  }
}
