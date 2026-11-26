import { Component, ChangeDetectionStrategy, signal } from '@angular/core';
import { IonInputComponent } from '../../../../../../../ion/src/lib/input/input.component';
import { IonButtonComponent } from '../../../../../../../ion/src/lib/button/button.component';

type SandboxSize = 'base' | 'large';
type SandboxStatus = 'default' | 'valid' | 'invalid' | 'disabled';
type SandboxInputType = 'text' | 'password';

@Component({
  selector: 'app-text-input-gallery',
  standalone: true,
  imports: [IonInputComponent, IonButtonComponent],
  templateUrl: './text-input-gallery-component.html',
  styleUrls: ['./text-input-gallery-component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextInputGalleryComponent {
  readonly sizes: SandboxSize[] = ['base', 'large'];
  readonly statuses: SandboxStatus[] = ['default', 'valid', 'invalid', 'disabled'];
  readonly inputTypes: SandboxInputType[] = ['text', 'password'];

  sandboxValue = 'Texto de teste';
  sandboxSize = signal<SandboxSize>('base');
  sandboxStatus = signal<SandboxStatus>('default');
  sandboxType = signal<SandboxInputType>('text');
  sandboxPrefix = signal(false);
  sandboxLeftIcon = signal(false);
  sandboxRightIcon = signal(false);
  sandboxMaxLength = signal(false);
  sandboxInputButton = signal(false);
  sandboxLastEvent = signal('Aguardando interação...');

  onSandboxButtonClick(): void {
    this.sandboxLastEvent.set(`(clickButton) acionado · valor: "${this.sandboxValue}"`);
  }

  onSandboxTrailingClick(): void {
    this.sandboxLastEvent.set('(clickIconTrailing) acionado');
  }
}