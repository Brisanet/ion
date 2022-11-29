import { fireEvent, render, screen } from '@testing-library/angular';
import { SafeAny } from './../utils/safe-any';
import { CheckboxComponent, CheckBoxProps } from './checkbox.component';

const boxId = 'ion-checkbox';

const boxStates = {
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

describe('CheckboxComponent', () => {
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
      expect(screen.getByTestId(boxId)).toBeInTheDocument();
    });
    it('should render enabled checkbox', async () => {
      expect(screen.getByTestId(boxId)).toHaveProperty('enabled', true);
    });
    it('should render unchecked element', async () => {
      expect(screen.getByTestId(boxId)).not.toBeChecked();
    });
    it('should check when clicked', async () => {
      const element = screen.getByTestId(boxId);
      fireEvent.click(element);
      expect(element).toBeChecked();
    });

    it('should have the attribute name defined with label value', async () => {
      expect(screen.getByTestId(boxId)).toHaveAttribute('name', 'Custom label');
    });

    it('should not call event when render', async () => {
      expect(checkEvent).not.toHaveBeenCalled();
    });

    it('should call event when check', async () => {
      expect(checkEvent).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(boxId));
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
    expect(screen.getByTestId(boxId)).toHaveProperty('indeterminate', true);
  });
  it('should render disabled checkbox', async () => {
    await sut({ disabled: true });
    expect(screen.getByTestId(boxId)).toBeDisabled();
  });
  it.each(['enabled', 'checked', 'indeterminate'])(
    `should render %s disabled`,
    async (state) => {
      await sut({ ...boxStates[state], disabled: true });
      expect(screen.getByTestId(boxId)).toBeDisabled();
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
    const element = screen.getByTestId(boxId);
    fireEvent.click(element);
    expect(clickEvent).not.toHaveBeenCalledWith({ state: 'disabled' });
  });
  it('should become unchecked when checked checkbox is clicked', async () => {
    await sut({ state: 'checked' });
    const element = screen.getByTestId(boxId);
    fireEvent.click(element);
    expect(element).not.toBeChecked();
  });
  it('should become enabled when indeterminate checkbox is clicked', async () => {
    await sut({ state: 'indeterminate' });
    const element = screen.getByTestId(boxId);
    fireEvent.click(element);
    expect(element).not.toBeChecked();
  });

  it.each(['checked', 'indeterminate'])(
    'should change checkbox state when state is changed to %s',
    async (state) => {
      await sut();
      const element = screen.getByTestId(boxId);
      fireEvent.change(element, { target: { state } });
      expect(element).toHaveProperty('state', state);
    }
  );
  it.each(['enabled', 'checked'])(
    'should emit right event when %s is clicked',
    async (state) => {
      const clickEvent = jest.fn();
      await sut({
        ...boxStates[state],
        ionClick: {
          emit: clickEvent,
        } as SafeAny,
      });
      const element = screen.getByTestId(boxId);
      fireEvent.click(element);
      expect(clickEvent).toHaveBeenLastCalledWith(StateEvents[state]);
    }
  );
  it('should emit a event in every click', async () => {
    const clickEvent = jest.fn();
    await sut({
      state: 'enabled',
      ionClick: {
        emit: clickEvent,
      } as SafeAny,
    });
    const amount = 5;
    const element = screen.getByTestId(boxId);

    for (let i = 0; i < amount; i++) {
      fireEvent.click(element);
    }

    expect(clickEvent).toHaveBeenCalledTimes(amount);
  });
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
