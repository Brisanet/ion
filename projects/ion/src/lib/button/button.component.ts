import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
export interface IButton {
  label: string;
  type: 'primary' | 'secundary' | 'ghost' | 'dashed';
  size: 'sm' | 'md' | 'lg' | 'xl';
  danger: 'true' | 'false';
  disabled: 'true' | 'false';
  load: boolean;
}
@Component({
  selector: 'ion-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() label: string;
  @Input() type: IButton['type'] = 'primary';
  @Input() size: IButton['size'] = 'md';
  @Input() danger: IButton['danger'] = 'false';
  @Input() disabled: IButton['disabled'] = 'false';
  @Output() ionOnClick = new EventEmitter();
  _disabled = false;
  _danger = false;

  handleClick() {
    this.ionOnClick.emit();
  }

  ngOnInit(): void {
    this._disabled = this.disabled === 'true' ? true : false;
    this._danger = this.danger === 'true' ? true : false;
  }
}
