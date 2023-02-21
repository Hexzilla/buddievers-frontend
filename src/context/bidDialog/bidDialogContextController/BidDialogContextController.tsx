import { useEffect, useState } from 'react';

import { BidDialogContext } from '../bidDialogContext/BidDialogContext';
import { BidData } from '../bidDialogContext/BidDialogContext.types';

import { BidDialogContextControllerProps } from './BidDialogContextController.types';

export const BidDialogContextController = ({
  children,
}: BidDialogContextControllerProps) => {
  const [isBidDialogOpen, setBidDialogOpen] = useState<boolean>(false);
  const [bidData, setBidData] = useState<BidData>(undefined);

  useEffect(() => {
    if (!isBidDialogOpen) {
      setBidData(undefined);
    }
  }, [isBidDialogOpen]);

  return (
    <BidDialogContext.Provider
      value={{ isBidDialogOpen, setBidDialogOpen, bidData, setBidData }}
    >
      {children}
    </BidDialogContext.Provider>
  );
};
