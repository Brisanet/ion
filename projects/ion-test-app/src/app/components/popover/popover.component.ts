import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  IonButtonComponent,
  IonPopoverDirective,
  PopoverPosition,
  PopoverTrigger,
  PopoverButtonsProps,
} from 'ion';

@Component({
  selector: 'app-popover',
  standalone: true,
  imports: [CommonModule, IonButtonComponent, IonPopoverDirective],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
})
export class PopoverComponent {
  PopoverPosition = PopoverPosition;
  PopoverTrigger = PopoverTrigger;

  actions: PopoverButtonsProps[] = [
    {
      label: 'Action 1',
      // action: () => alert('Action 1 clicked'),
    },
    {
      label: 'Action 2',
      // action: () => alert('Action 2 clicked'),
    },
  ];

  handleFirstAction(): void {
    alert('First action emitted!');
  }

  handleSecondAction(): void {
    alert('Second action emitted!');
  }
}
