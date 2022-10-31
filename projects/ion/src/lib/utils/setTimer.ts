import { Observable, timer } from 'rxjs';

export const setTimer = (time = 1000): Observable<number> => {
  return timer(time);
};
