import { Component, TemplateRef, ViewChild } from '@angular/core';
import { ConfigTable, IonTableComponent } from 'ion';

@Component({
  selector: 'app-table-gallery',
  standalone: true,
  imports: [IonTableComponent],
  templateUrl: './table-gallery-component.html',
  styleUrls: ['./table-gallery-component.scss'],
})
export class TableGalleryComponent {
  @ViewChild('tablePopoverTemplate', { static: true })
  tablePopoverTemplate!: TemplateRef<unknown>;

  tableConfig: ConfigTable<any> = {
    data: [
      { id: 1, name: 'Meteora', type: 'CD', year: 2003 },
      { id: 2, name: 'One More Light', type: 'CD', year: 2017 },
      { id: 3, name: 'Hybrid Theory', type: 'CD', year: 2000 },
      { id: 4, name: 'Minutes to Midnight', type: 'CD', year: 2007 },
    ],
    columns: [
      { label: 'ID', key: 'id', sort: true },
      { label: 'Name', key: 'name', sort: true },
      { label: 'Type', key: 'type', sort: true },
      { label: 'Year', key: 'year', sort: true },
    ],
    actions: [
      {
        label: 'Information',
        labelFn: (row) => row.name,
        icon: 'information',
        call: (row: any) => console.log('Dynamic label for:', row),
      },
      {
        label: 'Edit',
        icon: 'pencil',
        call: (row: any) => console.log('Edit row:', row),
      },
      {
        label: 'Excluir',
        icon: 'trash',
        danger: true,
        call: () => console.log('cancelado!'),
        secondCall: (row: any) => console.log('excluir row:', row),
        confirm: {
          title: 'Excluir',
          description: 'Tem certeza que deseja excluir?',
          // confirmText: 'Excluir',
          // cancelText: 'Cancelar',
        },
        // popover: (row: any) => ({
        //   ionPopoverTitle: 'Excluir Item',
        //   ionPopoverBody: this.tablePopoverTemplate,
        //   ionPopoverActions: [
        //     { label: 'Cancelar', type: 'ghost' },
        //     { label: 'Confirmar', type: 'primary' },
        //   ],
        // }),
      },
    ],
    pagination: {
      total: 4,
      itemsPerPage: 10,
      page: 1,
    },
    check: true,
  };
}