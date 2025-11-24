import { CommonModule } from '@angular/common';
import { TemplateRef } from '@angular/core';
import { Meta, Story } from '@storybook/angular/types-6-0';

import { TableActionPopoverComponent } from '../projects/ion/src/lib/smart-table/mocks/tableActionPopover';
import {
  IonSmartTableModule,
  PopoverDirectiveProps,
} from '../projects/ion/src/public-api';

const Template: Story<TableActionPopoverComponent> = (
  args: TableActionPopoverComponent
) => ({
  component: TableActionPopoverComponent,
  props: {
    ...args,
  },
  moduleMetadata: {
    declarations: [TableActionPopoverComponent],
    imports: [CommonModule, IonSmartTableModule],
    entryComponents: [TableActionPopoverComponent],
  },
});

export const WithPopoverAction = Template.bind({});
WithPopoverAction.args = {
  config: {
    check: true,
    data: [
      { id: 1, name: 'Meteora', deleted: false, year: 2003 },
      { id: 2, name: 'One More Light', deleted: false, year: 2017 },
    ],
    columns: [
      { key: 'id', label: 'Código', sort: true },
      { key: 'name', label: 'Nome', sort: false },
    ],
    actions: [
      {
        label: 'Detalhes',
        icon: 'pencil',
        danger: false,
        tooltipConfig: {
          ionTooltipTitle: 'Tooltip customizada',
        },
        popover: (row: { name: string }): Partial<PopoverDirectiveProps> => ({
          ionPopoverTitle: `Detalhes do álbum ${row.name}`,
          ionPopoverBody: {
            template: `
              <ng-template #BodyTemplate let-row>
                <span>
                  O álbum '{{ row.name }}' da banda Linkin Park é amplamente reconhecido e
                  apreciado globalmente. Com sonoridade distintiva e letras impactantes,
                  conquistou um lugar especial no coração dos fãs. Sua popularidade se
                  reflete nas playlists e nas significativas reproduções em plataformas de
                  streaming. A fusão única de rock alternativo, nu-metal e elementos
                  eletrônicos destaca a versatilidade musical da banda. Cada faixa
                  contribui para uma narrativa sonora envolvente, conectando-se com os
                  ouvintes em um nível pessoal. Os riffs poderosos, batidas intensas e
                  letras que ressoam com experiências comuns fazem do álbum '{{
                    row.name
                  }}' um marco na discografia do Linkin Park. Sua duradoura influência é
                  evidenciada pelo contínuo carinho dos fãs, que redescobrem as nuances
                  cativantes deste trabalho musical notável.
                </span>
              </ng-template>
            `,
          } as unknown as TemplateRef<void>,
        }),
      },
    ],
    pagination: {
      total: 2,
      pageSizeOptions: [10, 25, 50, 100],
    },
    debounceOnSort: 0,
  },
};

export default {
  title: 'Ion/Data Display/SmartTable',
  component: TableActionPopoverComponent,
} as Meta<TableActionPopoverComponent>;
