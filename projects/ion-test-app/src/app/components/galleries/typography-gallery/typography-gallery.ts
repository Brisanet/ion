import { ChangeDetectorRef, Component, HostListener, inject } from '@angular/core';
import { IonButtonComponent } from 'ion';

@Component({
  selector: 'app-typography-gallery',
  imports: [IonButtonComponent],
  templateUrl: './typography-gallery.html',
  styleUrls: ['./typography-gallery.scss']
})
export class TypographyGalleryComponent {
  private readonly changeDetectorRef = inject(ChangeDetectorRef);

  // Controle da Fonte
  fontMode: 'by-style' | 'source-sans-pro' | 'figtree' = 'by-style';

  // Controle de Breakpoint
  previewMode: 'window' | 'mobile' | 'notebook' | 'desktop' = 'window';

  setFontMode(mode: 'by-style' | 'source-sans-pro' | 'figtree') {
    this.fontMode = mode;
  }

  setPreviewMode(mode: 'window' | 'mobile' | 'notebook' | 'desktop') {
    this.previewMode = mode;
  }

  getTypographySize(element: HTMLElement): string {
    const { fontSize, lineHeight } = getComputedStyle(element);
    return `${fontSize} / ${lineHeight}`;
  }

  @HostListener('window:resize')
  refreshTypographySizes(): void {
    this.changeDetectorRef.markForCheck();
  }
}