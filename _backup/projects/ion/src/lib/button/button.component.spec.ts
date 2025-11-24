import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { IonButtonProps } from '../core/types/button';
import { IonSharedModule } from '../shared.module';
import { SafeAny } from '../utils/safe-any';
import { IonButtonComponent } from './button.component';

const defaultName = 'button';

const sut = async (
  customProps: IonButtonProps = { label: defaultName }
): Promise<HTMLElement> => {
  await render(IonButtonComponent, {
    componentProperties: customProps,
    imports: [FormsModule, IonSharedModule],
    excludeComponentDeclaration: true,
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
      } as SafeAny,
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
      } as SafeAny,
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
      } as SafeAny,
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

  it('should find button by data-testid when dont have label', async () => {
    const myCustomId = '1234';
    await sut({ iconType: 'pencil', id: myCustomId });
    expect(screen.queryAllByTestId(`btn-${myCustomId}`)).toHaveLength(1);
  });

  it('should not render chevron options when button is circular and has dropdown', async () => {
    await sut({
      iconType: 'pencil',
      circularButton: true,
      options: [{ label: 'Option 1' }],
    });
    expect(document.getElementById('ion-icon-semi-down')).toBeNull();
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
  it('should render a loading button when loading="true" is passed and keep label', async () => {
    const button = await sut({ label: defaultName, loading: true });
    expect(button).toHaveClass('loading');
    expect(button.children[0]).toHaveClass('spinner');
    expect(button.children[1].textContent).toContain(defaultName);
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

  it('should not show loading message when button is not loading', async () => {
    const loadingMessage = "I'm loading";
    const button = await sut({
      label: defaultName,
      loading: false,
      loadingMessage,
    });
    expect(button).not.toHaveClass('loading');
    expect(button.children[0]).not.toHaveClass('spinner');
    expect(screen.queryByText(loadingMessage)).not.toBeInTheDocument();
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
      expect(
        screen.getByTestId('ion-dropdown').lastElementChild.childElementCount
      ).toEqual(options.length);
    });

    it('should render a single-selection dropdown that close when a option is clicked', async () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      const button = await sut({
        label: defaultName,
        options,
      });

      fireEvent.click(button);

      expect(screen.queryByTestId(options[0].label)).toBeNull();
    });

    it('should close the dropdown when the button is clicked', async () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      const button = await sut({
        label: defaultName,
        options,
      });

      fireEvent.click(button);
      fireEvent.click(button);

      expect(screen.queryByTestId('ion-dropdown')).toBeNull();
    });

    it('should has "above" class when dropdown is show and its configured to open above button', async () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      const button = await sut({
        label: defaultName,
        showDropdownAbove: true,
        options,
      });

      fireEvent.click(button);

      expect(document.querySelector('.above')).toBeInTheDocument();
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

    it('should return to original label when unselect the option selected', async () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      const button = await sut({
        label: defaultName,
        options,
      });

      const selectedOption = options[0].label;
      fireEvent.click(button);
      fireEvent.click(screen.getByText(selectedOption));
      fireEvent.click(screen.getByTestId(`btn-${selectedOption}`));
      fireEvent.click(document.getElementById('ion-icon-check'));

      expect(button).toHaveTextContent(defaultName);
    });

    it('should emit an event when search in dropdown', async () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];
      const searchEvent = jest.fn();

      const button = await sut({
        label: defaultName,
        options,
        dropdownConfig: {
          enableSearch: true,
        },
        handleDropdownSearch: {
          emit: searchEvent,
        } as SafeAny,
      });

      fireEvent.click(button);

      const typeText = 'search term';
      userEvent.type(screen.getByTestId('input-element'), typeText);
      expect(searchEvent).toHaveBeenLastCalledWith(typeText);
    });

    it('should not render the dropdown arrow when loading', async () => {
      const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

      await sut({
        label: defaultName,
        loading: true,
        options,
      });

      const arrowDownIcon = document.getElementById('ion-icon-semi-down');
      const arrowUpIcon = document.getElementById('ion-icon-semi-up');

      expect(arrowDownIcon).not.toBeInTheDocument();
      expect(arrowUpIcon).not.toBeInTheDocument();
    });
  });

  it('should close dropdown when click outside component', async () => {
    const options = [{ label: 'Option 1' }, { label: 'Option 2' }];

    const button = await sut({
      label: defaultName,
      options,
    });

    fireEvent.click(button);

    const fakeDiv = document.createElement('div');
    fakeDiv.setAttribute('data-testid', 'fake-div');
    document.body.appendChild(fakeDiv);

    fireEvent.click(fakeDiv);
    fireEvent.click(fakeDiv);

    expect(screen.queryByTestId('ion-dropdown')).toBeNull();
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
      expect(
        screen.getByTestId('ion-dropdown').lastElementChild.childElementCount
      ).toEqual(options.length);
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

    it('should not render an ion-badge when the dropdown is set to multiple but the button is circular', async () => {
      await sut({
        label: defaultName,
        multiple: true,
        circularButton: true,
        options: [{ label: 'Option 1' }, { label: 'Option 2' }],
      });

      expect(screen.queryByTestId('badge-multiple')).not.toBeInTheDocument();
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
      } as SafeAny,
    });

    fireEvent.click(button);
    fireEvent.click(await screen.findByText(options[0].label));

    expect(clickEvent).toHaveBeenCalled();
  });

  describe('should update badge value', () => {
    let options = [];
    let button;

    beforeEach(async () => {
      options = [
        { label: 'Option 1' },
        { label: 'Option 2' },
        { label: 'Option 3' },
      ];

      button = await sut({
        label: defaultName,
        multiple: true,
        options,
      });

      fireEvent.click(button);

      options.forEach(async (option) => {
        fireEvent.click(await screen.findByText(option.label));
      });
      expect(await screen.findByTestId('button-clear')).toBeInTheDocument();
    });

    it('should update the badge value when selecting an option', async () => {
      expect(await screen.findByTestId('badge-multiple')).toHaveTextContent(
        String(options.length)
      );
    });

    it('should update the badge value when button clear options is clicked', async () => {
      fireEvent.click(screen.getByTestId('btn-Limpar'));

      expect(await screen.findByTestId('badge-multiple')).toHaveTextContent(
        String(0)
      );
    });

    it('should update the badge value when option selected is clicked', async () => {
      options.forEach((option) => {
        fireEvent.click(screen.getByText(option.label));
      });
      expect(screen.getByTestId('badge-multiple')).toHaveTextContent('0');
    });
  });
});
