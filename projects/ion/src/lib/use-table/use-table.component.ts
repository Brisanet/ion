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
        columns: [{ label: 'Name', sort: true, key: 'name' }],
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
    });
  }

  reload(): void {
    this.filter({ name: 'iury' });
  }
}
