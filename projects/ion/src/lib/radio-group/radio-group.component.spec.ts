import { render, screen } from '@testing-library/angular';
import { IonRadioGroupComponent } from './radio-group.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import userEvent from '@testing-library/user-event';
import { ComponentFixture } from '@angular/core/testing';
import { RadioOptions } from '../core/types/radio-group';

const radioGroupName = 'group';
const radioGroupValue = '';
const options: RadioOptions[] = [
  {
    label: 'Option 1',
    value: 1,
  },
  {
    label: 'Option 2',
    value: 2,
  },
  {
    label: 'Option 3',
    value: '3',
  },
];

let rerender: (componentProperties: Partial<IonRadioGroupComponent>) => void;
let fixture: ComponentFixture<IonRadioGroupComponent>;

const sut = async (
  props: Partial<IonRadioGroupComponent> = {}
): Promise<void> => {
  const rendered = await render(IonRadioGroupComponent, {
    componentProperties: { ...props },
    declarations: [IonRadioGroupComponent],
    imports: [CommonModule, FormsModule],
  });
  rerender = rendered.rerender;
  fixture = rendered.fixture;
};

describe('IonRadioGroup', () => {
  beforeEach(async () => {
    await sut({ options, name: radioGroupName, value: radioGroupValue });
  });
  it('should render a radio group', () => {
    expect(screen.getByTestId('ion-radio-group')).toBeInTheDocument();
  });
  describe.each(
    options.map((option, index) => {
      return {
        ...option,
        index,
      };
    })
  )('radio option $index', ({ label, value, index }) => {
    let radio: HTMLElement;
    beforeEach(() => {
      radio = document.getElementById(`${radioGroupName}-radio-${index}`);
    });
    it(`should render a radio with id as ${radioGroupName}-radio-${index}`, () => {
      expect(radio).toBeInTheDocument();
    });
    it(`should render a radio with label ${label}`, () => {
      expect(screen.getByLabelText(label)).toBeInTheDocument();
    });
    it(`should render ${radioGroupName}-radio-${index} with radio group name`, () => {
      expect(radio).toHaveAttribute('name', radioGroupName);
    });
    it(`should render ${radioGroupName}-radio-${index} with value '${value}'`, () => {
      expect(radio).toHaveAttribute('value', value.toString());
    });
    it('should be unchecked by default', () => {
      expect(radio).not.toBeChecked();
    });
    it('should be checked when clicked', () => {
      userEvent.click(radio);
      expect(radio).toBeChecked();
    });
  });
  it('only one radio in the group should be checked', () => {
    const firstOption = document.getElementById(`${radioGroupName}-radio-0`);
    const secondOption = document.getElementById(`${radioGroupName}-radio-1`);

    userEvent.click(firstOption);
    expect(firstOption).toBeChecked();
    expect(secondOption).not.toBeChecked();

    userEvent.click(secondOption);
    expect(firstOption).not.toBeChecked();
    expect(secondOption).toBeChecked();
  });
  it('should change value', () => {
    const spyEmit = jest.spyOn(fixture.componentInstance.valueChange, 'emit');
    const firstOption = document.getElementById(`${radioGroupName}-radio-0`);

    userEvent.click(firstOption);
    expect(spyEmit).toHaveBeenCalled();
    expect(spyEmit).toHaveBeenCalledWith(options[0].value);
  });
  it('should render option disabled', () => {
    rerender({ options: [{ ...options[0], disabled: true }] });
    expect(document.getElementById(`${radioGroupName}-radio-0`)).toBeDisabled();
  });
});
