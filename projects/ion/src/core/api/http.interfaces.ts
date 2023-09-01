import { SafeAny } from '../../lib/utils/safe-any';
import { SmartPayload } from '../bn-table/bn-table';
import { Observable } from 'rxjs';

export interface BnService<DataType> {
  list?: (filters?: IPayload) => Observable<IResponse<DataType>>;
  insert?: (payload: IPayload) => Observable<SafeAny>;
  get?: (item: number | string) => Observable<DataType>;
}

export interface IResponse<DataType> {
  data?: DataType[];
  dados?: DataType[];
  total?: number;
  mensagem?: string;
  [x: string]: SafeAny;
}

export interface IPayload extends SmartPayload {
  [x: string]: SafeAny;
  filter?: SafeAny;
}
