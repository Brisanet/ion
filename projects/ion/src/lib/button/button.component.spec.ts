import { render, screen } from '@testing-library/angular';
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
});

describe('Primary ButtonComponent', () => {
  it('should render a button with the ion-btn-primary class when type="primary" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { type: 'primary' },
    });
    const button = screen.findByRole('button');
    const hasClass = (await button).classList.contains(`ion-btn-primary`);
    expect(hasClass).toBeTruthy();
  });
});

describe('Secundary ButtonComponent', () => {
  it('should render a button with the ion-btn-secundary class when type="secundary" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { type: 'secundary' },
    });
    const button = screen.findByRole('button');
    const hasClass = (await button).classList.contains(`ion-btn-secundary`);
    expect(hasClass).toBeTruthy();
  });
});

describe('Ghost ButtonComponent', () => {
  it('should render a button with the ion-btn-ghost class when type="ghost" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { type: 'ghost' },
    });
    const button = screen.findByRole('button');
    const hasClass = (await button).classList.contains(`ion-btn-ghost`);
    expect(hasClass).toBeTruthy();
  });
});

describe('Dashed ButtonComponent', () => {
  it('should render a button with the ion-btn-dashed class when type="dashed" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { type: 'dashed' },
    });
    const button = screen.findByRole('button');
    const hasClass = (await button).classList.contains(`ion-btn-dashed`);
    expect(hasClass).toBeTruthy();
  });
});

describe('Small ButtonComponent', () => {
  it('should render a button with the ion-btn-sm class when size="sm" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { size: 'sm' },
    });
    const button = screen.findByRole('button');
    const hasClass = (await button).classList.contains(`ion-btn-sm`);
    expect(hasClass).toBeTruthy();
  });
});

describe('Medium ButtonComponent', () => {
  it('should render a button with the ion-btn-md class when size="md" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { size: 'md' },
    });
    const button = screen.findByRole('button');
    const hasClass = (await button).classList.contains(`ion-btn-md`);
    expect(hasClass).toBeTruthy();
  });
});

describe('Large ButtonComponent', () => {
  it('should render a button with the ion-btn-lg class when size="lg" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { size: 'lg' },
    });
    const button = screen.findByRole('button');
    const hasClass = (await button).classList.contains(`ion-btn-lg`);
    expect(hasClass).toBeTruthy();
  });
});

describe('Extra-large ButtonComponent', () => {
  it('should render a button with the ion-btn-xl class when size="xl" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { size: 'xl' },
    });
    const button = screen.findByRole('button');
    const hasClass = (await button).classList.contains(`ion-btn-xl`);
    expect(hasClass).toBeTruthy();
  });
});

describe('Danger ButtonComponent', () => {
  it('should render a button with the danger class when danger="true" is passed', async () => {
    await render(ButtonComponent, {
      componentProperties: { danger: 'true' },
    });
    const button = screen.findByRole('button');
    const hasClass = (await button).classList.contains(`danger`);
    expect(hasClass).toBeTruthy();
  });
});
