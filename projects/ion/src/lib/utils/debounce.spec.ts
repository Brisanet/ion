import debounce from './debounce';

describe('debounce', () => {
  let func: jest.Mock;

  beforeEach(() => {
    jest.useFakeTimers();
    func = jest.fn();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
  });

  describe('without arguments', () => {
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
  });

  describe('with arguments', () => {
    it('should not call function before a given time', () => {
      const debounced = debounce(func, 2000);
      
      debounced('test1');
      jest.advanceTimersByTime(500);
      debounced('test2');
      jest.advanceTimersByTime(500);
      debounced('test3');
      jest.advanceTimersByTime(500);
      debounced('test');
      jest.advanceTimersByTime(500);
      
      expect(func).not.toHaveBeenCalled();
    });

    it('should call function only once', () => {
      const debounced = debounce(func, 2000);
      
      debounced('test1');
      jest.advanceTimersByTime(500);
      debounced('test2');
      jest.advanceTimersByTime(500);
      debounced('test3');
      jest.advanceTimersByTime(500);
      debounced('test');
      
      jest.runAllTimers();
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should call function with arguments of the last call', () => {
      const lastArgument = 'test';
      const debounced = debounce(func, 2000);
      
      debounced('test1');
      jest.advanceTimersByTime(500);
      debounced('test2');
      jest.advanceTimersByTime(500);
      debounced('test3');
      jest.advanceTimersByTime(500);
      debounced(lastArgument);
      
      jest.runAllTimers();
      expect(func).toHaveBeenCalledWith(lastArgument);
    });
  });
});
