import { timer } from 'rxjs';

export const setTimer = (time = 1000) => {
  return timer(time);
};
