import { Meta, Story } from '@storybook/angular';
import { IonSkeletonComponent } from '../projects/ion/src/lib/skeleton/skeleton.component';

export default {
  title: 'Ion/Feedback/Skeleton',
  component: IonSkeletonComponent,
} as Meta;

const Template: Story<IonSkeletonComponent> = (args: IonSkeletonComponent) => ({
  component: IonSkeletonComponent,
  props: args,
});

export const Rectangular = Template.bind({});
Rectangular.args = {
  variant: 'rect',
  width: 100,
} as IonSkeletonComponent;

export const Circular = Template.bind({});
Circular.args = {
  variant: 'circular',
} as IonSkeletonComponent;

export const withCustomRadius = Template.bind({});
withCustomRadius.args = {
  variant: 'rect',
  width: 100,
  radius: 12,
} as IonSkeletonComponent;
