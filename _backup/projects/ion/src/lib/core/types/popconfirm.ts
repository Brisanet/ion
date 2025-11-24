import { StatusType } from './status';

export interface PopConfirmProps {
  ionPopConfirmTitle: string;
  ionPopConfirmType?: StatusType;
  ionPopConfirmDesc?: string;
  ionConfirmText?: string;
  ionCancelText?: string;
  ionPopConfirmCloseOnScroll?: boolean;
}
