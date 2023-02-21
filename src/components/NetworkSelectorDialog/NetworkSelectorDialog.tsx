import { Button, Stack, useTheme } from '@mui/material';
import { Dialog } from 'ui';
import useAddNetworkToMetamaskCb from 'hooks/useAddNetworkToMetamask/useAddNetworkToMetamask';
import { ChainId, NETWORK_ICONS } from '../../constants';

export const NetworkSelectorDialog = ({ open, onClose }: { open: boolean, onClose: (isOpen: boolean) => void }) => {
  const { addNetwork } = useAddNetworkToMetamaskCb()

  const theme = useTheme()

  return (
    <Dialog
      open={open}
      onClick={() => onClose(false)}
      title="Switch to a supported network"
      maxWidth='xs'
      fullWidth
    >
      <Stack direction={'column'} spacing={theme.spacing(2)} style={{ padding: theme.spacing(3) }}>
        <Stack direction={'column'}>
          <Button
            //className={formButton}
            onClick={() => {
              onClose(false)
              addNetwork(ChainId.MOONRIVER);
            }}
            startIcon={<img height={'16px'} src={NETWORK_ICONS[ChainId.MOONRIVER]} alt=''/>}
            color="primary"
          >
            Switch to Moonriver
          </Button>
          <Button
            //className={formButton}
            onClick={() => {
              onClose(false)
              addNetwork(ChainId.MOONBEAM);
            }}
            startIcon={<img height={'16px'} src={NETWORK_ICONS[ChainId.MOONBEAM]} alt=''/>}
            color="primary"
          >
            Switch to Moonbeam
          </Button>
        </Stack>
      </Stack>
    </Dialog>
  );
};

