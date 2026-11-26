import { Component, ChangeDetectionStrategy, computed, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonInputComponent } from '../../../../../../../ion/src/lib/input/input.component';
import { IonButtonComponent } from '../../../../../../../ion/src/lib/button/button.component';

type SandboxSize = 'base' | 'large';
type SandboxStatus = 'default' | 'valid' | 'invalid' | 'disabled';
type SandboxInputType = 'text' | 'password';

@Component({
  selector: 'app-text-input-gallery',
  standalone: true,
  imports: [FormsModule, IonInputComponent, IonButtonComponent],
  templateUrl: './text-input-gallery-component.html',
  styleUrls: ['./text-input-gallery-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputGalleryComponent {
  baseValue = '';
  largeValue = '';
  prefixValue = '1.250,00';
  trailingValue = 'senha123';
  buttonValue = '48999887766';
  errorValue = 'email-invalido@';
  successValue = 'cliente_vip@empresa.com';
  comboValue = '99.90';

  showPassword = signal<boolean>(false);

  // Configurações do Sandbox
  readonly sizes: SandboxSize[] = ['base', 'large'];
  readonly statuses: SandboxStatus[] = ['default', 'valid', 'invalid', 'disabled'];
  readonly inputTypes: SandboxInputType[] = ['text', 'password'];

  sandboxValue = 'Texto de teste';
  sandboxSize = signal<SandboxSize>('base');
  sandboxStatus = signal<SandboxStatus>('default');
  sandboxType = signal<SandboxInputType>('text');
  sandboxPrefix = signal<boolean>(false);
  sandboxLeftIcon = signal<boolean>(false);
  sandboxClearButton = signal<boolean>(false);
  sandboxMaxLength = signal<boolean>(false);
  sandboxInputButton = signal<boolean>(false);
  sandboxLastEvent = signal<string>('Aguardando interação...');

  onTrailingClick(): void {
    this.showPassword.update((visible) => !visible);
  }

  onButtonClick(): void {
    alert(`Ação do botão acionada com o valor: ${this.buttonValue || '(vazio)'}`);
  }

  toggleSandboxClearButton(): void {
    if (this.sandboxInputButton()) return;
    const next = !this.sandboxClearButton();
    this.sandboxClearButton.set(next);
    if (next) this.sandboxInputButton.set(false);
  }

  toggleSandboxInputButton(): void {
    if (this.sandboxClearButton()) return;
    const next = !this.sandboxInputButton();
    this.sandboxInputButton.set(next);
    if (next) this.sandboxClearButton.set(false);
  }

  onSandboxButtonClick(): void {
    this.sandboxLastEvent.set(`(clickButton) acionado · valor: "${this.sandboxValue}"`);
  }
}