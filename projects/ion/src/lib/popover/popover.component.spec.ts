import { FormsModule } from '@angular/forms';
import { render, screen } from '@testing-library/angular';
import { BadgeComponent } from '../badge/badge.component';
import { ButtonComponent } from '../button/button.component';
import { IonDividerComponent } from '../divider/divider.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { IonIconComponent } from '../icon/icon.component';
import { InputComponent } from '../input/input.component';
import {
  PopoverArrow,
  PopoverComponent,
  PopoverProps,
} from './popover.component';

const defaultProps: PopoverProps = {
  ionPopoverTitle: 'Title',
  ionPopoverBody: 'Description',
};

const sut = async (props: PopoverProps = defaultProps): Promise<void> => {
  await render(PopoverComponent, {
    componentProperties: props,
    declarations: [
      IonDividerComponent,
      ButtonComponent,
      BadgeComponent,
      IonIconComponent,
      DropdownComponent,
      InputComponent,
      ButtonComponent,
    ],
    imports: [FormsModule],
  });
};

describe('PopoverComponent', () => {
  describe('Check default fields', () => {
    beforeEach(async () => {
      await sut();
    });

    it('should render component with message', async () => {
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
        ionPopoverIconClose: 'close',
      });
    });

    it('should render component with icon close', async () => {
      expect(screen.getByTestId('popover-icon-close')).toBeInTheDocument();
    });

    it('should render component with icon close', async () => {
      expect(
        document.getElementById('ion-icon-condominium')
      ).toBeInTheDocument();
    });
  });

  describe('check the arrows', () => {
    it.each(['arrow-1', 'arrow-3'])(
      'should render component with arrow $s',
      async (arrow: PopoverArrow) => {
        await sut({
          ...defaultProps,
          ionPopoverArrowPosition: arrow,
        });
        const element = screen.getByTestId('sup-container');
        expect(element).toHaveClass(`sup-container-${arrow}`);
      }
    );

    it.each(['arrow-6', 'arrow-8'])(
      'should render component with arrow in footer $s',
      async (arrow: PopoverArrow) => {
        await sut({
          ...defaultProps,
          ionPopoverArrowPosition: arrow,
        });
        const element = screen.getByTestId('sup-container');
        expect(element).toHaveClass(`sup-container-${arrow}`);
      }
    );

    describe('with arrow and actions', () => {
      it.each(['arrow-6', 'arrow-8'])(
        'should render component with arrow in footer $s',
        async (arrow: PopoverArrow) => {
          await sut({
            ...defaultProps,
            ionPopoverActions: [{ label: 'action 1' }, { label: 'action 2' }],
            ionPopoverArrowPosition: arrow,
          });
          const element = screen.getByTestId('sup-container');
          expect(element).toHaveClass(`sup-container-${arrow}`);
        }
      );
    });
  });
});
