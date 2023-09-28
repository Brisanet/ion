import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonCollapseComponent } from '../projects/ion/src/lib/collapse/collapse.component';
import { IonIconModule } from '../projects/ion/src/lib/icon/icon.module';
import { IonCollapseModule } from '../projects/ion/src/lib/collapse/collapse.module';
import { IonTooltipModule } from '../projects/ion/src/lib/tooltip/tooltip.module';

export default {
  title: 'Ion/Data Display/Collapse',
  component: IonCollapseComponent,
} as Meta;

const Template: Story<IonCollapseComponent> = (args: IonCollapseComponent) => ({
  component: IonCollapseComponent,
  props: args,
  moduleMetadata: {
    imports: [CommonModule, IonIconModule],
  },
});

export const Collapse = Template.bind({});
Collapse.args = {
  name: 'Brisanet',
  color: '#deb887',
};

const TemplateCollapseCustomColor: Story = (args) => ({
  props: args,
  template: `<ion-collapse name="Collapse name example" color="burlywood"><p>The main code should go here</p></ion-collapse><ion-collapse name="Collapse name example" color="red"><p>The main code should go here</p></ion-collapse>`,
  moduleMetadata: {
    imports: [CommonModule, IonIconModule, IonCollapseModule],
  },
});

export const CollapseCustomCollor = TemplateCollapseCustomColor.bind({});

const TemplateCollapseMainContent: Story = (args) => ({
  props: args,
  template: `<ion-collapse name="Collapse name example" color="burlywood"><p>The main code should go here</p></ion-collapse>`,
  moduleMetadata: {
    imports: [CommonModule, IonIconModule, IonCollapseModule],
  },
});

export const CollapseMainContent = TemplateCollapseMainContent.bind({});

const TemplateCollapseCustomHeader: Story = (args) => ({
  props: args,
  template: `
    <ion-collapse  [templateHeader]="customHeader" color="burlywood" ><p>Uma terminação de linha óptica, também chamada de terminal de linha óptica, é um dispositivo que serve como ponto final do provedor de serviços de uma rede óptica passiva. </p></ion-collapse>
    
    <ng-template #customHeader>
      <div style="display:flex; align-items:center; gap: 8px;">
        <ion-icon type="olt"></ion-icon><b>OLT</b>
        <ion-icon 
          type="information" 
          [size]=14 
          color="#6868ff" 
          ionTooltip
          ionTooltipTitle="Terminação de Linha Óptica"
          ionTooltipPosition="topCenter"
          [ionTooltipArrowPointAtCenter]="true"
          ionTooltipColorScheme="dark"
          ionTooltipTrigger="hover"
          ionTooltipShowDelay="0"
        ></ion-icon>
      </div>
    </ng-template>
  `,
  moduleMetadata: {
    imports: [CommonModule, IonIconModule, IonCollapseModule, IonTooltipModule],
  },
});

export const CollapseTemplateHeader = TemplateCollapseCustomHeader.bind({
  dados: [{ icon: 'olt' }],
});
