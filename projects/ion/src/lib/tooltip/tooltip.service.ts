import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  reposition = new Subject();
  hostPosition: Partial<DOMRect>;
}
