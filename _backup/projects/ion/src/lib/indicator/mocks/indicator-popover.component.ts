import {
  AfterViewInit,
  Component,
  Input,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  IonIndicatorButtonConfiguration,
  IonIndicatorButtonType,
  IonIndicatorProps,
} from '../../core/types';
import { PopoverPosition } from '../../core/types/popover';

@Component({
  template: `
    <div>
      <ion-indicator
        [title]="indicatorConfig.title"
        [value]="indicatorConfig.value"
        secondValue="5%"
        tooltipText="Texto personalizado via atributo tooltipText"
        [buttonConfig]="buttonPopoverConfig"
      >
      </ion-indicator>
      <ng-template #BodyTemplate>
        <div data-testid="ion-popover-body">
          <h3>{{ templateBody }}</h3>
        </div>
      </ng-template>
    </div>
  `,
})
export class IndicatorPopoverComponent implements OnInit, AfterViewInit {
  @ViewChild('BodyTemplate', { static: true }) popoverBody!: TemplateRef<void>;
  @Input() firstAction: () => void;
  @Input() secondAction: () => void;

  templateBody = 'Texto teste para popover';
  indicatorConfig: IonIndicatorProps;

  buttonPopoverConfig: IonIndicatorButtonConfiguration = {
    label: 'Abrir popover',
    type: IonIndicatorButtonType.Popover,
    popoverConfig: {
      ionPopoverBody: this.popoverBody,
      ionPopoverTitle: 'Título do popover',
      ionPopoverIcon: 'box',
      ionPopoverPosition: PopoverPosition.DEFAULT,
      ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
      ionPopoverIconClose: true,
    },
  };

  ngOnInit(): void {
    this.indicatorConfig = {
      title: 'Com botão que abre popover',
      value: 1500,
      secondValue: '5%',
      tooltipText: 'Texto personalizado via atributo tooltipText',
    };

    this.buttonPopoverConfig.popoverConfig.firstAction = this.firstAction;
    this.buttonPopoverConfig.popoverConfig.secondAction = this.secondAction;
  }

  ngAfterViewInit(): void {
    this.buttonPopoverConfig.popoverConfig.ionPopoverBody = this.popoverBody;
  }
}
