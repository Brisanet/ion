import { Component, OnInit } from '@angular/core';
import { IconType } from '../../core/types/icon';
import { iconsPaths } from '../svgs/icons';

@Component({
  selector: 'ion-list-icon',
  template: `<div class="notification-container">
      <div *ngFor="let notification of notifications">
        <ion-notification
          title="Copiado! 😀"
          [message]="notification.message"
          [fixed]="true"
          type="success"
          fadeIn="fadeInUp"
          fadeOut="fadeOutDown"
          class="notification-content"
        ></ion-notification>
      </div>
    </div>
    <ion-input
      iconInput="search"
      iconDirection="right"
      placeholder="Pesquise por um ícone. Clique no ícone para copiá-lo"
      inputType="text"
      [clearButton]="true"
      (valueChange)="onChange($event)"
    ></ion-input>
    <ul class="container">
      <li
        *ngFor="let icon of iconsList"
        class="icon-container"
        (click)="onIconClick($event)"
        [id]="icon"
      >
        <ion-icon [type]="icon" [size]="24"></ion-icon>
        <span class="title">{{ icon }}</span>
      </li>
    </ul>`,
  styles: [
    `
      .container {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        width: 100%;
        padding: 0;
        gap: 4px;
        list-style: none;
      }

      .icon-container {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 10px 16px;
        gap: 4px;
        cursor: pointer;
      }

      .icon-container:hover {
        background-color: #e2f9fd;
        border-radius: 6px;
      }

      .title {
        font-family: 'Source Sans Pro', sans-serif;
        text-align: center;
        user-select: none;
      }

      .notification-container {
        position: fixed;
        display: flex;
        flex-direction: column;
        gap: 5px;
        left: 50%;
        top: 2.5%;
        transform: translateX(-50%);
      }

      @media (max-width: 850px) {
        .container {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      @media (max-width: 650px) {
        .container {
          grid-template-columns: repeat(3, 1fr);
        }
      }

      @media (max-width: 450px) {
        .container {
          grid-template-columns: repeat(2, 1fr);
        }
      }
    `,
  ],
})
export class ListIconsMockComponent implements OnInit {
  iconsList: IconType[] = [];
  notifications = [];
  removeFirst: number;

  readonly InitialIcons = Object.keys(iconsPaths);

  private iconName: string;

  onIconClick(event: MouseEvent): void {
    const target = event.currentTarget as HTMLElement;
    this.iconName = target.id;

    navigator.clipboard.writeText(
      `<ion-icon type="${this.iconName}"></ion-icon>`
    );

    this.notificationMultipleTimes();
  }

  notificationMultipleTimes(): void {
    if (this.notifications.length < 5) {
      this.addMessage();
    } else if (this.notifications.length === 5) {
      this.notifications.shift();
      this.addMessage();
    }

    for (let i = 0; i < this.notifications.length; i++) {
      this.startTimer();
      this.clearTimer();
    }
  }

  addMessage(): void {
    this.notifications.push({
      message: this.message(this.iconName),
    });
  }

  startTimer(): void {
    this.removeFirst = window.setTimeout(() => {
      this.notifications.shift();
    }, 4000);
  }

  clearTimer(): void {
    window.clearTimeout(this.removeFirst);
    this.startTimer();
  }

  message(icon?: string): string {
    if (icon) return `O ícone ${icon} foi copiado com sucesso!`;
  }

  onChange(event: string): void {
    this.iconsList = this.InitialIcons.filter((icon) =>
      icon.toLowerCase().includes(event.toLowerCase())
    );
  }

  ngOnInit(): void {
    this.iconsList = this.InitialIcons;
  }
}
