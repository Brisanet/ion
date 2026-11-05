import { HttpClient } from '@angular/common/http';
import { JsonPipe } from '@angular/common';
import { Component, inject, input, OnInit, signal } from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import {
  BnAboutComponent,
  BnFilterComponent,
  BnFormComponent,
  BnFormField,
  BnFormService,
  BnSelectFormField,
  BnWizardComponent,
  BnWizardConfig,
  BnEditDrawerComponent,
  DropdownItem,
  IonButtonComponent,
  IonButtonProps,
  IonDrawerComponent,
  IonDrawerDirection,
  IonModalService,
} from 'ion';

type FromYourRepository = {
  id?: number;
  title_like?: string;
};

@Component({
  selector: 'app-bn-form-gallery',
  standalone: true,
  imports: [
    JsonPipe,
    IonButtonComponent,
    BnFormComponent,
    BnFilterComponent,
    BnAboutComponent,
    BnWizardComponent,
    BnEditDrawerComponent,
    IonDrawerComponent,
  ],
  templateUrl: './bn-form-gallery-component.html',
  styleUrls: ['./bn-form-gallery-component.scss'],
})
export class BnFormGalleryComponent implements OnInit {
  private readonly http = inject(HttpClient);
  private readonly modalService = inject(IonModalService);
  private readonly bnFormService = inject(BnFormService);

  selectOptions = input<DropdownItem[]>([]);
  selectOptionsCar = input<DropdownItem[]>([]);

  filterFields = signal<BnFormField[]>([
    {
      key: 'name',
      label: 'Nome',
      placeholder: 'Filtrar por nome...',
      className: 'col-6',
      required: true,
    },
    {
      key: 'cpf',
      label: 'CPF',
      className: 'col-6',
      required: true,
      mask: '###.###.###-##',
    },
    {
      key: 'mac',
      label: 'MAC',
      className: 'col-6',
      required: true,
      mask: 'XX:XX:XX:XX:XX:XX',
    },
    {
      key: 'gender',
      label: 'Gênero',
      type: 'triple-toggle',
      options: [
        { value: 'male', label: 'Masculino', icon: 'male' },
        { value: 'female', label: 'Feminino', icon: 'female' },
      ],
      className: 'col-6',
    },
    {
      key: 'datepickerRange',
      label: 'Date Range Picker',
      type: 'datepicker',
      rangePicker: true,
      className: 'col-md-6',
    },
    {
      key: 'teste',
      type: 'switch',
      label: 'Teste',
      className: 'col-md-3',
      size: 'lg',
    },
    {
      key: 'teste1',
      type: 'switch',
      label: 'Teste1',
      className: 'col-md-3',
      size: 'lg',
    },
    {
      type: 'select',
      key: 'city',
      className: 'col-md-8',
      label: 'Cidade',
      placeholder: 'Selecione uma cidade',
      initialValue: 'São Paulo',
      propValue: 'label',
      multiple: true,
      options: [
        { label: 'São Paulo' },
        { label: 'Rio de Janeiro' },
        { label: 'Belo Horizonte' },
      ],
    },
    {
      type: 'select',
      key: 'searchableSelect',
      label: 'Searchable Select (Issue Repo)',
      placeholder: 'Digite para buscar...',
      enableSearch: true,
      className: 'col-12',
      refresh: {
        use: (field, search) => {
          console.log('[AppComponent] Searching for:', search);
          return new Observable((subscriber) => {
            setTimeout(() => {
              const allOptions = [
                { label: 'Apple', value: 'apple' },
                { label: 'Banana', value: 'banana' },
                { label: 'Cherry', value: 'cherry' },
                { label: 'Date', value: 'date' },
                { label: 'Elderberry', value: 'elderberry' },
              ];
              const filtered = search
                ? allOptions.filter((opt) =>
                    opt.label.toLowerCase().includes(search.toLowerCase()),
                  )
                : allOptions;
              console.log('[AppComponent] Found:', filtered);
              subscriber.next(filtered);
              subscriber.complete();
            }, 1000);
          });
        },
      },
    },
  ]);

  headerButton = {
    action: () => console.log('Header button clicked'),
    label: 'Imprimir solicitação',
  };

  pageTitle = {
    title: 'Detalhes da solicitação',
    icon: 'receipt',
  };

