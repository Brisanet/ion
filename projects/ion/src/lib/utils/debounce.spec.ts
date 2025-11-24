import debounce from './debounce';

const func = jasmine.createSpy('func');

describe('debounce', () => {
  beforeEach(() => {
    jasmine.clock().install();
  });

  afterEach(() => {
    jasmine.clock().uninstall();
  });

  describe('without arguments', () => {
    beforeEach(() => {
      func.calls.reset();
    });
    it('should call function after a given time', () => {
      debounce(func, 1000)();
      expect(func).not.toHaveBeenCalled();
      jasmine.clock().tick(1000);
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should call function only once while debouncing', () => {
      const debounced = debounce(func, 1000);
      debounced();
      jasmine.clock().tick(500);
      debounced();
      jasmine.clock().tick(500);
      debounced();
      jasmine.clock().tick(500);
      debounced();
      jasmine.clock().tick(500);
      expect(func).not.toHaveBeenCalled();
      jasmine.clock().tick(1000); // Wait enough time
      expect(func).toHaveBeenCalledTimes(1);
    });

    it('should call clear timeout when same function is called more than once while debouncing', () => {
      spyOn(window, 'clearTimeout').and.callThrough();
      const debounced = debounce(func, 1000);
      debounced();
      debounced();
      expect(func).not.toHaveBeenCalled();
      jasmine.clock().tick(1000);
      expect(window.clearTimeout).toHaveBeenCalled();
    });
  });

  describe('with arguments', () => {
    const lastArgument = 'test';
    const debounced = debounce(func, 2000);

    beforeAll(() => {
      // Jasmine doesn't support beforeAll with clock well if installed in beforeEach?
      // Actually, we can just run the sequence in the test or setup.
    });

    it('should handle arguments correctly', () => {
      func.calls.reset();
      debounced('test1');
      jasmine.clock().tick(500);
      debounced('test2');
      jasmine.clock().tick(500);
      debounced('test3');
      jasmine.clock().tick(500);
      debounced(lastArgument);
      jasmine.clock().tick(500);

      expect(func).not.toHaveBeenCalled();
      jasmine.clock().tick(2000);
      expect(func).toHaveBeenCalledTimes(1);
      expect(func).toHaveBeenCalledWith(lastArgument);
    });
  });
});
