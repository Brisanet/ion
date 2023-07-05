import { Component } from '@angular/core';
import { BnTable } from '../../core/bn-table/bn-table';
import { IonApiService } from './ApiService.service';

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
        columns: [{ label: 'Name', key: 'name' }],
      },
    });
  }
}