  aboutFields: BnFormField[] = [
    {
      key: 'solicitacao_id',
      label: 'Nº da solicitação',
      placeholder: 'Nº da solicitação',
      className: 'col-3',
      initialValue: '1234567-ABCDEF',
    },
    {
      key: 'centro_id',
      label: 'Centro de origem',
      placeholder: 'Centro de origem',
      className: 'col-3',
      initialValue: 'AAAABBBBCCC',
    },
    {
      key: 'projeto_id',
      label: 'Projeto',
      placeholder: 'Projeto',
      className: 'col-3',
      initialValue: 'Projeto ABC',
    },
    {
      key: 'setor_id',
      label: 'Setor',
      placeholder: 'Setor',
      className: 'col-3',
      initialValue: 'Logistica',
    },
    // {
    //   key: 'obs',
    //   type: 'textarea',
    //   label: 'Observação',
    //   placeholder: 'Observação',
    //   className: 'col-12',
    //   initialValue: 'Material material material  material material  material material  material material  material material  material material  material material ',
    // },
    {
      key: 'status_id',
      label: 'Status',
      placeholder: 'Status',
      className: 'col-3',
      initialValue: 'Em andamento',
    },
  ];

  optionsMock = {
    projectOptions: [
      { label: 'Projeto A', value: 'project_a' },
      { label: 'Projeto B', value: 'project_b' },
    ],
    centerOriginOptions: [
      { label: 'Centro de origem A', value: 'center_a' },
      { label: 'Centro de origem B', value: 'center_b' },
    ],
    destinationTypeOptions: [
      { label: 'Tipo de destino A', value: 'destination_type_a' },
      { label: 'Tipo de destino B', value: 'destination_type_b' },
    ],
    destinationOptions: [
      { label: 'Destino A', value: 'destination_a' },
      { label: 'Destino B', value: 'destination_b' },
    ],
  };

  formFields: BnFormField[] = [];
  formGroup!: FormGroup;

  editFormFields: BnFormField[] = [
    {
      key: 'nome',
      className: 'col-6',
      type: 'text',
      label: 'Nome',
      placeholder: 'Digite seu nome',
      initialValue: 'Iury',
      iconInput: 'image-user',
      iconDirection: 'left',
      validators: [Validators.minLength(3)],
    },
    {
      key: 'sobrenome',
      className: 'col-6',
      type: 'text',
      label: 'Sobrenome',
      placeholder: 'Digite seu sobrenome',
      onlyShowWhen: () => {
        return (
          this.formGroup.get('nome')?.value && this.formGroup.get('nome')?.valid
        );
      },
      validators: [Validators.minLength(3)],
    },
  ];
  editFormGroup!: FormGroup;

  isEditDrawerOpen = signal(false);
  simulatingLoading = signal(false);
  editData = signal({
    nome: 'Iury',
    sobrenome: 'Oliveira',
  });
  isDrawerOpen = signal(false);
  drawerDirection = signal<IonDrawerDirection>('right');
  drawerSize = signal<number>(30);
  submitButton = signal<IonButtonProps>({
    label: 'Salvar',
    loading: false,
  });
  secondaryButton = signal<IonButtonProps>({
    label: 'Secondary',
    loading: false,
    iconType: 'pencil',
    rightSideIcon: true,
  });

