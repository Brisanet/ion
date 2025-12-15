import { render, screen, fireEvent } from '@testing-library/angular';
import { IonInputAreaComponent } from './input-area.component';
import { FormsModule } from '@angular/forms';

describe('IonInputAreaComponent', () => {
  it('should render input area', async () => {
    await render(IonInputAreaComponent);
    expect(screen.getByTestId('input-area')).toBeTruthy();
  });

  it('should render with custom cols and rows', async () => {
    await render(IonInputAreaComponent, {
      componentInputs: {
        cols: '20',
        rows: '3',
      },
    });
    const textarea = screen.getByTestId('input-area');
    expect(textarea.getAttribute('cols')).toBe('20');
    expect(textarea.getAttribute('rows')).toBe('3');
  });

  it('should render disabled input area', async () => {
    await render(IonInputAreaComponent, {
      componentInputs: {
        disabled: true,
      },
    });
    const textarea = screen.getByTestId('input-area');
    expect(textarea).toBeDisabled();
    expect(textarea).toHaveClass('disabled');
  });

  it('should render with placeholder', async () => {
    const placeholder = 'Type here...';
    await render(IonInputAreaComponent, {
      componentInputs: {
        placeholder,
      },
    });
    expect(screen.getByPlaceholderText(placeholder)).toBeTruthy();
  });

  it('should emit value change', async () => {
    const { fixture } = await render(IonInputAreaComponent, {
      imports: [FormsModule],
    });
    const component = fixture.componentInstance;
    let emittedValue: string | undefined;
    component.valueChange.subscribe((val) => (emittedValue = val));

    const textarea = screen.getByTestId('input-area');
    const newValue = 'New Value';
    fireEvent.input(textarea, { target: { value: newValue } });
    expect(emittedValue).toBe(newValue);
  });

  it('should initialize with value', async () => {
    const value = 'Initial Value';
    await render(IonInputAreaComponent, {
      componentInputs: {
        value,
      },
      imports: [FormsModule],
    });
    const textarea = screen.getByTestId('input-area') as HTMLTextAreaElement;
    expect(textarea.value).toBe(value);
  });
});
