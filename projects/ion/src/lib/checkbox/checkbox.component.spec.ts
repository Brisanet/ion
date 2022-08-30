/* eslint-disable @typescript-eslint/no-explicit-any */
import { render, screen, fireEvent } from '@testing-library/angular';
import { CheckboxComponent, CheckBoxProps } from './checkbox.component';

const box_id = 'ion-checkbox';

const box_classes = {
  enabled: 'ion-checkbox',
  indeterminate: 'ion-indeterminate',
};

const box_states = {
  checked: { checked: true },
  indeterminate: { indeterminate: true },
};

const sut = async (customProps: CheckBoxProps = {}) => {
  await render(CheckboxComponent, {
    componentProperties: customProps,
  });
};

describe('CehckBoxComponent', () => {
  describe('component basics', () => {
    beforeEach(async () => {
      await sut();
    });

    it('should render checkbox', async () => {
      expect(screen.getByTestId(box_id)).toBeInTheDocument();
    });

    it('should render enabled checkbox', async () => {
      expect(screen.getByTestId(box_id)).toHaveClass(box_classes.enabled);
    });

    it('should render unchecked element', async () => {
      expect(screen.getByTestId(box_id)).not.toBeChecked();
    });

    it('should check when clicked', async () => {
      const element = screen.getByTestId(box_id);
      fireEvent.click(element);
      expect(element).toBeChecked();
    });
  });

  it('should render indeterminate checkbox', async () => {
    await sut({ indeterminate: true });
    expect(screen.getByTestId(box_id)).toHaveClass(box_classes.indeterminate);
  });

  it('should check indeterminate box when clicked', async () => {
    await sut({ indeterminate: true });
    const element = screen.getByTestId(box_id);
    fireEvent.click(element);
    expect(element).toBeChecked();
    expect(element).toHaveProperty('indeterminate', false);
  });

  it('should emit event when clicked', async () => {
    const clickEvent = jest.fn();
    await sut({
      ionClick: {
        emit: clickEvent,
      } as any,
    });
    const element = screen.getByTestId(box_id);
    fireEvent.click(element);
    expect(clickEvent).toHaveBeenCalled();
  });

  it('should render disabled checkbox', async () => {
    await sut({ disabled: true });
    expect(screen.getByTestId(box_id)).toBeDisabled();
  });

  it.each(['checked', 'indeterminate'])(
    `should render %s disabled`,
    async (state) => {
      await sut({ ...box_states[state], disabled: true });
      expect(screen.getByTestId(box_id)).toBeDisabled();
    }
  );

  it('should not amit event when disabled', async () => {
    const clickEvent = jest.fn();
    await sut({
      disabled: true,
      ionClick: {
        emit: clickEvent,
      } as any,
    });
    const element = screen.getByTestId(box_id);
    fireEvent.click(element);
    expect(clickEvent).not.toHaveBeenCalled();
  });

  it('should pass from checked to enabled when clicked', async () => {
    await sut({ checked: true });
    const element = screen.getByTestId(box_id);
    fireEvent.click(element);
    expect(element).not.toBeChecked();
  });
});
