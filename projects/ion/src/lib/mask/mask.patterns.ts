export type MaskPattern =
  | 'CPF'
  | 'CNPJ'
  | 'PHONE'
  | 'CEP'
  | 'DATE'
  | 'DATETIME'
  | 'CREDIT_CARD'
  | 'MAC';

export const MASK_PATTERNS: Record<MaskPattern, string> = {
  CPF: '###.###.###-##',
  CNPJ: '##.###.###/####-##',
  PHONE: '(##) #####-####',
  CEP: '#####-###',
  DATE: '##/##/####',
  DATETIME: '##/##/#### ##:##',
  CREDIT_CARD: '#### #### #### ####',
  MAC: 'XX:XX:XX:XX:XX:XX',
};
