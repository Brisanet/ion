import { Observable, of, throwError } from 'rxjs';
import BnTable, { IBnTable } from './bn-table';
import { BnService, IResponse } from '../api/http.interfaces';
import { SmartTableEvent } from '../../public-api';
import { EventTable } from '../../lib/table/utilsTable';

interface MockItemData {
  name: string;
}

const data: MockItemData[] = [{ name: 'iury' }];
const mockResponse: IResponse<MockItemData> = {
  data,
  total: data.length,
};

class MockService implements BnService<MockItemData> {
  list(): Observable<IResponse<MockItemData>> {
    return of(mockResponse);
  }
}

class MockEmptyService implements BnService<MockItemData> {
  list(): Observable<IResponse<MockItemData>> {
    return of({ total: 1 });
  }
}

// Defina um erro de exemplo
const mockError = new Error('Request Error');
class MockServiceError implements BnService<MockItemData> {
  list(): Observable<IResponse<MockItemData>> {
    return throwError(mockError);
  }
}

describe('BnTable', () => {
  let bnTable: BnTable<MockItemData>;
  const mockService: MockService = new MockService();

  beforeEach(() => {
    const config: IBnTable<MockItemData> = {
      service: mockService,
      tableConfig: {
        columns: [{ label: 'Name', key: 'name' }],
        actions: [{ label: 'Remove', icon: 'trash' }],
      },
    };
    bnTable = new BnTable<MockItemData>({ ...config });
  });

  it('should create a instance of BnTable', () => {
    expect(bnTable).toBeDefined();
  });

  it('should load data from service when init the table', async () => {
    expect(bnTable.configTable.data).toHaveLength(data.length);
  });

  it('should have pagination equal total from service', async () => {
    expect(bnTable.configTable.pagination.total).toBe(mockResponse.total);
  });

  it('should have column name', async () => {
    expect(bnTable.configTable.columns[0].key).toBe('name');
    expect(bnTable.configTable.columns[0].label).toBe('Name');
  });

  it('should have action remove', async () => {
    expect(bnTable.configTable.actions[0].label).toBe('Remove');
  });

  it('should loading is false when load data', async () => {
    expect(bnTable.configTable.data).toHaveLength(data.length);
    expect(bnTable.configTable.loading).toBeFalsy();
  });

  it('should format the data', async () => {
    const config: IBnTable<MockItemData> = {
      service: mockService,
      tableConfig: {
        columns: [{ label: 'Name', key: 'name' }],
      },
      formatData: (data) => {
        return data.map((item) => ({
          ...item,
          name: `${item.name} - formatted`,
        }));
      },
    };

    const bnTableFormatted: BnTable<MockItemData> = new BnTable<MockItemData>(
      config
    );

    bnTableFormatted.configTable.data.forEach((person) => {
      expect(person.name.includes('- formatted')).toBeTruthy();
    });
  });

  it('should add order on payload in first load when column have a order by default', async () => {
    const config: IBnTable<MockItemData> = {
      service: new MockEmptyService(),
      tableConfig: {
        columns: [
          { label: 'Name', key: 'name', desc: true },
          { label: 'Url', key: 'url' },
        ],
        actions: [{ label: 'Remove', icon: 'trash' }],
      },
    };
    const bnTableWithDefaultOrder: BnTable<MockItemData> =
      new BnTable<MockItemData>(config);

    expect(bnTableWithDefaultOrder.payload.order).toBe('name');
    expect(bnTableWithDefaultOrder.payload.sort).toBe('desc');
  });

  it('should return empty array when dont have data or dados', async () => {
    const config: IBnTable<MockItemData> = {
      service: new MockEmptyService(),
      tableConfig: {
        columns: [{ label: 'Name', key: 'name' }],
      },
    };
    const bnTableEmptyData: BnTable<MockItemData> = new BnTable<MockItemData>(
      config
    );
    expect(bnTableEmptyData.configTable.data).toHaveLength(0);
  });

  describe('Payload', () => {
    it('should send offset 0 on payload when init', async () => {
      expect(bnTable.payload.offset).toBe(0);
    });
  });

  describe('Events', () => {
    it('should change payload when dispatch REFRESH_FILTER', () => {
      const event: SmartTableEvent = {
        event: EventTable.REFRESH_FILTER,
        data: {
          name: 'Iracema',
        },
      };

      bnTable.events(event);
      expect(bnTable.payload.name).toBe('Iracema');
    });

    it('should dispatch 2 requests (total and data) when dispatch REFRESH_FILTER', () => {
      const listSpy = jest.spyOn(mockService, 'list');
      const momName = 'Iracema';

      const event: SmartTableEvent = {
        event: EventTable.REFRESH_FILTER,
        data: {
          name: momName,
        },
      };

      bnTable.events(event);
      expect(listSpy).toHaveBeenCalledTimes(2);
      expect(bnTable.payload.name).toBe(momName);

      jest.clearAllMocks();
    });

    it('should change offset when dispatch CHANGE_PAGE event', () => {
      const event: SmartTableEvent = {
        event: EventTable.CHANGE_PAGE,
        change_page: {
          actual: 1,
          itemsPerPage: 10,
          offset: 10,
        },
      };
      bnTable.events(event);
      expect(bnTable.payload.offset).toBe(event.change_page.offset);
    });

    it('should add order when dispatch SORT event', () => {
      const event: SmartTableEvent = {
        event: EventTable.SORT,
        order: {
          column: 'name',
          desc: true,
        },
      };
      bnTable.events(event);
      expect(bnTable.payload.order).toBe(event.order.column);
      expect(bnTable.payload.sort).toBe('desc');
    });

    it('should reset pagination when order table', () => {
      const nextPageEvent: SmartTableEvent = {
        event: EventTable.CHANGE_PAGE,
        change_page: {
          actual: 3,
          itemsPerPage: 10,
          offset: 10,
        },
      };
      bnTable.events(nextPageEvent);

      const sortEvent: SmartTableEvent = {
        event: EventTable.SORT,
        order: {
          column: 'name',
          desc: true,
        },
      };
      bnTable.events(sortEvent);
      expect(bnTable.payload.offset).toBe(0);
    });

    it('should reload data with new filters', () => {
      const filter = {
        name: 'abc',
        friends: 0,
        age: null,
      };
      bnTable.filter(filter);

      expect(bnTable.payload.age).toBeUndefined();
      expect(bnTable.payload.friends).toBe(filter.friends);
      expect(bnTable.payload.name).toBe(filter.name);
    });

    it('should reset off when reload data with new filters', () => {
      const filter = {
        name: 'abc',
        friends: 0,
        age: null,
      };

      const nextPageEvent: SmartTableEvent = {
        event: EventTable.CHANGE_PAGE,
        change_page: {
          actual: 3,
          itemsPerPage: 10,
          offset: 10,
        },
      };
      bnTable.events(nextPageEvent);
      bnTable.filter(filter);
      expect(bnTable.payload.offset).toBe(0);
    });

    it('should back to page 1 when order column', () => {
      bnTable.events({
        event: EventTable.CHANGE_PAGE,
        change_page: {
          actual: 3,
          itemsPerPage: 10,
          offset: 10,
        },
      });

      bnTable.events({
        event: EventTable.SORT,
        order: {
          column: 'name',
          desc: true,
        },
      });

      expect(bnTable.configTable.pagination.offset).toBe(0);
      expect(bnTable.configTable.pagination.page).toBe(1);

      bnTable.events({
        event: EventTable.CHANGE_PAGE,
        change_page: {
          actual: 3,
          itemsPerPage: 10,
          offset: 10,
        },
      });
      expect(bnTable.configTable.pagination.page).toBe(3);

      bnTable.events({
        event: EventTable.SORT,
        order: {
          column: 'name',
          desc: true,
        },
      });
      expect(bnTable.configTable.pagination.page).toBe(1);
    });
  });
});

describe('BnTable Error', () => {
  let bnTable: BnTable<MockItemData>;
  const mockServiceWithError: MockServiceError = new MockServiceError();

  it('should stop loading when receive an error', () => {
    const config: IBnTable<MockItemData> = {
      service: mockServiceWithError,
      tableConfig: {
        columns: [{ label: 'Name', key: 'name' }],
        actions: [{ label: 'Remove', icon: 'trash' }],
      },
    };
    bnTable = new BnTable<MockItemData>({ ...config });
    expect(bnTable.configTable.loading).toBeFalsy();
  });
});
