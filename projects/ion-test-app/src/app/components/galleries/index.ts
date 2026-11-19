import { Type } from '@angular/core';
import { ColorGalleryComponent } from './color-gallery/color-gallery-component';
import { IconGalleryComponent } from './icon-gallery/icon-gallery.component';
import { TypographyGalleryComponent } from './typography-gallery/typography-gallery';

export type GalleryEntry = {
  key: string;
  label: string;
  component: Type<unknown>;
};

export const GALLERIES: readonly GalleryEntry[] = [
  { key: 'colors', label: 'Cores', component: ColorGalleryComponent },
  { key: 'icons', label: 'Ícones', component: IconGalleryComponent },
  { key: 'typography', label: 'Tipografia', component: TypographyGalleryComponent},
  
];

// All galleries in ion-test-app must be imported here