  ngOnInit(): void {
    this.formFields = [
      {
        key: 'nome',
        className: 'col-6',
        type: 'text',
        label: 'Nome',
        placeholder: 'Digite seu nome',
        initialValue: 'Iury',
        iconInput: 'image-user',
        iconDirection: 'left',
        validators: [Validators.minLength(3)],
      },
      {
        key: 'arquivo',
        label: 'Arquivo',
        type: 'upload',
        accept: '.csv',
        acceptLabel: 'Apenas arquivos CSV',
        urlPlaceholder: 'https://...',
        onImportUrl: (url) => console.log(url),
      },
      {
        key: 'sobrenome',
        className: 'col-6',
        type: 'text',
        label: 'Sobrenome',
        placeholder: 'Digite seu sobrenome',
        onlyShowWhen: () => {
          return (
            this.formGroup.get('nome')?.value &&
            this.formGroup.get('nome')?.valid
          );
        },
        validators: [Validators.minLength(3)],
      },
      {
        key: 'email',
        className: 'col-6',
        type: 'email',
        label: 'Email',
        placeholder: 'Digite seu email',
        required: true,
        description: 'Seu email corporativo',
        validators: [
          Validators.pattern('^[a-zA-Z0-9._%+-]+@grupobrisanet.com.br$'),
        ],
      },
      {
        type: 'select',
        key: 'select',
        className: 'col-6',
        label: 'Selecione',
        placeholder: 'Selecione',
        options: this.selectOptions(),
        initialValue: [1],
        propValue: 'fruit_id',
        disabled: true,
        multiple: true,
      },
      {
        key: 'data_abertura',
        className: 'col-6',
        type: 'datepicker',
        label: 'Data de Abertura',
        disabled: true,
      },
      {
        key: 'bio',
        className: 'col-12',
        type: 'input-area',
        label: 'Bio',
        placeholder: 'Fale um pouco sobre você...',
        rows: '3',
      },
      {
        type: 'select',
        key: 'car',
        className: 'col-6',
        label: 'Selecione o Carro',
        placeholder: 'Selecione',
        options: this.selectOptionsCar(),
        initialValue: ['marea'],
      },
      {
        type: 'select',
        key: 'city',
        className: 'col-6',
        label: 'Selecione uma cidade',
        placeholder: 'Selecione',
        options: [],
        multiple: false,
        propValue: 'id',
        propLabel: 'title',
        enableSearch: true,
        refresh: {
          use: (field: BnSelectFormField, search?: string) =>
            this.refreshCities(field, search),
        },
      },
      {
        type: 'select',
        key: 'city_full',
        className: 'col-6',
        label: 'Selecione uma cidade (Objeto Completo)',
        placeholder: 'Selecione',
        options: [],
        multiple: false,
        propValue: 'id',
        propLabel: 'title',
        enableSearch: true,
        returnFullObject: true,
        refresh: {
          use: (field: BnSelectFormField, search?: string) =>
            this.refreshCities(field, search),
        },
      },
      {
        type: 'select',
        key: 'state',
        className: 'col-6',
        label: 'Selecione um estado',
        placeholder: 'Selecione',
        options: [],
        multiple: false,
        propValue: 'id',
        propLabel: 'title',
        enableSearch: true,
        onlyShowWhen: () => {
          return this.formGroup.get('city')?.value === 2;
        },
        refresh: {
          use: (field: BnSelectFormField, search?: string) =>
            this.refreshStates(field, search),
          debounceTime: 1500,
        },
      },
      // {
      //   key: 'basicInput',
      //   className: 'col-4',
      //   label: 'Basic Input',
      //   placeholder: 'Enter text here...',
      // },
      // {
      //   key: 'searchLeft',
      //   className: 'col-4',
      //   label: 'Input with Left Icon',
      //   placeholder: 'Search...',
      //   iconInput: 'search',
      //   iconDirection: 'left',
      // },
      // {
      //   key: 'searchRight',
      //   className: 'col-4',
      //   label: 'Input with Right Icon',
      //   placeholder: 'Search...',
      //   iconInput: 'search',
      //   iconDirection: 'right',
      // },
      // {
      //   key: 'password',
      //   label: 'Password Input',
      //   placeholder: 'Enter password',
      //   type: 'password',
      // },
      // {
      //   key: 'clearable',
      //   label: 'Input with Clear Button',
      //   placeholder: 'Type to see clear button',
      //   clearButton: true,
      // },
      // {
      //   key: 'maxLength',
      //   label: 'Input with Max Length (10 chars)',
      //   placeholder: 'Max 10 characters',
      //   maxLength: 10,
      // },
      // {
      //   key: 'valid',
      //   label: 'Valid Input',
      //   placeholder: 'Valid input',
      //   initialValue: 'valid@email.com',
      // },
      // {
      //   key: 'invalid',
      //   label: 'Invalid Input with Error',
      //   placeholder: 'Invalid input',
      //   initialValue: 'invalid',
      //   validators: [Validators.required, Validators.email],
      //   errorMsg: 'Please enter a valid email',
      // },
      // {
      //   key: 'disabled',
      //   label: 'Disabled Input',
      //   placeholder: 'Disabled input',
      //   initialValue: 'Cannot edit this',
      //   disabled: true,
      // },
      // {
      //   key: 'readonly',
      //   label: 'Readonly Input',
      //   placeholder: 'Readonly input',
      //   initialValue: 'Read only value',
      //   readonly: true,
      // },
      // {
      //   key: 'withButton',
      //   label: 'Input with Button',
      //   placeholder: 'Search with button',
      //   inputButton: true,
      //   inputButtonConfig: {
      //     label: 'Search',
      //     type: 'primary',
      //     iconType: 'search',
      //   },
      //   onClickButton: (value) => this.handleInputButtonClick(value),
      // },
      // {
      //   key: 'number',
      //   label: 'Number Input',
      //   placeholder: 'Enter number',
      //   type: 'number',
      //   className: 'col-4',
      // },
      // {
      //   key: 'tripleToggle',
      //   label: 'Triple Toggle',
      //   type: 'triple-toggle',
      //   className: 'col-4',
      //   options: [
      //     { value: 'yes', label: 'Yes', icon: 'check' },
      //     { value: 'no', label: 'No', icon: 'close' },
      //   ],
      //   initialValue: 'yes',
      // },
      // {
      //   key: 'switchBasic',
      //   label: 'Basic Switch',
      //   type: 'switch',
      //   className: 'col-md-4',
      //   initialValue: true,
      // },
      // {
      //   key: 'datepickerBasic',
      //   label: 'Basic Date Picker',
      //   type: 'datepicker',
      //   className: 'col-md-4',
      // },
      // {
      //   key: 'datepickerRange',
      //   label: 'Date Range Picker',
      //   type: 'datepicker',
      //   rangePicker: true,
      //   className: 'col-md-4',
      // },
      // {
      //   key: 'datepickerPredefined',
      //   label: 'Date Range with Predefined',
      //   type: 'datepicker',
      //   rangePicker: true,
      //   predefinedRanges: [
      //     { label: 'Últimos 7 dias', duration: 'P7D', isFuture: false },
      //     { label: 'Últimos 30 dias', duration: 'P30D', isFuture: false },
      //   ],
      //   className: 'col-md-4',
      // },
      // {
      //   key: 'name',
      //   label: 'Name',
      //   placeholder: 'Enter name',
      // }
      {
        type: 'select',
        key: 'city_full_multiple',
        className: 'col-6',
        label: 'Selecione cidades (Múltiplo - Objeto Completo)',
        placeholder: 'Selecione',
        options: [],
        multiple: true,
        propValue: 'id',
        propLabel: 'title',
        enableSearch: true,
        returnFullObject: true,
        refresh: {
          use: (field: BnSelectFormField, search?: string) =>
            this.refreshCities(field, search),
        },
      },
    ];

    this.formGroup = this.bnFormService.createFormGroup(this.formFields);
    this.editFormGroup = this.bnFormService.createFormGroup(this.editFormFields);
  }

