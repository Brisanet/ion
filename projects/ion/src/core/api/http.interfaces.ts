import { SafeAny } from '../../lib/utils/safe-any';
import { SmartPayload } from '../bn-table/bn-table';

export interface IResponse<DataType> {
  data: DataType[];
  total: number;
}

export interface IPayload extends SmartPayload {
  [x: string]: SafeAny;
}
