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
  width: 400,
  height: 100,
} as IonSkeletonComponent;

export const Circular = Template.bind({});
Circular.args = {
  variant: 'circular',
  height: 100,
  width: 100,
} as IonSkeletonComponent;

export const withCustomRadius = Template.bind({});
withCustomRadius.args = {
  variant: 'rect',
  width: 400,
  radius: 12,
} as IonSkeletonComponent;

export const RectangularWithPercentage: Story<IonSkeletonComponent> = () => ({
  component: IonSkeletonComponent,
  template: `
    <div style="width: 500px; height: 200px;">
      <ion-skeleton width="100%" height="100%"></ion-skeleton>
    </div>
  `,
});
