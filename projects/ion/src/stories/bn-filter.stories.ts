import type { Meta, StoryObj } from '@storybook/angular';
import { BnFilterComponent } from '../lib/core/bn-filter/bn-filter.component';
import { BnFormService } from '../lib/core/bn-form/bn-form.service';

const meta: Meta<BnFilterComponent> = {
  title: 'Core/BnFilter',
  component: BnFilterComponent,
  tags: ['autodocs'],
  argTypes: {
    applied: { action: 'applied' },
    cleared: { action: 'cleared' },
  },
  render: (args) => ({
    props: args,
    applicationConfig: {
      providers: [BnFormService],
    },
  }),
};

export default meta;

export const Default: StoryObj<BnFilterComponent> = {
  args: {
    pageTitle: 'Filtro de Clientes',
    fields: [
      { key: 'nome', label: 'Nome Completo', type: 'text', required: true },
      {
        key: 'data',
        label: 'Data de Cadastro',
        type: 'datepicker',
        required: false,
      },
    ],
  },
};

export const Vazio: StoryObj<BnFilterComponent> = {
  args: {
    pageTitle: 'Filtro Sem Campos',
    fields: [],
  },
};
