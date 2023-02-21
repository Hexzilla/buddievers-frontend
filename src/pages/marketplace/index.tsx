import { GlitchText } from 'ui';
import { styled } from '@mui/material';
import { useERC20Contract } from 'hooks/useContracts/useContracts';
import { useActiveWeb3React } from 'hooks';
import { useMarketplaceBalances } from 'hooks/marketplace/useMarketplaceBalances';
import {
  AssetType,
  CreateOrderData,
  CreateSimpleStrategyData,
  Strategy,
} from 'utils/marketplace';
import { useCreateOrderCallback } from 'hooks/marketplace/useCreateOrderCallback';
import { AddressZero } from '@ethersproject/constants';
import {
  ApprovalState,
  useApproveCallback,
} from 'hooks/useApproveCallback/useApproveCallback';
import { compareDesc } from 'date-fns';
import { assetTypeToStringAssetType } from 'utils/subgraph';

const StyledContainer = styled('div')`
  tex-align: center;
`;

const MarketplacePage = () => {
  /*
  const { account } = useActiveWeb3React();

  f
  console.log(account);

  const s = useERC20Contract('0xDC5b69374207a18e75F7cdCf5176CA63911e690d');
  const ss = useERC20Contract('0x1369eA55a479CC2A334ACa55e250DC5161677442');
  console.log(s, ss);
  
  const x = useMulticall2Raw([
    {
      target: '0xDC5b69374207a18e75F7cdCf5176CA63911e690d',
      callData: s?.interface.encodeFunctionData('balanceOf', [account]) as string
    },
    {
      target: '0x1369eA55a479CC2A334ACa55e250DC5161677442',
      callData: ss?.interface.encodeFunctionData('balanceOf', [account]) as string
    }
  ])
  
  //const x = useMulticall2Static(s?.interface.fragments as any[], [['0xDC5b69374207a18e75F7cdCf5176CA63911e690d', 'balanceOf', [account]], ['0x1369eA55a479CC2A334ACa55e250DC5161677442', 'balanceOf', [account]]])

  const x = useMarketplaceBalances([
 
    tokenAddress: '0xDC5b69374207a18e75F7cdCf5176CA63911e690d',
      tokenId: '0',
      tokenType: AssetType.ERC20,
      userAddress: account as string,
    },
  ]);
  console.log('MARKETPLACE BALANCE', x);
  

  const cod: CreateOrderData = {
    seller: account as string,
    buyAsset: {
      addr: '0xe939019909451A9C3685C99270eBd1e59232e16b',
      id: 3,
      assetType: AssetType.ERC1155
    },
    sellAsset: {
      addr: '0xFF3e85e33A8Cfc73fe08F437bFAEADFf7C95e285',
      id: 0,
      assetType: AssetType.ERC20
    },
    salt: '44',
    strategy: Strategy.SIMPLE
  }

  const sd: CreateSimpleStrategyData = {
    quantity: "1",
    askPerUnitNominator: '1',
    askPerUnitDenominator: '1',
    startsAt: '0',
    expiresAt: '0',
    onlyTo: AddressZero,
    partialAllowed: false
  }

  const creatOrder = useCreateOrderCallback(cod, sd)
  const [status, approve] = useApproveCallback({tokenAddress: cod.sellAsset.addr, userAddress: cod.seller, tokenId: cod.sellAsset.id, tokenType: assetTypeToStringAssetType(cod.sellAsset.assetType)}, sd.quantity)
  if (status === ApprovalState.APPROVED) {
    creatOrder.callback?.().then(console.log)
  } else {
    console.log('YOLO approval status', {status})
    approve()
  }
  */

  return (
    <StyledContainer>
      <GlitchText>Marketplace is coming soon, biatch!</GlitchText>
    </StyledContainer>
  );
};

export default MarketplacePage;
