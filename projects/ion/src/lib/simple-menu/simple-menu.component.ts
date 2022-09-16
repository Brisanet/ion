import { Component } from '@angular/core';
import { TabInGroup } from '../tab-group/tab-group.component';

@Component({
  selector: 'ion-simple-menu',
  templateUrl: './simple-menu.component.html',
  styleUrls: ['./simple-menu.component.scss'],
})
export class SimpleMenuComponent {
  public menus: TabInGroup[] = [
    {
      label: 'Agendamentos',
      selected: false,
    },
    {
      label: 'Recursos',
      selected: false,
    },
  ];
}
