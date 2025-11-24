import { Component, OnDestroy, OnInit } from '@angular/core';

import { IonTourService } from '../tour.service';

@Component({
  selector: 'tour-resizing-host',
  styles: [
    `
      main {
        height: 800px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;

        ion-button {
          position: absolute;
        }
      }
    `,
  ],
  template: `
    <main>
      <ion-button
        data-testid="demo-resizing-button"
        [style.top.px]="top"
        [style.left.px]="left"
        [style.width.px]="buttonWidth"
        label="Demo"
        type="secondary"
        [expand]="true"
        ionTourStep
        ionStepId="demo-resizing-step"
        ionTourId="demo-resizing-tour"
        ionStepTitle="Title Example"
        [ionStepBody]="stepBody"
      ></ion-button>
    </main>

    <ng-template #stepBody>
      <p>
        The host is changing its size and position, but the tour should still
        work
      </p>
    </ng-template>
  `,
})
export class TourResizingHostComponent implements OnInit, OnDestroy {
  public top = 100;
  public left = 50;
  public buttonWidth = 100;

  private interval: ReturnType<typeof setInterval>;

  constructor(private readonly ionTourService: IonTourService) {}

  public ngOnInit(): void {
    this.ionTourService.start();
    this.animateButtonSize();
  }

  public ngOnDestroy(): void {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  private animateButtonSize(): void {
    this.interval = setInterval(() => {
      this.top = this.getRandomNumber(0, 700);
      this.left = this.getRandomNumber(0, 500);
      this.buttonWidth = this.getRandomNumber(50, 300);
    }, 700);
  }

  private getRandomNumber(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
