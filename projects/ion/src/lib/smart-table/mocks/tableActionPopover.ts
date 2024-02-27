import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-table-action-popover',
  template: `
    <ion-smart-table [config]="config"></ion-smart-table>
    <ng-template #BodyTemplate>
      <div data-testid="ion-popover-body">
        A Brisanet é uma empresa brasileira de telecomunicações fundada em 1997.
        Focada em serviços de internet, TV por assinatura e telefonia, a empresa
        se destaca pela qualidade de sua infraestrutura de rede. Com um
        compromisso de levar conectividade para áreas antes carentes desse
        serviço, a Brisanet contribui para a inclusão digital e o
        desenvolvimento de comunidades. Reconhecida pela velocidade e
        estabilidade da internet, a empresa investe em tecnologia de ponta para
        proporcionar uma experiência superior aos seus clientes. Atenta às
        demandas do mercado, busca constantemente inovações e parcerias
        estratégicas para ampliar seu portfólio. Além disso, a Brisanet valoriza
        a responsabilidade social e ambiental, buscando contribuir para o
        desenvolvimento sustentável das regiões em que atua. Em resumo, a
        Brisanet é uma empresa comprometida com a qualidade, inovação e inclusão
        digital no Brasil.
      </div>
    </ng-template>
  `,
})
export class TableActionPopoverComponent implements AfterViewInit {
  @ViewChild('BodyTemplate', { static: true }) popoverBody!: TemplateRef<void>;
  config = {
    check: true,
    data: [
      { id: 1, name: 'Meteora', deleted: false, year: 2003 },
      { id: 2, name: 'One More Light', deleted: false, year: 2017 },
    ],
    columns: [
      {
        key: 'id',
        label: 'Código',
        sort: true,
      },
      {
        key: 'name',
        label: 'Nome',
        sort: false,
      },
    ],
    actions: [
      {
        label: 'Detalhes',
        icon: 'pencil',
        danger: false,
        tooltipConfig: {
          ionTooltipTitle: 'Tooltip customizada',
        },
        popover: {
          ionPopoverTitle: 'Popover customizado',
          ionPopoverActions: [{ label: 'Ação 1', icon: 'pencil' }],
          ionPopoverBody: this.popoverBody,
        },
      },
    ],
    pagination: {
      total: 2,
      pageSizeOptions: [10, 25, 50, 100],
    },
    debounceOnSort: 0,
  };

  ngAfterViewInit(): void {
    this.config.actions[0].popover.ionPopoverBody = this.popoverBody;
  }
}
