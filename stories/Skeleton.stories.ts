import { Meta, Story } from '@storybook/angular';
import { IonSkeletonComponent } from '../projects/ion/src/lib/skeleton/skeleton.component';

export default {
  title: 'Ion/Feedback/Skeleton',
  component: IonSkeletonComponent,
} as Meta;

const template: Story<IonSkeletonComponent> = (args: IonSkeletonComponent) => ({
  component: IonSkeletonComponent,
  props: args,
});

export const test = template.bind({});
test.args = {};
