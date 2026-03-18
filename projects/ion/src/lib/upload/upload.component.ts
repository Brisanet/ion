import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonIconComponent } from '../icon/icon.component';
import { IonButtonComponent } from '../button/button.component';

@Component({
  selector: 'ion-upload',
  standalone: true,
  imports: [FormsModule, IonIconComponent, IonButtonComponent],
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonUploadComponent {
  accept = input<string>('');
  acceptLabel = input<string>('');
  showUrlImport = input<boolean>(true);
  urlPlaceholder = input<string>('Placeholder');
  disabled = input<boolean>(false);

  fileChange = output<File>();
  urlImport = output<string>();

  isDragging = signal(false);
  urlValue = signal('');
  selectedFile = signal<File | null>(null);

  @ViewChild('fileInput') fileInputRef!: ElementRef<HTMLInputElement>;

  openFileDialog(): void {
    if (!this.disabled()) {
      this.fileInputRef.nativeElement.click();
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile.set(input.files[0]);
      this.fileChange.emit(input.files[0]);
      input.value = '';
    }
  }

  removeFile(): void {
    this.selectedFile.set(null);
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    if (!this.disabled()) {
      this.isDragging.set(true);
    }
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    this.isDragging.set(false);
    if (this.disabled()) return;
    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.selectedFile.set(files[0]);
      this.fileChange.emit(files[0]);
    }
  }

  onUrlImport(): void {
    const url = this.urlValue();
    if (url.trim()) {
      this.urlImport.emit(url);
    }
  }

  setUrlValue(value: string): void {
    this.urlValue.set(value);
  }
}
