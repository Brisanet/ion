import { Component } from '@angular/core';
import { IonApiService } from './ApiService.service';
import { BnTable } from '../../public-api';

interface User {
  id: string;
  nome: string;
  data_criacao: string;
}

@Component({
  selector: 'ion-use-table',
  templateUrl: './use-table.component.html',
  styleUrls: ['./use-table.component.scss'],
})
export class IonUseTableComponent extends BnTable<User> {
  constructor(service: IonApiService) {
    super({
      service,
      tableConfig: {
        columns: [{ label: 'Nome', sort: true, key: 'nome' }],
        actions: [
          {
            icon: 'trash',
            label: 'Delete',
            call: (row): void => {
              console.log('row -> ', row);
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
