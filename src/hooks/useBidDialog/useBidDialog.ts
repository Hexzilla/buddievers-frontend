import { useContext } from 'react';
import { BidDialogContext } from 'context/bidDialog/bidDialogContext/BidDialogContext';

export const useBidDialog = () => {
  const context = useContext(BidDialogContext);

  if (context === undefined) {
    throw new Error(
      'useBidDialog must be used within an BidDialogContextController'
    );
  }
  return context;
};
