import { Component, TemplateRef, ViewChild } from '@angular/core';

import { PopoverProps } from '../../core/types';

@Component({
  template: `
    <ion-smart-table [config]="config"></ion-smart-table>
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
})
export class TableActionPopoverComponent {
  @ViewChild('BodyTemplate', { static: true }) popoverBody!: TemplateRef<void>;
  config = {
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
        icon: 'doc',
        danger: false,
        call: (): void => {
          return;
        },
        popover: (row: { name: string }): Partial<PopoverProps> => ({
          ionPopoverTitle: `Detalhes do álbum ${row.name}`,
          ionPopoverBody: this.popoverBody,
          ionPopoverActions: [{ label: 'Fechar' }],
        }),
      },
    ],
    pagination: {
      total: 2,
      pageSizeOptions: [10, 25, 50, 100],
    },
    debounceOnSort: 0,
  };
}
