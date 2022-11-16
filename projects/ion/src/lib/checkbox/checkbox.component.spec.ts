import { fireEvent, render, screen } from '@testing-library/angular';
import { SafeAny } from './../utils/safe-any';
import { CheckboxComponent, CheckBoxProps } from './checkbox.component';

const box_id = 'ion-checkbox';

const box_states = {
  enabled: { state: 'enabled' },
  checked: { state: 'checked' },
  indeterminate: { state: 'indeterminate' },
};

const StateEvents = {
  enabled: { state: 'checked' },
  checked: { state: 'unchecked' },
  indeterminate: { state: 'indeterminate' },
};

const sut = async (customProps: CheckBoxProps = {}): Promise<void> => {
  await render(CheckboxComponent, {
    componentProperties: customProps,
  });
};

describe('CehckBoxComponent', () => {
  describe('component basics', () => {
    const checkEvent = jest.fn();

    beforeEach(async () => {
      await sut({
        label: 'Custom label',
        ionClick: {
          emit: checkEvent,
        } as SafeAny,
      });
    });
    it('should render checkbox', async () => {
      expect(screen.getByTestId(box_id)).toBeInTheDocument();
    });
    it('should render enabled checkbox', async () => {
      expect(screen.getByTestId(box_id)).toHaveProperty('enabled', true);
    });
    it('should render unchecked element', async () => {
      expect(screen.getByTestId(box_id)).not.toBeChecked();
    });
    it('should check when clicked', async () => {
      const element = screen.getByTestId(box_id);
      fireEvent.click(element);
      expect(element).toBeChecked();
    });

    it('should have the attribute name defined with label value', async () => {
      expect(screen.getByTestId(box_id)).toHaveAttribute(
        'name',
        'Custom label'
      );
    });

    it('should not call event when render', async () => {
      expect(checkEvent).toHaveBeenCalledTimes(0);
    });

    it('should call event when check', async () => {
      fireEvent.click(screen.getByTestId(box_id));
      expect(checkEvent).toHaveBeenCalledWith({
        state: 'checked',
      });
    });

    afterEach(() => {
      checkEvent.mockClear();
    });
  });
  it('should render indeterminate checkbox', async () => {
    await sut({ state: 'indeterminate' });
    expect(screen.getByTestId(box_id)).toHaveProperty('indeterminate', true);
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
    expect(clickEvent).not.toHaveBeenCalledWith({ state: 'disabled' });
  });
  it('should become unchecked when checked checkbox is clicked', async () => {
    await sut({ state: 'checked' });
    const element = screen.getByTestId(box_id);
    fireEvent.click(element);
    expect(element).not.toBeChecked();
  });
  it('should become enabled when indeterminate checkbox is clicked', async () => {
    await sut({ state: 'indeterminate' });
    const element = screen.getByTestId(box_id);
    fireEvent.click(element);
    expect(element).not.toBeChecked();
  });

  it.each(['checked', 'indeterminate'])(
    'should change checkbox state when state is changed to %s',
    async (state) => {
      await sut();
      const element = screen.getByTestId(box_id);
      fireEvent.change(element, { target: { state: state } });
      expect(element).toHaveProperty('state', state);
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

  it('should input label', async () => {
    const labelText = 'Teste';
    await sut({ label: labelText });
    expect(screen.getAllByText(labelText)).toHaveLength(1);
  });
  it('should is marked when clicked input label', async () => {
    const labelText = 'Teste';
    await sut({ label: labelText });
    const element = screen.getByLabelText(labelText);
    fireEvent.click(element);
    expect(element).toBeChecked();
  });
});
