import type { Meta, StoryObj } from '@storybook/angular';
import { BnFilterComponent } from 'ion';
import { BnFormService } from '../../../../ion/src/lib/core/bn-form/bn-form.service';

const meta: Meta<BnFilterComponent> = {
  title: 'Components/BnFilter',
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
type Story = StoryObj<BnFilterComponent>;

export const Default: Story = {
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

export const Vazio: Story = {
  args: {
    pageTitle: 'Filtro Sem Campos',
    fields: [],
  },
};
