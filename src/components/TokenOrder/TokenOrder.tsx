import Typography from '@mui/material/Typography';
import { Media } from 'components';
import { ExternalLink } from 'components/ExternalLink/ExternalLink';
import { useActiveWeb3React, useClasses, usePurchaseDialog } from 'hooks';
import { Order } from 'hooks/marketplace/types';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { useNavigate  } from 'react-router-dom';
import { Button, PriceBox, TableCell, TableRow } from 'ui';
import { getExplorerLink, truncateHexString } from 'utils';
import { Fraction } from '../../utils/Fraction';
import {
  formatExpirationDateString,
  getDisplayUnitPrice,
  getUnitPrice,
  inferOrderTYpe,
  OrderType,
  StrategyMap,
  StringAssetType,
} from 'utils/subgraph';
import { styles } from './TokenOrder.styles';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import { useApprovedPaymentCurrency } from 'hooks/useApprovedPaymentCurrencies/useApprovedPaymentCurrencies';

export const TokenOrder = ({
  order,
  meta,
  staticData,
}: {
  meta: TokenMeta | undefined;
  staticData: StaticTokenData;
  order: Order;
}) => {
  const { image, imageContainer, tokenName, smallText } = useClasses(styles);
  let navigate = useNavigate();

  const { chainId } = useActiveWeb3React();
  const { setPurchaseData, setPurchaseDialogOpen } = usePurchaseDialog();
  const decimalOverrides = useDecimalOverrides();

  const ot = inferOrderTYpe(chainId, order.sellAsset, order.buyAsset);
  const asset = ot == OrderType.BUY ? order.buyAsset : order.sellAsset;
  const action = ot == OrderType.BUY ? 'BUY' : 'SELL';
  const actionColor = ot == OrderType.BUY ? 'green' : '#b90e0e';

  //const buttonLabel = ot == OrderType.BUY ? 'sell' : 'buy';

  const handleImageClick = () => {
    navigate(`/token/${asset.assetType}/${asset.assetAddress}/${asset.assetId}`);
  };

  const decimals =
    decimalOverrides[staticData?.asset?.assetAddress?.toLowerCase()] ??
    staticData?.decimals ??
    0;

  const currency = useApprovedPaymentCurrency(asset);

  const isErc721 =
    asset.assetType.valueOf() === StringAssetType.ERC721.valueOf();
  const sup = Fraction.from(
    staticData?.totalSupply?.toString() ?? '0',
    decimals
  );
  const totalSupplyString = isErc721
    ? 'unique'
    : sup
    ? `${sup} pieces`
    : undefined;
  const ppuD = getDisplayUnitPrice(
    decimals,
    5,
    ot,
    order?.askPerUnitNominator,
    order?.askPerUnitDenominator,
    true
  );

  const ppuDisplay = ppuD ? `${ppuD} ${currency.symbol}` : action;

  const expiration = formatExpirationDateString(order?.expiresAt);
  const strategyType = StrategyMap[order.strategyType.toLowerCase()];
  const createdAt = new Date(Number(order.createdAt) * 1000).toLocaleString();

  return (
    <TableRow>
      <TableCell>
        <div
          role="button"
          className={imageContainer}
          onClick={handleImageClick}
          onKeyPress={handleImageClick}
          tabIndex={0}
        >
          <Media uri={meta?.image} className={image} />
        </div>
        <Typography className={tokenName}>
          {[
            '0xb654611f84a8dc429ba3cb4fda9fad236c505a1a',
            '0x1b30a3b5744e733d8d2f19f0812e3f79152a8777',
            '0x1974eeaf317ecf792ff307f25a3521c35eecde86',
          ].includes(asset.assetAddress)
            ? meta?.name ?? truncateHexString(asset.assetId)
            : meta?.name
            ? `${meta?.name} #${truncateHexString(asset.assetId)}`
            : `#${truncateHexString(asset.assetId)}`}
        </Typography>
      </TableCell>
      <TableCell>
        <PriceBox margin={false} size="small" color={actionColor}>
          {ppuDisplay}
        </PriceBox>
      </TableCell>
      {/*TODO: Update Quantity*/}
      <TableCell>1</TableCell>
      <TableCell>
        <ExternalLink href={getExplorerLink(chainId, order?.seller, 'address')}>
          <Typography noWrap className={smallText}>
            {truncateHexString(order.seller)}
          </Typography>
        </ExternalLink>
      </TableCell>
      <TableCell>{strategyType}</TableCell>
      <TableCell>{createdAt}</TableCell>
      <TableCell>{expiration}</TableCell>
      <TableCell>
        <Button
          onClick={() => {
            setPurchaseDialogOpen(true);
            setPurchaseData({
              order,
              orderType: ot,
              approvedPaymentCurrency: currency,
            });
          }}
          variant="contained"
          color="primary"
        >
          Accept offer
        </Button>
      </TableCell>
    </TableRow>
  );
};
