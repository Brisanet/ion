import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IPayload, IResponse } from '../../core/api/http.interfaces';

@Injectable({
  providedIn: 'root',
})
export class IonApiService {
  list(filter?: IPayload): Observable<IResponse<{ name: string }>> {
    const data = [{ name: 'Iury' }, { name: 'Iracema' }];
    return of({
      data,
      total: data.length,
    });
  }
}
