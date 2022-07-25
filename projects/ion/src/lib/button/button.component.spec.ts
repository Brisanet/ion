/* eslint-disable @typescript-eslint/no-explicit-any */
import { fireEvent, render, screen } from '@testing-library/angular';
import { ButtonComponent } from './button.component';

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

describe('Primary ButtonComponent', () => {
  it('should render a button with the ion-btn-primary class when type="primary" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { label: 'primary', type: 'primary' },
    });
    const button = screen.findByRole('button');
    expect(await button).toHaveClass('ion-btn-primary');
  });
});

describe('secondary ButtonComponent', () => {
  it('should render a button with the ion-btn-secondary class when type="secondary" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { type: 'secondary' },
    });
    const button = screen.findByRole('button');
    expect(await button).toHaveClass('ion-btn-secondary');
  });
});

describe('Ghost ButtonComponent', () => {
  it('should render a button with the ion-btn-ghost class when type="ghost" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { type: 'ghost' },
    });
    const button = screen.findByRole('button');
    expect(await button).toHaveClass('ion-btn-ghost');
  });
});

describe('Dashed ButtonComponent', () => {
  it('should render a button with the ion-btn-dashed class when type="dashed" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { type: 'dashed' },
    });
    const button = screen.findByRole('button');
    expect(await button).toHaveClass('ion-btn-dashed');
  });
});

describe('Small ButtonComponent', () => {
  it('should render a button with the ion-btn-sm class when size="sm" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { size: 'sm' },
    });
    const button = screen.findByRole('button');
    expect(await button).toHaveClass('ion-btn-sm');
  });
});

describe('Medium ButtonComponent', () => {
  it('should render a button with the ion-btn-md class when size="md" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { size: 'md' },
    });
    const button = screen.findByRole('button');
    expect(await button).toHaveClass('ion-btn-md');
  });
});

describe('Large ButtonComponent', () => {
  it('should render a button with the ion-btn-lg class when size="lg" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { size: 'lg' },
    });
    const button = screen.findByRole('button');
    expect(await button).toHaveClass('ion-btn-lg');
  });
});

describe('Extra-large ButtonComponent', () => {
  it('should render a button with the ion-btn-xl class when size="xl" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { size: 'xl' },
    });
    const button = screen.findByRole('button');
    expect(await button).toHaveClass('ion-btn-xl');
  });
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
