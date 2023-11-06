import { CommonModule } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { fireEvent, render, screen } from '@testing-library/angular';
import userEvent from '@testing-library/user-event';
import { RadioOptions } from '../core/types/radio-group';
import { IonRadioGroupComponent } from './radio-group.component';
import { IonRadioGroupModule } from './radio-group.module';

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
    expect(spyEmit).toHaveBeenCalledWith({
      label: options[0].label,
      value: options[0].value,
      groupName: radioGroupName,
    });
  });
  it('should render option disabled', () => {
    rerender({ options: [{ ...options[0], disabled: true }] });
    expect(document.getElementById(`${radioGroupName}-radio-0`)).toBeDisabled();
  });
});

@Component({
  template: `
    <section style="display: flex; gap: 16px; flex-direction: column">
      <div>
        <h3>Please select your preferred contact method:</h3>
        <ion-radio-group
          [name]="contactMethod.name"
          [options]="contactMethod.options"
        ></ion-radio-group>
      </div>

      <div>
        <h3>Please select your favorite Web language:</h3>
        <ion-radio-group
          [name]="languages.name"
          [options]="languages.options"
        ></ion-radio-group>
      </div>
    </section>
  `,
})
class RadioGroupTestComponent {
  contactMethod = {
    name: 'contact-mathod',
    options: [
      {
        label: 'Email',
        value: 'email',
      },
      {
        label: 'Phone',
        value: 'phone',
      },
      {
        label: 'Mail',
        value: 'mail',
      },
    ],
  };
  languages = {
    name: 'language',
    options: [
      {
        label: 'HTML',
        value: 'html',
      },
      {
        label: 'CSS',
        value: 'css',
      },
      {
        label: 'Javascript',
        value: 'javascript',
      },
    ],
  };
}

@NgModule({
  declarations: [RadioGroupTestComponent],
  imports: [CommonModule, IonRadioGroupModule],
})
class RadioGroupTestModule {}

describe('IonRadioGroup - selecting an option when there are several ion-radio-group', () => {
  let component: RadioGroupTestComponent;
  let fixture: ComponentFixture<RadioGroupTestComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [RadioGroupTestModule],
    }).compileComponents();
    fixture = TestBed.createComponent(RadioGroupTestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(async () => {
    fixture.destroy();
  });

  it('should select the option by clicking on the HTML text and should not select any other option', () => {
    const languageOptions = [
      document.getElementById(`${component.languages.name}-radio-0`),
      document.getElementById(`${component.languages.name}-radio-1`),
      document.getElementById(`${component.languages.name}-radio-2`),
    ];

    const contactMethodOptions = [
      document.getElementById(`${component.contactMethod.name}-radio-0`),
      document.getElementById(`${component.contactMethod.name}-radio-1`),
      document.getElementById(`${component.contactMethod.name}-radio-2`),
    ];

    const optionToSelect = languageOptions[0];
    const htmlOption = screen.getByLabelText(
      component.languages.options[0].label
    );
    fireEvent.click(htmlOption);
    expect(optionToSelect).toBeChecked();

    languageOptions.slice(1).forEach((option) => {
      expect(option).not.toBeChecked();
    });

    contactMethodOptions.forEach((option) => {
      expect(option).not.toBeChecked();
    });
  });
});
