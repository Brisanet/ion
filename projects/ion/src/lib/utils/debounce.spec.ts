import debounce from './debounce';

const func = jest.fn();
jest.useFakeTimers();

describe('debounce', () => {
  describe('without arguments', () => {
    beforeEach(() => {
      func.mockClear();
    });
    it('should call function after a given time', () => {
      debounce(func, 1000)();
      expect(func).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should call function only once while debouncing', () => {
      const debounced = debounce(func, 1000);
      debounced();
      jest.advanceTimersByTime(500);
      debounced();
      jest.advanceTimersByTime(500);
      debounced();
      jest.advanceTimersByTime(500);
      debounced();
      jest.advanceTimersByTime(500);
      expect(func).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(func).toHaveBeenCalledTimes(1);
    });
    it('should call clear timeout when same function is called more than once while debouncing', () => {
      jest.spyOn(global, 'clearTimeout');
      const debounced = debounce(func, 1000);
      debounced();
      debounced();
      expect(func).not.toHaveBeenCalled();
      jest.runAllTimers();
      expect(clearTimeout).toHaveBeenCalledTimes(1);
    });
  });
  describe('with arguments', () => {
    const lastArgument = 'test';
    const debounced = debounce(func, 2000);

    beforeAll(() => {
      func.mockClear();

      debounced('test1');
      jest.advanceTimersByTime(500);
      debounced('test2');
      jest.advanceTimersByTime(500);
      debounced('test3');
      jest.advanceTimersByTime(500);
      debounced(lastArgument);
      jest.advanceTimersByTime(500);
    });

    it('should not call function before a given time', () => {
      expect(func).not.toHaveBeenCalled();
    });
    it('should call function only once', () => {
      jest.runAllTimers();
      expect(func).toHaveBeenCalledTimes(1);
    });
    it('should call function with arguments of the last call', () => {
      expect(func).toHaveBeenCalledWith(lastArgument);
    });
  });
});