  handleFilterApplied(filters: any): void {
    console.log('Filters applied:', filters);
  }

  openWizard(): void {
    const bnWizardConfig: BnWizardConfig = {
      title: 'Cadastro de Exames',
      titleIcon: 'box',
      // horizontal: true,
      onSubmit: (data) => {
        return this.http.post(
          'https://jsonplaceholder.typicode.com/posts',
          data,
        );
      },
      steps: [
        {
          title: 'Descrição',
          fields: [
            {
              key: 'projectId',
              type: 'select',
              label: 'Projeto',
              required: true,
              options: this.optionsMock.projectOptions,
              className: 'col-6',
              placeholder: 'Selecione um projeto',
              enableSearch: true,
            },
            {
              key: 'centerOriginId',
              type: 'select',
              label: 'Centro de origem',
              required: true,
              dependsOn: ['projectId'],
              className: 'col-6',
              placeholder: 'Selecione um centro de origem',
              refresh: {
                use: (field, search, dependsOnValues) => {
                  console.log(
                    'Refreshing centerOriginId with dependsOnValues:',
                    dependsOnValues,
                  );
                  const projectId = dependsOnValues?.['projectId'];

                  // simulando filtro e request aqui, no caso de consumo de API esse passo nao e necessario, sendo somente a chamada de API com o filtro
                  const filteredOptions = projectId
                    ? this.optionsMock.centerOriginOptions.filter((opt) =>
                        opt.value.includes(projectId.split('_')[1]),
                      )
                    : this.optionsMock.centerOriginOptions;

                  return new Observable((subscriber) => {
                    setTimeout(() => {
                      subscriber.next(filteredOptions);
                      subscriber.complete();
                    }, 500);
                  });
                },
              },
            },
            {
              key: 'nome',
              className: 'col-12',
              type: 'text',
              label: 'Nome',
              placeholder: 'Digite seu nome',
              initialValue: 'Iury',
              iconInput: 'image-user',
              iconDirection: 'left',
              validators: [Validators.required, Validators.minLength(3)],
            },
            {
              key: 'cpf',
              className: 'col-6',
              type: 'text',
              label: 'CPF',
              placeholder: '000.000.000-00',
              mask: 'CPF',
              validators: [Validators.required],
            },
            {
              key: 'telefone',
              className: 'col-6',
              type: 'text',
              label: 'Telefone',
              placeholder: '(00) 00000-0000',
              mask: 'PHONE',
              validators: [Validators.required],
            },
            {
              key: 'mac',
              className: 'col-6',
              type: 'text',
              label: 'MAC Address',
              placeholder: '00:00:00:00:00:00',
              mask: 'MAC',
            },
            {
              key: 'sobrenome',
              className: 'col-12',
              type: 'text',
              label: 'Sobrenome',
              placeholder: 'Digite seu sobrenome',
              // onlyShowWhen: (form) => {
              //   console.log(form.get('nome')?.valid);
              //   return form.get('nome')?.value;
              // }
            },
            {
              type: 'select',
              key: 'estado_civil',
              label: 'Estado civil',
              placeholder: 'Estado civil',
              className: 'col-12',
              options: [
                { label: 'Solteiro', value: 'solteiro' },
                { label: 'Casado', value: 'casado' },
              ],
              onChange: (form: FormGroup) => {
                if (form.get('estado_civil')?.value === 'solteiro') {
                  form.get('nome')?.disable();
                  form.get('genero')?.disable();
                  form.get('ativo')?.disable();
                  form.get('prioridade')?.disable();
                } else {
                  form.get('nome')?.enable();
                  form.get('genero')?.enable();
                  form.get('ativo')?.enable();
                  form.get('prioridade')?.enable();
                }
              },
            },
            {
              type: 'select',
              key: 'genero',
              label: 'Genero',
              placeholder: 'Genero',
              className: 'col-3',
              options: [
                { label: 'Masculino', value: 'masculino' },
                { label: 'Feminino', value: 'feminino' },
              ],
            },
            {
              type: 'switch',
              key: 'ativo',
              label: 'Ativo',
              className: 'col-3',
            },
            {
              type: 'triple-toggle',
              key: 'prioridade',
              label: 'Prioridade',
              className: 'col-3',
              options: [
                { value: 'baixa', label: 'Baixa' },
                { value: 'alta', label: 'Alta' },
              ],
            },
          ],
        },
        {
          title: 'Configurações',
          alert: {
            message: 'Apenas campos obrigatórios',
            type: 'warning',
          },
          fields: [
            {
              key: 'ativo',
              type: 'switch',
              label: 'Ativo',
              className: 'col-6',
            },
            {
              key: 'prioridade',
              type: 'triple-toggle',
              label: 'Prioridade',
              className: 'col-6',
              options: [
                { value: 'baixa', label: 'Baixa' },
                { value: 'alta', label: 'Alta' },
              ],
            },
          ],
        },
      ],
    };

    this.modalService
      .open(BnWizardComponent, {
        title: bnWizardConfig.title,
        titleIcon: bnWizardConfig.titleIcon,
        width: 800,
        overlayCanDismiss: false,
        footer: {
          hide: true,
        },
        ionParams: {
          config: bnWizardConfig,
        },
      })
      .subscribe({
        next: (result) => {
          console.log('Wizard finished with result:', result);
        },
        error: (error) => {
          console.error('Wizard finished with error:', error);
        },
      });
  }

