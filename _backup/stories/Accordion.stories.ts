import { CommonModule } from '@angular/common';
import { Meta, Story } from '@storybook/angular/types-6-0';
import { IonIconModule } from '../projects/ion/src/lib/icon/icon.module';
import { IonAccordionComponent } from '../projects/ion/src/lib/accordion/accordion.component';
import { IonAccordionModule } from '../projects/ion/src/lib/accordion/accordion.module';

const accordions = [
  {
    name: 'Grupo 01: pastores e boiadeiros, exceto os suíços',
    origin:
      'Embora tenham surgido em diferentes países e ocasiões, essas raças têm em comum o fato de serem desenvolvidas a partir de cruzamentos seletivos com o objetivo de atenuar o instinto de predador com o rebanho. Assim, passaram a juntar as ovelhas sem o ímpeto de atacá-las.',
    characteristics:
      'Os pastores e os boiadeiros são inteligentes, ativos e adoram ter tarefas para cumprir. Não à toa, são muito usados pela polícia e pelos bombeiros, como é o caso do cachorro boiadeiro-australiano. Também são carinhosos e se adaptam bem à família. As raças mais conhecidas são: Pastor Alemão, Pastor de Shetland, Border Collie e Welsh Corgi Pembroke.',
  },
  {
    name: 'Grupo 02: Pinscher e Schnauzer, molossoides, cães de montanha e boiadeiros suíços',
    origin:
      'Os cães desse grupo também foram desenvolvidos para ajudar no rebanho. No entanto, enquanto os pastores e os boiadeiros eram usados para reunir os animais, essas raças serviam para proteger o rebanho de outros predadores. Além disso, eram usados para trabalhos pesados, como puxar carroças.',
    characteristics:
      'Aprendizes vorazes, esses cães trabalhadores são fortes, ativos e muito inteligentes. Por isso, embora se adaptem bem ao convívio familiar, alguns deles precisam gastar bastante energia. O instinto é de defesa, como é o caso do cachorro Boxer. Os mais conhecidos são: Doberman, Rottweiler, Boxer, Fila, São Bernardo, Schnauzer e Pinscher.',
  },
];

export default {
  title: 'Ion/Data Display/Accordion',
  component: IonAccordionComponent,
} as Meta;

const Template: Story = (args) => ({
  props: args,
  template: `
      <ion-accordion
      [accordions]="accordions"
      [modeAccordion]="modeAccordion"
      [templateHeader]="customHeader"
      [templateBody]="customBody"
    >
    </ion-accordion>

    <ng-template #customHeader let-data>
      {{ data.name }}
    </ng-template>

    <ng-template #customBody let-data>
      <h3>Origem</h3>
      <p>{{ data.origin }}</p>
      <h3>Características</h3>
      <p>{{ data.characteristics }}</p>
    </ng-template>
  `,
  styles: [
    `
    * {
      color: var(--ion-neutral-8);
    }
`,
  ],
  moduleMetadata: {
    props: args,
    imports: [CommonModule, IonIconModule, IonAccordionModule],
  },
});

export const Accordion = Template.bind({});
Accordion.args = {
  accordions: accordions,
};

export const AccordionWithModeAccordionFalse = Template.bind({});
AccordionWithModeAccordionFalse.args = {
  accordions: accordions,
  modeAccordion: false,
};
