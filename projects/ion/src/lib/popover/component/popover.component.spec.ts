import { screen } from '@testing-library/angular';
import { IonDividerComponent } from '../../divider/divider.component';
import { IonPopoverComponent } from './popover.component';
import { PopoverPosition } from '../../core/types/popover';
import { IonSharedModule } from '../../shared.module';
import { Component, NgModule } from '@angular/core';
import { IonIconModule } from '../../icon/icon.module';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';

@Component({
  template: `
    <style>
      div {
        margin-left: 10px;
        display: flex;
      }
    </style>
    <div>
      <ion-popover
        [ionPopoverTitle]="args.ionPopoverTitle"
        [ionPopoverBody]="BodyTemplate"
        [ionPopoverKeep]="true"
        [ionPopoverIconClose]="args.ionPopoverIconClose"
        [ionPopoverIcon]="args.ionPopoverIcon"
        [ionPopoverPosition]="args.ionPopoverPosition"
        [ionPopoverActions]="args.ionPopoverActions"
        [ionPopoverCustomClass]="args.ionPopoverCustomClass"
      >
      </ion-popover>
      <ng-template #BodyTemplate> {{ args.ionPopoverBody }} </ng-template>
    </div>
  `,
})
export class PopoverTestComponent {
  args = {
    ionPopoverKeep: true,
    ionPopoverTitle: 'Title',
    ionPopoverBody: 'Description',
    ionPopoverPosition: PopoverPosition.DEFAULT,
    ionPopoverIconClose: true,
    ionPopoverIcon: 'condominium',
    ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
    ionPopoverCustomClass: 'custom-class-added',
  };
}
@NgModule({
  imports: [CommonModule, IonIconModule, IonSharedModule],
  declarations: [
    PopoverTestComponent,
    IonDividerComponent,
    IonPopoverComponent,
  ],
  entryComponents: [PopoverTestComponent],
})
class TestModule {}

describe('PopoverComponent', () => {
  let PopoverComponent!: PopoverTestComponent;
  let fixture!: ComponentFixture<PopoverTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [TestModule],
    }).compileComponents();
    fixture = TestBed.createComponent(PopoverTestComponent);
    PopoverComponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    fixture.destroy();
  });

  describe('Check default fields', () => {
    it('should render component with title', async () => {
      expect(
        screen.getByText(PopoverComponent.args.ionPopoverTitle)
      ).toBeInTheDocument();
    });

    it('should render component with description', async () => {
      expect(
        screen.getByText(PopoverComponent.args.ionPopoverBody)
      ).toBeInTheDocument();
    });

    it('should not render the header when the title is not informed', () => {
      PopoverComponent.args.ionPopoverTitle = '';
      fixture.detectChanges();
      expect(screen.queryByTestId('popover-header')).not.toBeInTheDocument();
    });
  });

  describe('with actions', () => {
    it.each(['action 1', 'action 2'])(
      'should render button with default text %s',
      async (textBtn: string) => {
        expect(screen.getByText(textBtn)).toBeInTheDocument();
      }
    );

    it.each(['popover-action-1', 'popover-action-2'])(
      'should render %s',
      async (btnId: string) => {
        expect(screen.getByTestId(btnId)).toBeInTheDocument();
      }
    );
  });

  describe('check the icons', () => {
    it('should render component with icon close', async () => {
      expect(screen.getByTestId('popover-icon-close')).toBeInTheDocument();
    });

    it('should render component with a given icon', async () => {
      expect(
        document.getElementById('ion-icon-condominium')
      ).toBeInTheDocument();
    });
  });

  describe('check the custom class', () => {
    it.each(['custom-1', 'custom-2', 'custom-3'])(
      'should render component with custom class %s',
      async (customClass: PopoverPosition) => {
        PopoverComponent.args.ionPopoverCustomClass = customClass;
        fixture.detectChanges();
        const element = screen.getByTestId('ion-popover');
        expect(element).toHaveClass(customClass);
      }
    );
  });
});
