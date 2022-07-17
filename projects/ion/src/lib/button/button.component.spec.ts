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

  it('should render primary button', async () => {
    await render(ButtonComponent);
    const button = screen.findByRole('button');
    const hasPrimaryClass = (await button).classList.contains('primary');
    expect(hasPrimaryClass).toBeTruthy();
  });

  it('should render danger button', async () => {
    await render(ButtonComponent, {
      componentProperties: {
        type: 'danger',
      },
    });
    const button = screen.findByRole('button');
    const hasDangerClass = (await button).classList.contains('danger');
    expect(hasDangerClass).toBeTruthy();
  });
});