  submitForm(): void {
    console.log('Form submitted:', this.formGroup.value);
  }

  refreshCities(_field: BnSelectFormField, search?: string): Observable<any> {
    const params: FromYourRepository = {};

    if (search) {
      params.title_like = search;
    }

    console.log(search);

    return this.http.get('https://jsonplaceholder.typicode.com/posts', {
      params,
    });
  }

  refreshStates(_field: BnSelectFormField, search?: string): Observable<any> {
    return this.http.get('https://jsonplaceholder.typicode.com/posts');
  }

  openEditDrawer(): void {
    this.isEditDrawerOpen.set(true);
  }

  openDrawer(direction: IonDrawerDirection = 'right', size: number = 30): void {
    this.drawerDirection.set(direction);
    this.drawerSize.set(size);
    this.isDrawerOpen.set(true);
  }

  closeDrawer(): void {
    this.isDrawerOpen.set(false);
  }

  submitDrawer(): void {
    this.submitButton().loading = true;
    this.isDrawerOpen.set(false);
  }

  saveEdit(data: any): void {
    console.log('Saving data with simulation...', data);
    this.simulatingLoading.set(true);

    // Simulate backend request
    setTimeout(() => {
      this.editData.set(data);
      this.simulatingLoading.set(false);
      this.isEditDrawerOpen.set(false);
      console.log('Saved data:', data);
    }, 2000);
  }
}