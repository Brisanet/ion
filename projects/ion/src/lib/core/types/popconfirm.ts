import { StatusType } from './status';

export interface PopConfirmProps {
  ionPopConfirmDesc: string;
  ionPopConfirmType?: StatusType;
  ionConfirmText?: string;
  ionCancelText?: string;
  ionPopConfirmCloseOnScroll?: boolean;
}
