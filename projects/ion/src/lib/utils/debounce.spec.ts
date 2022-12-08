import debounce from './debounce';

const func = jest.fn();
jest.useFakeTimers();

describe('debounce', () => {
  beforeEach(() => {
    func.mockClear();
  });

  it('should call function after a given time', () => {
    debounce(func, 1000)();
    expect(func).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(func).toHaveBeenCalledTimes(1);
  });
  it('should call function with arguments', () => {
    const argument = 'test';
    debounce(func, 1000)(argument);
    expect(func).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith(argument);
  });
  it('should call function only once', () => {
    const debounced = debounce(func, 1000);
    debounced();
    debounced();
    debounced();
    debounced();
    expect(func).not.toHaveBeenCalled();
    jest.runAllTimers();
    expect(func).toHaveBeenCalledTimes(1);
  });
});
