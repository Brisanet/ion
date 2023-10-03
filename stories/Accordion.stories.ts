import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonIconModule } from '../projects/ion/src/lib/icon/icon.module';
import { IonTooltipModule } from '../projects/ion/src/lib/tooltip/tooltip.module';
import { IonAccordionComponent } from '../projects/ion/src/lib/accordion/accordion.component';
import { IonAccordionModule } from '../projects/ion/src/lib/accordion/accordion.module';

export default {
  title: 'Ion/Data Display/Accordion',
  component: IonAccordionComponent,
} as Meta;

const TemplateAccordionMainContent: Story = (args) => ({
  props: args,
  template: `<ion-accordion [name]="name"><p style="margin:0">The main code should go here</p></ion-accordion>`,
  moduleMetadata: {
    imports: [CommonModule, IonIconModule, IonAccordionModule],
  },
});

export const accordion = TemplateAccordionMainContent.bind({});
accordion.name = 'Accordion name example';

const TemplateAccordionCustomHeader: Story = (args) => ({
  props: args,
  template: `
    <ion-accordion 
      [templateHeader]="customHeader" 
      color="burlywood"
    >
      <p>Uma terminação de linha óptica, também chamada de terminal de linha óptica, é um dispositivo que serve como ponto final do provedor de serviços de uma rede óptica passiva. </p>
    </ion-accordion>
    
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
    imports: [
      CommonModule,
      IonIconModule,
      IonAccordionModule,
      IonTooltipModule,
    ],
  },
});

export const AccordionCustomHeader = TemplateAccordionCustomHeader.bind({});
