export type CancelData = {
  orderHash: string;
} | null;

export type CancelDialogContextType = {
  isCancelDialogOpen: boolean;
  setCancelDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  cancelData?: CancelData;
  setCancelData: React.Dispatch<React.SetStateAction<CancelData>>;
};
