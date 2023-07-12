import { Observable, of } from 'rxjs';
import BnTable, { BnService, IBnTable } from './bn-table';
import { SafeAny } from '../../lib/utils/safe-any';

// Mock do serviço
class MockService implements BnService<SafeAny> {
  list(): Observable<SafeAny> {
    return of({ data: [], total: 0 });
  }
}

describe('BnTable', () => {
  let bnTable: BnTable<SafeAny>;
  let mockService: MockService;

  beforeEach(() => {
    mockService = new MockService();
    const config: IBnTable<SafeAny> = {
      service: mockService,
      tableConfig: {
        columns: [],
        actions: [],
      },
    };
    bnTable = new BnTable<SafeAny>(config);
  });

  it('should create a instance of BnTable', () => {
    expect(bnTable).toBeDefined();
  });

  it('deve chamar o método smartData e atualizar a configuração da tabela', async () => {
    bnTable.smartData();
    expect(bnTable.configTable.loading).toBe(false);
  });
});
