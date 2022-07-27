/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/angular';
import { ButtonComponent, IonButtonProps } from './button.component';
import { IonIconComponent } from '../icon/icon.component';

const defaultName = 'button';

const sut = async (
  customProps: IonButtonProps = { label: defaultName }
): Promise<HTMLElement> => {
  await render(ButtonComponent, {
    componentProperties: customProps,
    declarations: [IonIconComponent],
  });
  return screen.findByRole('button');
};

describe('ButtonComponent', () => {
  it('should render button with custom label', async () => {
    const button = await sut({ label: 'Clique aqui' });
    expect(button.textContent).toContain('Clique aqui');
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
  it('should render a loading button when loading="true" is passed', async () => {
    const button = await sut({ label: defaultName, loading: true });
    expect(button).toHaveClass('loading');
    expect(button.children[0]).toHaveClass('spinner');
    expect(button.children[1].textContent).toContain('Carregando...');
  });
});
