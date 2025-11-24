import { Component } from '@angular/core';
import { IonApiService } from './ApiService.service';
import { BnTable } from '../../public-api';

interface User {
  id: string;
  nome: string;
  data_criacao: string;
}

const columns = [
  {
    key: 'data_monitoramento',
    label: 'Data do monitoramento',
    sort: true,
  },
  {
    key: 'http_code',
    label: 'HTTP code',
    sort: true,
  },
  {
    key: 'dns',
    label: 'DNS',
    sort: true,
  },
  {
    key: 'latencia',
    label: 'Conexão',
    sort: true,
  },
  {
    key: 'processamento',
    label: 'Processamento',
    sort: true,
  },
  {
    key: 'problemas',
    label: 'Problemas',
    sort: true,
  },
];

@Component({
  selector: 'ion-use-table',
  templateUrl: './use-table.component.html',
})
export class IonUseTableComponent extends BnTable<User> {
  constructor(service: IonApiService) {
    super({
      service,
      tableConfig: {
        columns,
        actions: [
          {
            icon: 'trash',
            label: 'Delete',
            call: (row): void => {
              row.nome = `${row.nome} - deleted`;
              // console.log('row -> ', row);
            },
          },
        ],
      },
      formatData: (data) =>
        data.map((item) => ({ ...item, nome: `${item.nome} Teste` })),
    });
  }

  reload(): void {
    this.filter({ name: 'iury' });
  }
}
