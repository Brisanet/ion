import { FormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import { IonDividerComponent } from '../../divider/divider.component';
import { IonPopoverComponent, PopoverProps } from './popover.component';
import { PopoverPosition } from '../../core/types/popover';
import { IonSharedModule } from '../../shared.module';

const defaultProps: PopoverProps = {
  ionPopoverTitle: 'Title',
  ionPopoverBody: 'Description',
};

const sut = async (props: PopoverProps = defaultProps): Promise<void> => {
  await render(IonPopoverComponent, {
    componentProperties: props,
    declarations: [IonDividerComponent],
    imports: [FormsModule, IonSharedModule],
  });
};

describe('PopoverComponent', () => {
  describe('Check default fields', () => {
    beforeEach(async () => {
      await sut();
    });

    it('should render component with title', async () => {
      expect(
        screen.getByText(defaultProps.ionPopoverTitle)
      ).toBeInTheDocument();
    });

    it('should render component with description', async () => {
      expect(screen.getByText(defaultProps.ionPopoverBody)).toBeInTheDocument();
    });
  });

  describe('with actions', () => {
    beforeEach(async () => {
      await sut({
        ...defaultProps,
        ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
      });
    });

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
    beforeEach(async () => {
      await sut({
        ...defaultProps,
        ionPopoverIcon: 'condominium',
        ionPopoverIconClose: true,
      });
    });

    it('should render component with icon close', async () => {
      expect(screen.getByTestId('popover-icon-close')).toBeInTheDocument();
    });

    it('should render component with a given icon', async () => {
      expect(
        document.getElementById('ion-icon-condominium')
      ).toBeInTheDocument();
    });
  });

  describe('check the arrows', () => {
    it.each(['leftTop', 'topCenter', 'leftBottom', 'bottomCenter'])(
      'should render component with arrow $s',
      async (arrow: PopoverPosition) => {
        await sut({
          ...defaultProps,
          ionPopoverPosition: arrow,
        });
        const element = screen.getByTestId('ion-popover');
        expect(element).toHaveClass(`sup-container-${arrow}`);
      }
    );

    describe('with arrow and actions', () => {
      it.each(['leftBottom', 'bottomCenter'])(
        'should render component with arrow in footer $s',
        async (arrow: PopoverPosition) => {
          await sut({
            ...defaultProps,
            ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
            ionPopoverPosition: arrow,
          });
          const element = screen.getByTestId('ion-popover');
          expect(element).toHaveClass(`sup-container-${arrow}`);
        }
      );
    });
  });
});
