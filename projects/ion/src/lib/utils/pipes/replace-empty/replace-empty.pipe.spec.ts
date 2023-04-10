import { TestBed } from '@angular/core/testing';
import { ReplaceEmptyPipe } from './replace-empty.pipe';

describe('ReplaceEmptyPipe', () => {
  let pipe: ReplaceEmptyPipe;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReplaceEmptyPipe],
    });
    pipe = TestBed.get(ReplaceEmptyPipe);
  });

  it('should create the pipe', () => {
    expect(pipe).toBeTruthy();
  });

  it('should replace empty values with the specified value', () => {
    expect(pipe.transform(null, '-')).toBe('-');
    expect(pipe.transform(undefined, 'N/A')).toBe('N/A');
    expect(pipe.transform('', 'N/D')).toBe('N/D');
  });

  it('should not replace zero values', () => {
    expect(pipe.transform(0, '-')).toBe(0);
    expect(pipe.transform('0', '-')).toBe('0');
  });

  it('should not replace non-empty values', () => {
    expect(pipe.transform('abc', '-')).toBe('abc');
    expect(pipe.transform(123, 'N/A')).toBe(123);
  });
});
