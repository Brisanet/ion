import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
  input,
  signal,
  output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  PopoverPosition,
  PopoverButtonsProps,
  PopoverTrigger,
} from '../../core/types/popover';
import { IonPositionService } from '../../position/position.service';
import { IonIconComponent } from '../../icon/icon.component';
import { IonButtonComponent } from '../../button/button.component';
import { IonDividerComponent } from '../../divider/divider.component';
import { IconType } from '../../core/types/icon';

const PRIMARY_6 = '#0858ce';

@Component({
  selector: 'ion-popover',
  standalone: true,
  imports: [CommonModule, IonIconComponent, IonButtonComponent, IonDividerComponent],
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss'],
  exportAs: 'PopoverComponent',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonPopoverComponent implements AfterViewChecked {
  @ViewChild('popover', { static: true }) popover!: ElementRef;

  ionPopoverTitle = input<string>('');
  ionPopoverKeep = input<boolean>(false);
  ionPopoverBody = input<any>(null);
  ionPopoverActions = input<PopoverButtonsProps[] | undefined>(undefined);
  ionPopoverIcon = input<IconType | undefined>(undefined);
  ionPopoverIconColor = input<string>(PRIMARY_6);
  ionPopoverIconClose = input<boolean>(false);
  ionPopoverPosition = signal<PopoverPosition>(PopoverPosition.DEFAULT);
  ionPopoverCustomClass = input<string>('');

  ionPopoverVisible = signal<boolean>(false);
  ionPopoverTrigger = signal<PopoverTrigger>(PopoverTrigger.DEFAULT);
  left = signal<number>(0);
  top = signal<number>(0);
  position = signal<string>('');

  ionOnClose = output<void>();
  ionOnFirstAction = output<void>();
  ionOnSecondAction = output<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private positionService: IonPositionService
  ) {}

  close(): void {
    this.ionOnClose.emit();
  }

  onClickOutside(): void {
    if (
      this.ionPopoverKeep() ||
      this.ionPopoverTrigger() === PopoverTrigger.HOVER
    ) {
      return;
    }
    this.close();
  }

  firstAction(): void {
    this.ionOnFirstAction.emit();
  }

  secondAction(): void {
    this.ionOnSecondAction.emit();
  }

  ngAfterViewChecked(): void {
    this.repositionPopover();
    this.cdr.detectChanges();
  }

  private repositionPopover(): void {
    const coordinates = this.popover.nativeElement.getBoundingClientRect();

    this.positionService.setcomponentCoordinates(coordinates);
    this.positionService.setChoosedPosition(this.ionPopoverPosition());
    this.ionPopoverPosition.set(
      this.positionService.getCurrentPosition() as PopoverPosition
    );
    this.positionService.emitReposition();
  }
}
