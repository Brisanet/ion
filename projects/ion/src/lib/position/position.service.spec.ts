import { IonPositionService, IonPositions } from './position.service';

describe('IonPositionService', () => {
  let ionPositionService: IonPositionService;

  beforeEach(() => {
    ionPositionService = new IonPositionService();
  });

  it('should be created', () => {
    expect(ionPositionService).toBeTruthy();
  });

  it('should set host position', () => {
    const hostPosition = {
      left: 10,
      top: 20,
      right: 30,
      bottom: 40,
    } as DOMRect;
    ionPositionService.setHostPosition(hostPosition);
    expect(ionPositionService['hostPosition']).toEqual(hostPosition);
  });

  it('should set component coordinates', () => {
    const componentCoordinates = {
      left: 5,
      top: 15,
      right: 25,
      bottom: 35,
    } as DOMRect;
    ionPositionService.setcomponentCoordinates(componentCoordinates);
    expect(ionPositionService['componentCoordinates']).toEqual(
      componentCoordinates
    );
  });

  it('should set chosen position', () => {
    const chosenPosition = IonPositions.TOP_LEFT;
    ionPositionService.setChoosedPosition(chosenPosition);
    expect(ionPositionService['choosedPosition']).toEqual(chosenPosition);
  });

  it('should get current position', () => {
    const chosenPosition = IonPositions.TOP_LEFT;
    ionPositionService.setChoosedPosition(chosenPosition);
    expect(ionPositionService.getCurrentPosition()).toEqual(chosenPosition);
  });

  it('should set point at center', () => {
    ionPositionService.setPointAtCenter(true);
    expect(ionPositionService['pointAtCenter']).toBeTruthy();
  });

  describe('getNewPosition', () => {
    it('should return undefined if host position is not set', () => {
      const getPositionCallbackMock = jest.fn();
      const newPosition = ionPositionService.getNewPosition(
        getPositionCallbackMock
      );
      expect(getPositionCallbackMock).not.toHaveBeenCalled();
      expect(newPosition).toBeUndefined();
    });

    it('should return new position', () => {
      const getPositionCallbackMock = jest
        .fn()
        .mockReturnValue({ [IonPositions.TOP_LEFT]: { left: 0, top: 0 } });
      const hostPosition = {
        left: 10,
        top: 20,
        right: 30,
        bottom: 40,
      } as DOMRect;
      const componentCoordinates = {
        left: 5,
        top: 15,
        right: 25,
        bottom: 35,
      } as DOMRect;

      ionPositionService.setHostPosition(hostPosition);
      ionPositionService.setcomponentCoordinates(componentCoordinates);

      const newPosition = ionPositionService.getNewPosition(
        getPositionCallbackMock
      );

      expect(getPositionCallbackMock).toHaveBeenCalledWith({
        host: hostPosition,
        arrowAtCenter: true,
        element: componentCoordinates,
      });

      expect(newPosition).toEqual({
        key: IonPositions.TOP_LEFT,
        left: 0,
        top: 0,
      });
    });
  });
});
