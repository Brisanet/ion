/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/angular';
import { ButtonComponent, IonButtonProps } from './button.component';
import { IonIconComponent } from '../icon/icon.component';
import { DropdownComponent } from '../dropdown/dropdown.component';
import { BadgeComponent } from './../badge/badge.component';

const defaultName = 'button';

const sut = async (
  customProps: IonButtonProps = { label: defaultName }
): Promise<HTMLElement> => {
  await render(ButtonComponent, {
    componentProperties: customProps,
    declarations: [IonIconComponent, DropdownComponent, BadgeComponent],
  });
  return screen.findByRole('button');
};

describe('ButtonComponent', () => {
  it('should render button with custom label', async () => {
    const textButton = 'Clique aqui';
    const button = await sut({ label: textButton });
    expect(button.textContent).toContain(textButton);
  });

  it('should emit an event when clicked', async () => {
    const clickEvent = jest.fn();
    const button = await sut({
      label: defaultName,
      ionOnClick: {
        emit: clickEvent,
      } as any,
    });
    fireEvent.click(button);
    expect(clickEvent).toHaveBeenCalled();
  });

  it('should not call event when is loading', async () => {
    const clickEvent = jest.fn();
    const button = await sut({
      label: defaultName,
      loading: true,
      ionOnClick: {
        emit: clickEvent,
      } as any,
    });
    fireEvent.click(button);
    expect(clickEvent).not.toHaveBeenCalled();
  });

  it('should not call event when is disabled', async () => {
    const clickEvent = jest.fn();
    const button = await sut({
      label: defaultName,
      disabled: true,
      ionOnClick: {
        emit: clickEvent,
      } as any,
    });
    fireEvent.click(button);
    expect(clickEvent).not.toHaveBeenCalled();
  });
});

const types: Array<IonButtonProps['type']> = [
  'primary',
  'secondary',
  'ghost',
  'dashed',
];

it.each(types)('should render correct types', async (type) => {
  expect(await sut({ label: 'button', type })).toHaveClass(`ion-btn-${type}`);
});

const sizes: Array<IonButtonProps['size']> = ['lg', 'md', 'sm', 'xl'];
it.each(sizes)('should render correct sizes', async (size) => {
  expect(await sut({ label: defaultName, size })).toHaveClass(
    `ion-btn-${size}`
  );
});

describe('Icon on ButtonComponent', () => {
  it('Icon pencil on button', async () => {
    const button = await sut({ iconType: 'pencil' });
    expect(button.querySelector('ion-icon')).toBeTruthy();
    expect(button.querySelector('ion-icon')).toHaveAttribute('ng-reflect-type');
    expect(
      button.querySelector('ion-icon').getAttribute('ng-reflect-type')
    ).toContain('pencil');
  });

  it('Right side icon', async () => {
    const button = await sut({ iconType: 'pencil', rightSideIcon: true });
    expect(button.querySelector('ion-icon')).toBeTruthy();
    expect(button).toHaveClass('right-side-icon');
  });

  it('Button with circular icon', async () => {
    const button = await sut({ iconType: 'pencil', circularButton: true });
    expect(button.querySelector('ion-icon')).toBeTruthy();
    expect(button).toHaveClass('circular-button');
  });
});

describe('Danger ButtonComponent', () => {
  it('should render a button with the danger class when danger="true" is passed', async () => {
    expect(await sut({ label: defaultName, danger: true })).toHaveClass(
      'danger'
    );
  });
});

describe('Disabled ButtonComponent', () => {
  it('should render a disabled button when disabled="true" is passed', async () => {
    expect(await sut({ label: defaultName, disabled: true })).toHaveAttribute(
      'disabled'
    );
  });
});

describe('Expand ButtonComponent', () => {
  it('should render a expand button when expand="true" is passed', async () => {
    expect((await sut({ label: defaultName, expand: true })).style.width).toBe(
      '100%'
    );
  });
});

describe('load ButtonComponent', () => {
  it('should render a loading button when loading="true" is passed and show default message "Carregando..."', async () => {
    const button = await sut({ label: defaultName, loading: true });
    expect(button).toHaveClass('loading');
    expect(button.children[0]).toHaveClass('spinner');
    expect(button.children[1].textContent).toContain('Carregando...');
  });

  it('should render a loading button with message "aguarde ..."', async () => {
    const loadingMessage = 'aguarde ...';
    const button = await sut({
      label: defaultName,
      loading: true,
      loadingMessage,
    });
    expect(button).toHaveClass('loading');
    expect(button.children[0]).toHaveClass('spinner');
    expect(button.children[1].textContent).toContain(loadingMessage);
  });
});

describe('ButtonComponent with dropdown', () => {
  describe('ButtonComponent with single selection dropdown', () => {
    it('should render a single-selection dropdown when button is clicked', async () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      const button = await sut({
        label: defaultName,
        options,
      });

      fireEvent.click(button);

      expect(screen.getByTestId('ion-dropdown')).toBeInTheDocument();
      expect(screen.getByTestId('ion-dropdown').childElementCount).toEqual(
        options.length
      );
    });

    it('should close the dropdown when the button is clicked "', async () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      const button = await sut({
        label: defaultName,
        options,
      });

      fireEvent.click(button);
      fireEvent.click(button);

      expect(screen.queryByTestId('ion-dropdown')).toBeNull();
    });

    it('should change label when an option is selected', async () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      const button = await sut({
        label: defaultName,
        options,
      });

      fireEvent.click(button);
      fireEvent.click(await screen.findByText(options[0].label));

      expect(button).toHaveTextContent(options[0].label);
    });
  });

  describe('ButtonComponent with multiple-selection dropdown', () => {
    it('should render a multiple-selection dropdown when button is clicked', async () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      const button = await sut({
        label: defaultName,
        options,
        multiple: true,
      });

      fireEvent.click(button);

      expect(screen.getByTestId('ion-dropdown')).toBeInTheDocument();
      expect(screen.getByTestId('ion-dropdown').childElementCount).toEqual(
        options.length
      );
    });

    it('should render an ion-badge when multiple is true', async () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      await sut({
        label: defaultName,
        multiple: true,
        options,
      });

      expect(screen.getByTestId('badge-multiple')).toBeInTheDocument();
      expect(screen.getByTestId('badge-multiple')).toHaveTextContent('0');
    });

    it('should update the badge value when selecting an option', async () => {
      const options = [
        { label: 'Option 1' },
        { label: 'Option 2' },
        { label: 'Option 3' },
      ];

      const button = await sut({
        label: defaultName,
        multiple: true,
        options,
      });

      fireEvent.click(button);

      options.forEach(async (option) => {
        fireEvent.click(await screen.findByText(option.label));
      });

      expect(await screen.findByTestId('badge-multiple')).toHaveTextContent(
        String(options.length)
      );
    });
  });

  it('should emit an event when option is selected', async () => {
    const options = [{ label: 'Option 1' }, { label: 'Option 2' }];
    const clickEvent = jest.fn();

    const button = await sut({
      label: defaultName,
      options,
      selected: {
        emit: clickEvent,
      } as any,
    });

    fireEvent.click(button);
    fireEvent.click(await screen.findByText(options[0].label));

    expect(clickEvent).toHaveBeenCalled();
  });
});
