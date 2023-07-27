import { Observable, of } from 'rxjs';
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
  total: 1,
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
  });
});
