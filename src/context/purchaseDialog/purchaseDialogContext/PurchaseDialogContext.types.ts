import { ChainId } from '../../../constants';
import { Order } from 'hooks/marketplace/types';
import { OrderType } from '../../../utils/subgraph';
import { ApprovedPaymentCurrency } from 'hooks/useApprovedPaymentCurrencies/useApprovedPaymentCurrencies';

export type PurchaseData = {
  order: Order;
  orderType?: OrderType;
  chainId?: ChainId;
  name?: string;
  symbol?: string;
  decimals?: number;
  approvedPaymentCurrency: ApprovedPaymentCurrency;
} | null;

export type PurchaseDialogContextType = {
  isPurchaseDialogOpen: boolean;
  setPurchaseDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  purchaseData?: PurchaseData;
  setPurchaseData: React.Dispatch<React.SetStateAction<PurchaseData>>;
};
