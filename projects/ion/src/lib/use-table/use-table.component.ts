import { Component } from '@angular/core';
import { IonApiService } from './ApiService.service';
import { BnTable } from '../../public-api';

interface User {
  name: string;
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
        columns: [{ label: 'Nome', sort: true, key: 'name' }],
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
        data.map((item) => ({ ...item, name: `${item.name} Teste` })),
    });
  }

  reload(): void {
    this.filter({ name: 'iury' });
  }
}
