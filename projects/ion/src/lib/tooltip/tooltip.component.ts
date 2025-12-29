import {
  AfterViewChecked,
  ChangeDetectorRef,
  Component,
  ElementRef,
  TemplateRef,
  ViewChild,
  input,
  signal,
  ChangeDetectionStrategy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipColorScheme, TooltipPosition } from '../core/types';
import { TooltipService } from './tooltip.service';

@Component({
  selector: 'ion-tooltip',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IonTooltipComponent implements AfterViewChecked {
  @ViewChild('tooltip', { static: true }) tooltip!: ElementRef;

  ionTooltipTitle = input<string>('');
  ionTooltipTemplateRef = input<TemplateRef<void> | null>(null);
  ionTooltipColorScheme = input<TooltipColorScheme>('dark');
  ionTooltipPosition = signal<TooltipPosition>(TooltipPosition.DEFAULT);
  ionTooltipVisible = signal<boolean>(false);
  ionTooltipCustomClass = input<string>('');
  left = signal<number>(0);
  top = signal<number>(0);

  constructor(
    private cdr: ChangeDetectorRef,
    private tooltipService: TooltipService,
  ) {}

  ngAfterViewChecked(): void {
    this.repositionTooltip();
    this.cdr.detectChanges();
  }

  private repositionTooltip(): void {
    const coordinates = this.tooltip.nativeElement.getBoundingClientRect();

    this.tooltipService.setTooltipCoordinates(coordinates);
    this.tooltipService.setCurrentPosition(this.ionTooltipPosition());
    const newPosition = this.tooltipService.getNewPosition();
    this.ionTooltipPosition.set(newPosition);
    this.tooltipService.emitReposition();
  }
}
