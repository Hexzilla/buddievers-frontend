import { Button } from 'ui';
import { useWeb3React } from '@web3-react/core';
import { useActiveWeb3React, useClasses } from 'hooks';
import { styles } from './ConnectedNetwork.styles';
import { NETWORK_ICONS, NETWORK_NAME } from '../../constants';
import { NetworkSelectorDialog } from 'components/NetworkSelectorDialog/NetworkSelectorDialog';
import { useState } from 'react';
import { useMediaQuery, useTheme } from '@mui/material';

export const ConnectedNetwork = () => {
  const theme = useTheme()
  const { chainId } = useActiveWeb3React();
  const { error: err } = useWeb3React();
  const [networkSelectorDialogOpen, setNetworkSelectorDialogOpen] = useState<boolean>(false);

  //console.log('yolo',{ account, error, chainId, active, err, cid })

  const showError = err ? true : false;

  const { button } = useClasses(styles);

  const iconImage = NETWORK_ICONS[chainId as any]

  const isSm = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      {!isSm && <Button
        className={button}
        size="medium"
        onClick={() => setNetworkSelectorDialogOpen(true)}
        startIcon={iconImage ? <img height={'16px'} src={iconImage} alt='' /> : ''}
      >{
          <div>
            {showError || !chainId ? (
              'WRONG NETWORK'
            ) : (
              NETWORK_NAME[chainId]
            )}
          </div>
        }
      </Button>
      }
      {isSm && <Button
        className={button}
        size="medium"
        onClick={() => setNetworkSelectorDialogOpen(true)}
      >
        <img height={'16px'} src={iconImage} alt='' /> 
      </Button>
      }
      <NetworkSelectorDialog open={networkSelectorDialogOpen} onClose={setNetworkSelectorDialogOpen} />
    </>
  );
};
