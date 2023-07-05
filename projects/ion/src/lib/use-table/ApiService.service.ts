import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IResponse } from '../../core/api/http.interfaces';

@Injectable({
  providedIn: 'root',
})
export class IonApiService {
  smartList(): Observable<IResponse<{ name: string }>> {
    return of({
      data: [{ name: 'Iury' }, { name: 'Iracema' }],
      total: 2,
    });
  }

  list(): number[] {
    return [1, 2, 4];
  }
}
