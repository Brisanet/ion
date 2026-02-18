
import { Component, input, output } from '@angular/core';
import { IonButtonComponent } from '../button/button.component';
import { IonAlertComponent } from '../alert/alert.component';
import { IonAvatarComponent } from '../avatar/avatar.component';
import { AvatarType, IonAvatarProps } from '../core/types/avatar';
import { IonButtonProps } from '../core/types/button';
import { IonAlertProps } from '../core/types/alert';
import { IonInputComponent } from '../input/input.component';
import { IonInputProps } from '../core/types/input';

@Component({
  selector: 'ion-navbar',
  standalone: true,
  imports: [IonButtonComponent, IonAlertComponent, IonAvatarComponent, IonInputComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class IonNavbarComponent {
  AvatarType = AvatarType;
  leftAction = input<IonButtonProps>();
  rightActions = input<Partial<IonButtonProps & { action: string }>[]>();
  inputSearch = input<IonInputProps>();
  alert = input<IonAlertProps>();
  avatar = input.required<IonAvatarProps>();

  leftActionOutput = output();
  rightActionOutput = output<string>();
  valueChange = output<string>();
}
