import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonInputComponent } from '../../../../../../../ion/src/lib/input/input.component'; 

@Component({
  selector: 'app-text-input-gallery',
  standalone: true,
  imports: [FormsModule, IonInputComponent],
  templateUrl: './text-input-gallery-component.html',
  styleUrls: ['./text-input-gallery-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputGalleryComponent {
  baseValue = '';
  largeValue = '';
  primaryValue = 'Texto digitado no tema primário';
  secondaryValue = '';
  prefixValue = '1.250,00';
  trailingValue = 'senha123';
  buttonValue = '48999887766';
  errorValue = 'email-invalido@';
  successValue = 'cliente_vip@empresa.com';
  comboValue = '99.90';

  showPassword = signal<boolean>(false);

  onTrailingClick(): void {
    this.showPassword.update((visible) => !visible);
    console.log('Clique no trailing icon detectado!');
  }

  onButtonClick(): void {
    alert(`Ação do botão acionada com o valor: ${this.buttonValue || '(vazio)'}`);
  }
}