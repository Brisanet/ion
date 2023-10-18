import {
  Component,
  Input,
  OnInit,
  Output,
  EventEmitter,
  TemplateRef,
} from '@angular/core';
import { SafeAny } from '../../utils/safe-any';

@Component({
  selector: 'ion-accordion-item',
  templateUrl: './accordion-item.component.html',
  styleUrls: ['./accordion-item.component.scss'],
})
export class IonAccordionItemComponent implements OnInit {
  @Input() templateHeader: TemplateRef<HTMLElement>;
  @Input() show? = false;
  @Input() data?: SafeAny;
  @Output() activeChange? = new EventEmitter<void>();

  iconSize = 24;

  ngOnInit(): void {
    if (!this.templateHeader) {
      throw new Error('The templateHeader propertie were not set correctly');
    }
  }

  toggle(): void {
    this.show = !this.show;

    this.activeChange.emit();
  }
}
