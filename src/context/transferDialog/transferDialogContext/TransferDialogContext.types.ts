import { Asset } from 'hooks/marketplace/types';

export type TransferData = {
  asset: Partial<Asset>;
  decimals?: number;
} | null;

export type TransferDialogContextType = {
  isTransferDialogOpen: boolean;
  setTransferDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  transferData?: TransferData;
  setTransferData: React.Dispatch<React.SetStateAction<TransferData>>;
};
