import { Component, Input, OnInit } from '@angular/core';
import { ConfigSmartTable } from '../smart-table/smart-table.component';
import { IconType } from './../icon/icon.component';

export interface IonMessageProps {
  label: string;
  type?: MessageStatusType;
  iconType?: IconType;
}

export type MessageStatusType =
  | 'positive'
  | 'negative_alert'
  | 'negative_erro'
  | 'warning'
  | 'info'
  | 'custom';

export const icontypes = {
  positive: 'check-solid',
  negative_alert: 'exclamation-solid',
  negative_erro: 'close-solid',
  warning: 'exclamation-solid',
  info: 'info-solid',
  custom: 'plus-solid',
};

interface Char {
  id: number;
  name: string;
}

@Component({
  selector: 'ion-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
})
export class MessageComponent implements OnInit {
  @Input() label!: string;
  @Input() type = 'positive';
  @Input() iconType?: IconType;

  public table: ConfigSmartTable<Char> = {
    data: [],
    columns: [
      {
        key: 'id',
        label: 'Código',
        sort: true,
      },
      {
        key: 'name',
        label: 'Nome',
        sort: false,
      },
    ],
    pagination: {
      total: 0,
      itemsPerPage: 15,
    },
  };

  setIcon(): void {
    this.iconType = icontypes[this.type];
  }

  ngOnInit(): void {
    this.setIcon();
  }
}
