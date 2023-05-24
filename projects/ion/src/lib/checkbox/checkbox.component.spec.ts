import { fireEvent, render, screen } from '@testing-library/angular';
import { SafeAny } from './../utils/safe-any';
import { IonCheckboxComponent } from './checkbox.component';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { CheckBoxProps, CheckBoxStates } from '../core/types/checkbox';

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
  await render(IonCheckboxComponent, {
    componentProperties: customProps,
  });
};

describe('CheckboxComponent', () => {
  describe('component basics', () => {
    const checkEvent = jest.fn();

    beforeEach(async () => {
      await sut({
        label: 'Custom label',
        value: 'checkbox value',
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

    it('should have the attribute name defined with "value" value', async () => {
      expect(screen.getByTestId(boxId)).toHaveAttribute(
        'name',
        'checkbox value'
      );
    });

    it('should not call event when render', async () => {
      expect(checkEvent).not.toHaveBeenCalled();
    });

    it('should call event when check', async () => {
      expect(checkEvent).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(boxId));
      expect(checkEvent).toHaveBeenCalledWith({
        state: 'checked',
        value: 'checkbox value',
      });
    });

    afterEach(() => {
      checkEvent.mockClear();
    });
  });

  describe('Without value property set', () => {
    const checkEvent = jest.fn();

    beforeEach(async () => {
      await sut({
        label: 'Custom label',
        ionClick: {
          emit: checkEvent,
        } as SafeAny,
      });
    });

    it('should have the attribute name defined but without value', async () => {
      expect(screen.getByTestId(boxId)).toHaveAttribute('name', '');
    });

    it('should call event when check', async () => {
      expect(checkEvent).not.toHaveBeenCalled();
      fireEvent.click(screen.getByTestId(boxId));
      expect(checkEvent).toHaveBeenCalledWith({
        state: 'checked',
      });
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
    await sut({ label: labelText, value: labelText });
    const element = screen.getByLabelText(labelText);
    fireEvent.click(element);
    expect(element).toBeChecked();
  });
});

@Component({
  template: `
    <ion-checkbox
      [label]="'Checkbox'"
      [state]="state"
      [disabled]="disabled"
      (ionClick)="changedState($event)"
    ></ion-checkbox>
  `,
})
class CheckboxHostComponent {
  state: CheckBoxStates = 'enabled';
  disabled = false;
  changedState = (event: string): string => {
    return event;
  };
}
describe('Checkbox controlled by a parent component', () => {
  let fixture;
  let checkboxHost;
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CheckboxHostComponent, IonCheckboxComponent],
    });
    fixture = TestBed.createComponent(CheckboxHostComponent);
    checkboxHost = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should render checkbox in default state', () => {
    expect(screen.getByTestId('ion-checkbox')).not.toBeChecked();
    expect(checkboxHost.state).toBe('enabled');
  });
  it('should not emit event when render checkbox for the first time', () => {
    jest.spyOn(checkboxHost, 'changedState');
    expect(checkboxHost.changedState).not.toHaveBeenCalled();
  });
  it('should emit event when checkbox is clicked', () => {
    jest.spyOn(checkboxHost, 'changedState');
    fireEvent(screen.getByTestId('ion-checkbox'), new Event('click'));
    expect(checkboxHost.changedState).toHaveBeenCalledWith({
      state: 'checked',
    });
  });
  it('should emit event when changing state directly on host component', () => {
    jest.spyOn(checkboxHost, 'changedState');
    checkboxHost.state = 'checked';
    fixture.detectChanges();
    expect(checkboxHost.changedState).toHaveBeenCalledWith({
      state: 'checked',
    });
  });
  it('should emit event when changing state to indeterminate directly on host component', () => {
    jest.spyOn(checkboxHost, 'changedState');
    checkboxHost.state = 'indeterminate';
    fixture.detectChanges();
    expect(checkboxHost.changedState).toHaveBeenCalledWith({
      state: 'indeterminate',
    });
  });
  it('should disable checkbox when changing disable input on host component', () => {
    checkboxHost.disabled = true;
    fixture.detectChanges();
    expect(screen.getByTestId('ion-checkbox')).toBeDisabled();
  });
});
