import { fireEvent, render, screen } from '@testing-library/angular';
import { IonLinkComponent } from './ion-link.component';
import { FontSize, IconSide, IconType, LinkTarget } from '../core/types';
import { IonIconComponent } from '../icon/icon.component';

const sizes: FontSize[] = ['sm', 'md'];

const getLinkComponentRef = (): HTMLElement => {
  return screen.getByTestId('ion-link');
};

const sut = async (
  customProps: Partial<{
    label: string;
    icon: IconType;
    iconSide: IconSide;
    size: FontSize;
    bold: boolean;
    disabled: boolean;
    target: LinkTarget;
    link: string;
    ionOnClick: { emit: () => void };
  }> = {},
): Promise<void> => {
  await render(IonLinkComponent, {
    componentInputs: customProps,
    imports: [IonIconComponent],
  });
};

describe('IonLinkComponent', () => {
  const customLabel = 'custom label';

  it('should render the component', async () => {
    await sut();
    const linkComponent = getLinkComponentRef();
    expect(linkComponent).toBeVisible();
  });

  it('should render with the custom label informed', async () => {
    await sut({
      label: customLabel,
    });

    expect(screen.getByText(customLabel)).toBeVisible();
  });

  it('should not render the icon by default', async () => {
    await sut({
      label: customLabel,
    });

    expect(screen.queryByTestId('link-icon')).not.toBeInTheDocument();
  });

  it.each(sizes)('should render the %s size', async (size) => {
    await sut({
      label: customLabel,
      size: size,
    });

    expect(screen.getByTestId('ion-link-label')).toHaveClass(
      `ion-link__label--${size}`,
    );
  });

  it('should not render with the bold font by default', async () => {
    await sut({
      label: customLabel,
    });

    expect(screen.getByTestId('ion-link-label')).not.toHaveClass(
      'ion-link__label--bold',
    );
  });

  it.each(sizes)(
    'should render the %s size bold when informed',
    async (size) => {
      await sut({
        label: customLabel,
        size: size,
        bold: true,
      });

      expect(screen.getByTestId('ion-link-label')).toHaveClass(
        `ion-link__label--${size} ion-link__label--bold`,
      );
    },
  );

  it('should not be disabled by default', async () => {
    await sut({
      label: customLabel,
    });

    expect(screen.getByTestId('link-container')).not.toHaveClass(
      'link-container--disabled',
    );
  });

  it('should be disabled when informed', async () => {
    await sut({
      label: customLabel,
      disabled: true,
    });

    expect(screen.getByTestId('link-container')).toHaveClass(
      'link-container--disabled',
    );
  });

  describe('IonLinkComponent - Event Emittion', () => {
    const clickFn = jest.fn();

    afterEach(() => {
      clickFn.mockClear();
    });

    it('should emmit an event when clicked', async () => {
      const { fixture } = await render(IonLinkComponent, {
        componentInputs: {
          label: customLabel,
        },
        imports: [IonIconComponent],
      });

      fixture.componentInstance.ionOnClick.subscribe(clickFn);

      fireEvent.click(screen.getByTestId('ion-link'));

      expect(clickFn).toHaveBeenCalled();
    });

    it('should not emmit if the anchor is disabled', async () => {
      const { fixture } = await render(IonLinkComponent, {
        componentInputs: {
          label: customLabel,
          disabled: true,
        },
        imports: [IonIconComponent],
      });

      fixture.componentInstance.ionOnClick.subscribe(clickFn);

      fireEvent.click(screen.getByTestId('ion-link'));

      expect(clickFn).not.toHaveBeenCalled();
    });
  });

  describe('IonLinkComponent - With Icon', () => {
    it('should render the icon when informed', async () => {
      await sut({
        label: customLabel,
        icon: 'box',
      });

      expect(screen.queryByTestId('ion-link-icon')).toBeVisible();
    });

    it('should render only the icon when the label is not provided', async () => {
      await sut({
        icon: 'box',
      });

      expect(screen.queryByTestId('ion-link-label')).not.toBeInTheDocument();
    });

    it('should render the icon to the right by default', async () => {
      await sut({
        label: customLabel,
        icon: 'box',
      });

      const linkComponent = getLinkComponentRef();

      expect(linkComponent).toHaveClass('ion-link');
    });

    it('should render the icon to the left when informed', async () => {
      await sut({
        label: customLabel,
        icon: 'box',
        iconSide: 'left',
      });

      const linkComponent = getLinkComponentRef();

      expect(linkComponent).toHaveClass('ion-link ion-link--left-icon');
    });
  });
});
