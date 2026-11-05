import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import {
  ColumnType,
  ConfigSmartTable,
  IonInputCounterComponent,
  IonSmartTableComponent,
  SmartTableEvent,
} from 'ion';

@Component({
  selector: 'app-smart-table-gallery',
  standalone: true,
  imports: [IonSmartTableComponent, IonInputCounterComponent],
  templateUrl: './smart-table-gallery-component.html',
  styleUrls: ['./smart-table-gallery-component.scss'],
})
export class SmartTableGalleryComponent implements OnInit {
  private readonly http = inject(HttpClient);

  @ViewChild('quantityTemplate', { static: true })
  quantityTemplate!: TemplateRef<unknown>;

  smartTableConfig: ConfigSmartTable<any> = {
    data: [],
    columns: [
      { key: 'id', label: 'ID', sort: true },
      { key: 'firstName', label: 'Name', sort: true },
      { key: 'email', label: 'Email', sort: true },
      {
        key: 'quantity',
        label: 'Quantity',
        type: ColumnType.CUSTOM,
        customTemplate: this.quantityTemplate,
        sort: true,
      },
      {
        key: 'username',
        label: 'Username',
        type: ColumnType.TAG,
        tag: { statusKey: 'status' },
        sort: true,
      },
    ],
    pagination: {
      total: 0,
      itemsPerPage: 30,
      page: 1,
    },
    loading: false,
    actions: [
      {
        label: 'Information',
        labelFn: (row) => row.firstName,
        icon: 'information',
        call: (row: any) => console.log('Information for:', row),
      },
      {
        label: 'Delete',
        icon: 'trash',
        danger: true,
        call: (row: any) => this.handleDelete(row),
        confirm: {
          title: 'Excluir',
          description: 'Tem certeza que deseja excluir?',
        },
      },
    ],
  };

  ngOnInit(): void {
    const quantityColumn = this.smartTableConfig.columns.find(
      (col) => col.key === 'quantity',
    );
    if (quantityColumn) {
      quantityColumn.customTemplate = this.quantityTemplate;
    }
    this.getUsers();
  }

  getUsers(): void {
    this.smartTableConfig.loading = true;
    this.http.get('https://dummyjson.com/users').subscribe((response: any) => {
      this.smartTableConfig = {
        ...this.smartTableConfig,
        data: response.users.map((user: any) => ({
          ...user,
          status: 'success',
          quantity: 0,
        })),
        pagination: {
          ...this.smartTableConfig.pagination,
          total: response.total,
        },
        loading: false,
      };
    });
  }

  handleDelete(row: any): void {
    this.smartTableConfig = {
      ...this.smartTableConfig,
      data: this.smartTableConfig.data.filter(
        (item: any) => item.id !== row.id,
      ),
      pagination: {
        ...this.smartTableConfig.pagination,
        total: this.smartTableConfig.pagination.total - 1,
      },
    };
  }

  smartTableEvents(event: SmartTableEvent): void {
    console.log('Smart Table Event:', event);
  }
}