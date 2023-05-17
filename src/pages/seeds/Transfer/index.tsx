import { useMemo, useState } from 'react';
import { Grid, TextField } from '@mui/material';
import Divider from '@mui/material/Divider';
import { toast } from 'react-toastify';

import { toastOptions, formatNumber, shortAddress } from 'utils/utils';

import { useSeedToken } from 'hooks/useSeedToken';
import { useMarketContext } from 'context/MarketContext';

import ItemRow from 'components/Marketplace/ItemRow';
import InputNumber from 'components/Marketplace/InputNumber';
import ActionButton from 'components/Marketplace/ActionButton';
import MarketDialog from 'components/Marketplace/MarketDialog';

const Transfer = ({ onClose }: any) => {
  const { account, balance, seedBalance, refresh } = useMarketContext();
  const { transfer } = useSeedToken();
  const [recipient, setRecipient] = useState('0x');
  const [quantity, setQuantity] = useState(0);

  const onChangeQuantity = (e: any) => {
    setQuantity(Number(e.target.value));
  };

  const onSubmit = async () => {
    if (!account) {
      toast.warn('Please connect your wallet!');
      return;
    }
    if (!recipient || !recipient.startsWith('0x')) {
      toast.warn('Please input recipient address!');
      return;
    }
    if (recipient === account) {
      toast.warn('You are going to send your own wallet!');
      return;
    }
    if (quantity <= 0) {
      toast.warn('Please input quantity!');
      return;
    }

    const toastId = toast.loading('Transfering $SEEDS token...');

    try {
      const result = await transfer(recipient, quantity);
      console.log('add-buy-offer-result', result);
      if (!result) {
        toast.update(toastId, toastOptions('Failed to create send token!'));
      } else {
        refresh();
        toast.update(
          toastId,
          toastOptions(
            'You have been sent token successfully!',
            'success'
          )
        );
      }
    } catch (err: any) {
      console.error(err);
      toast.update(
        toastId,
        toastOptions(err?.data?.message || 'Something went wrong!', 'error')
      );
    }
  };

  const disabled = useMemo(() => {
    if (balance <= 0 || quantity <= 0) {
      return true;
    }
    if (quantity >= seedBalance) {
      return true;
    }
    if (!recipient || !recipient.startsWith('0x')) {
      return true;
    }
    return false;
  }, [balance, recipient, quantity, seedBalance]);

  return (
    <MarketDialog
      title="TRANSFER $SEEDS"
      actions={
        <>
          <ActionButton onClick={onSubmit} disabled={disabled}>
            Transfer
          </ActionButton>
          <ActionButton onClick={onClose}>Close</ActionButton>
        </>
      }
      onClose={onClose}
    >
      <>
        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="Recipient">
            <TextField
              variant="outlined"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              sx={{ fontSize: 20 }}
            />
          </ItemRow>
          <ItemRow heading="Quantity to send">
            <InputNumber
              value={quantity}
              onChange={onChangeQuantity}
              onButtonClick={() => setQuantity(seedBalance)}
            />
          </ItemRow>
        </Grid>

        <Divider light />

        <Grid container spacing={4} alignItems="center">
          <ItemRow heading="You have">
            {formatNumber(seedBalance)} $SEEDS
          </ItemRow>
          <ItemRow heading="You give">{formatNumber(quantity)} $SEEDS</ItemRow>
          <ItemRow heading="Recipient">{shortAddress(recipient)}</ItemRow>
        </Grid>
      </>
    </MarketDialog>
  );
};

export default Transfer;
