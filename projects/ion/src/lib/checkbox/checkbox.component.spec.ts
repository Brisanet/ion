import { SafeAny } from './../utils/safe-any';
import { render, screen, fireEvent } from '@testing-library/angular';
import { CheckboxComponent, CheckBoxProps } from './checkbox.component';

const box_id = 'ion-checkbox';

const box_classes = {
  enabled: 'ion-checkbox',
  indeterminate: 'ion-indeterminate',
};

const box_states = {
  enabled: {},
  checked: { checked: true },
  indeterminate: { indeterminate: true },
};

const StateEvents = {
  enabled: { state: 'checked' },
  checked: { state: 'unchecked' },
  indeterminate: { state: 'indeterminate' },
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
    expect(screen.getByTestId(box_id)).toHaveProperty('indeterminate', true);
  });

  it('should check indeterminate box when clicked', async () => {
    await sut({ indeterminate: true });
    const element = screen.getByTestId(box_id);
    fireEvent.click(element);
    expect(element).not.toBeChecked();
  });

  it('should render disabled checkbox', async () => {
    await sut({ disabled: true });
    expect(screen.getByTestId(box_id)).toBeDisabled();
  });

  it.each(['enabled', 'checked', 'indeterminate'])(
    `should render %s disabled`,
    async (state) => {
      await sut({ ...box_states[state], disabled: true });
      expect(screen.getByTestId(box_id)).toBeDisabled();
    }
  );

  it('should not emit event when disabled', async () => {
    const clickEvent = jest.fn();
    await sut({
      disabled: true,
      ionClick: {
        emit: clickEvent,
      } as SafeAny,
    });
    const element = screen.getByTestId(box_id);
    fireEvent.click(element);
    expect(clickEvent).not.toHaveBeenCalled();
  });

  it('should become unchecked when checked checkbox is clicked', async () => {
    await sut({ checked: true });
    const element = screen.getByTestId(box_id);
    fireEvent.click(element);
    expect(element).not.toBeChecked();
  });

  it('should become enabled when indeterminate checkbox is clicked', async () => {
    await sut({ indeterminate: true });
    const element = screen.getByTestId(box_id);
    fireEvent.click(element);
    expect(element).not.toBeChecked();
  });

  it.each(['checked', 'indeterminate'])(
    'should change checkbox state when %s Input is changed',
    async (state) => {
      await sut();
      const element = screen.getByTestId(box_id);
      fireEvent.change(element, { target: { ...box_states[state] } });
      expect(element).toHaveProperty(state, true);
    }
  );

  it.each(['enabled', 'checked'])(
    'should emit right event when %s is clicked',
    async (state) => {
      const clickEvent = jest.fn();
      await sut({
        ...box_states[state],
        ionClick: {
          emit: clickEvent,
        } as SafeAny,
      });
      const element = screen.getByTestId(box_id);
      fireEvent.click(element);
      expect(clickEvent).toHaveBeenLastCalledWith(StateEvents[state]);
    }
  );

  it('should emit indeterminate event', async () => {
    const clickEvent = jest.fn();
    await sut({
      indeterminate: true,
      ionClick: {
        emit: clickEvent,
      } as SafeAny,
    });
    expect(clickEvent).toBeCalledWith(StateEvents.indeterminate);
  });
});
