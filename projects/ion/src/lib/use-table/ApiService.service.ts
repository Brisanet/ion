import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPayload, IResponse } from '../../core/api/http.interfaces';

@Injectable({
  providedIn: 'root',
})
export class IonApiService {
  smartList(filter: IPayload): Observable<IResponse<{ name: string }>> {
    console.log('filter -> ', filter);
    return of({
      data: [{ name: 'Iury' }, { name: 'Iracema' }],
      total: 2,
    });
  }

  list(): number[] {
    return [1, 2, 4];
  }
}
