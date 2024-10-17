import { Meta, StoryObj } from '@storybook/angular/types-6-0';
import { moduleMetadata } from '@storybook/angular';
import { IonInputCounterComponent } from '../projects/ion/src/lib/input-counter/input-counter.component';
import { FormsModule } from '@angular/forms';
import { IonButtonModule } from '../projects/ion/src/lib/button/button.module';
import { InputCountSize } from 'ion/public-api';
import { CommonModule } from '@angular/common';

export default {
  title: 'Ion/Data Entry/Input-Counter',
  component: IonInputCounterComponent,
  argTypes: {
    inputSize: {
      options: ['sm', 'md'] as InputCountSize[],
      control: { type: 'radio' },
    },
  },
  decorators: [
    moduleMetadata({
      imports: [FormsModule, IonButtonModule, CommonModule],
      declarations: [],
    }),
  ],
} as Meta<IonInputCounterComponent>;

type Story = StoryObj<IonInputCounterComponent>;

export const Medium: Story = {
  args: {},
};

export const Small: Story = {
  args: {
    inputSize: 'sm',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const WithMaxAndMinValues: Story = {
  name: 'With max and min values',
  args: {
    maxValue: 100,
    minValue: 1,
  },
};
