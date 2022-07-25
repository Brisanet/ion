/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/angular';
import { ButtonComponent, Size, Type } from './button.component';

describe('ButtonComponent', () => {
  it('should render button with custom label', async () => {
    await render(ButtonComponent, {
      componentProperties: {
        label: 'Clique aqui',
      },
    });
    expect(screen.getByText('Clique aqui'));
  });

  it('should render button with warning msg when label is not provided', async () => {
    await render(ButtonComponent);
    expect(screen.getByText('configure uma label'));
  });

  it('should emit an event when clicked', async () => {
    const clickEvent = jest.fn();
    await render(ButtonComponent, {
      componentProperties: {
        label: 'Clique aqui',
        ionOnClick: {
          emit: clickEvent,
        } as any,
      },
    });
    const button = screen.getByText('Clique aqui');
    fireEvent.click(button);
    expect(clickEvent).toHaveBeenCalled();
  });
});

const types: Type[] = ['primary', 'secondary', 'ghost', 'dashed'];
it.each(types)('should render correct types', async (type) => {
  await render(ButtonComponent, {
    componentProperties: { type },
  });
  const button = screen.findByRole('button');
  expect(await button).toHaveClass(`ion-btn-${type}`);
});

const sizes: Size[] = ['lg', 'md', 'sm', 'xl'];
it.each(sizes)('should render correct sizes', async (size) => {
  await render(ButtonComponent, {
    componentProperties: { size },
  });
  const button = screen.findByRole('button');
  expect(await button).toHaveClass(`ion-btn-${size}`);
});

describe('Danger ButtonComponent', () => {
  it('should render a button with the danger class when danger="true" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { danger: true },
    });
    const button = screen.findByRole('button');
    expect(await button).toHaveClass('danger');
  });
});

describe('Disabled ButtonComponent', () => {
  it('should render a disabled button when disabled="true" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { label: 'Disabled', disabled: true },
    });
    const button = screen.findByRole('button');
    expect(await button).toHaveAttribute('disabled');
  });
});

describe('Expand ButtonComponent', () => {
  it('should render a expand button when expand="true" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { label: 'Expand', expand: true },
    });
    const button = screen.findByRole('button');
    expect((await button).style.width).toBe('100%');
  });
});

describe('load ButtonComponent', () => {
  it('should render a loading button when loading="true" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { label: 'Loading', loading: true },
    });
    const button = screen.findByRole('button');
    expect((await button).children[0].className).toBe('spinner');
    expect(screen.getByText('Carregando...'));
  });
});
