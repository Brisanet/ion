import { IonSpinnerComponent } from '../projects/ion/src/lib/spinner/spinner.component';
import { Meta, Story } from '@storybook/angular/types-6-0';

export default {
  title: 'Ion/Feedback/Spinner',
  component: IonSpinnerComponent,
} as Meta;

const Template: Story<IonSpinnerComponent> = (args: IonSpinnerComponent) => ({
  component: IonSpinnerComponent,
  props: { ...args },
});

export const SpinnerPrimary = Template.bind({});

export const SpinnerSecondary = Template.bind({});
SpinnerSecondary.args = {
  color: 'secondary',
};

export const SpinnerDanger = Template.bind({});
SpinnerDanger.args = {
  color: 'danger',
};

export const SpinnerCustomColor = Template.bind({});
SpinnerCustomColor.args = {
  customColor: '#c05bff',
};

export const SpinnerWithText = Template.bind({});
SpinnerWithText.args = {
  size: 32,
  text: 'Carregando...',
  textSize: 'md',
};
