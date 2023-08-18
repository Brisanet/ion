import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { SafeAny } from '../utils/safe-any';

@Injectable({
  providedIn: 'root',
})
export class TooltipService {
  rerender = new Subject();
  hostPosition: SafeAny;
}
