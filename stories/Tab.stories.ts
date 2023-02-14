import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonBadgeComponent } from '../projects/ion/src/public-api';
import { IonIconComponent } from '../projects/ion/src/lib/icon/icon.component';
import { IonTabComponent } from '../projects/ion/src/lib/tab/tab.component';

export default {
  title: 'Ion/Navigation/Tab',
  component: IonTabComponent,
} as Meta;

const Template: Story<IonTabComponent> = (args: IonTabComponent) => ({
  component: IonTabComponent,
  props: args,
  moduleMetadata: {
    declarations: [IonTabComponent, IonIconComponent, IonBadgeComponent],
    imports: [CommonModule],
  },
});

export const Basic = Template.bind({});
Basic.args = {
  label: 'Custom label',
};

export const TabSmall = Template.bind({});
TabSmall.args = {
  label: 'Small',
  tabSize: 'sm',
};

export const TabMedium = Template.bind({});
TabMedium.args = {
  label: 'Medium',
  tabSize: 'md',
};

export const TabLarge = Template.bind({});
TabLarge.args = {
  label: 'Large',
  tabSize: 'lg',
};

export const TabBottom = Template.bind({});
TabBottom.args = {
  label: 'Bottom',
  direction: 'bottom',
};

export const TabTop = Template.bind({});
TabTop.args = {
  label: 'Top',
  direction: 'top',
};

export const TabRight = Template.bind({});
TabRight.args = {
  label: 'Right',
  direction: 'right',
};

export const TabLeft = Template.bind({});
TabLeft.args = {
  label: 'Left',
  direction: 'left',
};

export const Disabled = Template.bind({});
Disabled.args = {
  label: 'Disabled',
  disabled: true,
};

export const Selected = Template.bind({});
Selected.args = {
  label: 'Selected',
  selected: true,
};

export const Icon = Template.bind({});
Icon.args = {
  label: 'Icon',
  iconType: 'pencil',
};

export const WithBadge = Template.bind({});
WithBadge.args = {
  label: 'Icon',
  iconType: 'pencil',
  badge: {
    value: 10,
  },
};
