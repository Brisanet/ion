import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  signal,
} from '@angular/core';
import { NgComponentOutlet } from '@angular/common';
import { IonButtonComponent } from 'ion';
import { GALLERIES, type GalleryEntry } from '../galleries';

@Component({
  selector: 'app-gallery-carousel',
  imports: [IonButtonComponent, NgComponentOutlet],
  templateUrl: './gallery-carousel.component.html',
  styleUrl: './gallery-carousel.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GalleryCarouselComponent {
  galleries = input<readonly GalleryEntry[]>(GALLERIES);

  private readonly selectedGalleryKey = signal<string | null>(null);
  readonly activeGallery = computed((): GalleryEntry | null => {
    const galleries = this.galleries();
    return (
      galleries.find(({ key }) => key === this.selectedGalleryKey()) ??
      galleries.at(0) ??
      null
    );
  });

  selectGallery(gallery: GalleryEntry): void {
    this.selectedGalleryKey.set(gallery.key);
  }

}
