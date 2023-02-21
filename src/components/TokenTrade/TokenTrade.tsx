import { Box } from '@mui/material';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { Media } from 'components';
import { ExternalLink } from 'components/ExternalLink/ExternalLink';
import { useActiveWeb3React, useClasses } from 'hooks';
import { FillWithOrder, Order } from 'hooks/marketplace/types';
import { useApprovedPaymentCurrency } from 'hooks/useApprovedPaymentCurrencies/useApprovedPaymentCurrencies';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { useNavigate  } from 'react-router-dom';
import { GlitchText, PriceBox } from 'ui';
import { getExplorerLink, truncateHexString } from 'utils';
import { Fraction } from 'utils/Fraction';
import {
  getDisplayUnitPrice,
  inferOrderTYpe,
  OrderType,
  StringAssetType,
} from 'utils/subgraph';
import { styles } from './TokenTrade.styles';

export const TokenTrade = ({
  fill,
  meta,
  staticData,
}: {
  meta: TokenMeta | undefined;
  staticData: StaticTokenData;
  fill: FillWithOrder;
}) => {
  const {
    container,
    image,
    imageContainer,
    nameContainer,
    stockContainer,
    tokenName,
    mr,
    lastPriceContainer,
    smallText,
  } = useClasses(styles);
  const navigate = useNavigate ();

  const { chainId } = useActiveWeb3React();
  const decimalOverrides = useDecimalOverrides();
  const ot = inferOrderTYpe(chainId, fill.order.sellAsset, fill.order.buyAsset);
  const asset =
    ot == OrderType.BUY ? fill.order.buyAsset : fill.order.sellAsset;
  const action = ot == OrderType.BUY ? 'BUY' : 'SELL';
  const actionColor = ot == OrderType.BUY ? 'green' : '#b90e0e';

  //console.log('FRESH', {asset, action, actionColor})

  const handleImageClick = () => {
    navigate(`/token/${asset.assetType}/${asset.assetAddress}/${asset.assetId}`);
  };

  const decimals =
    decimalOverrides[staticData?.asset?.assetAddress?.toLowerCase()] ??
    staticData?.decimals ??
    0;

  const isErc721 =
    asset.assetType.valueOf() === StringAssetType.ERC721.valueOf();
  const sup = Fraction.from(
    staticData?.totalSupply?.toString() ?? '0',
    decimals
  )?.toFixed(0);
  const totalSupplyString = isErc721
    ? 'unique'
    : sup
    ? `${sup} pieces`
    : undefined;

  const rawunit =
    ot == OrderType.BUY
      ? fill.buyerSendsAmountFull
      : fill.order?.askPerUnitDenominator
          .mul(fill.buyerSendsAmountFull)
          .div(fill.order?.askPerUnitNominator);

  const unit = Fraction.from(
    rawunit?.toString() ?? '0',
    decimals
  )?.toSignificant(5);

  const currency = useApprovedPaymentCurrency(asset);

  const ppud = getDisplayUnitPrice(
    decimals,
    5,
    ot,
    fill.order?.askPerUnitNominator,
    fill.order?.askPerUnitDenominator,
    true
  );
  const ppuDisplay =
    !!ppud && ppud !== '?' ? `${ppud} ${currency.symbol}` : action;

  return (
    <Paper className={container}>
      <div
        role="button"
        className={imageContainer}
        onClick={handleImageClick}
        onKeyPress={handleImageClick}
        tabIndex={0}
      >
        <Media uri={meta?.image} className={image} />
      </div>
      <div className={nameContainer}>
        <GlitchText className={tokenName} style={{ margin: '7px 0 0' }}>
          {[
            '0xb654611f84a8dc429ba3cb4fda9fad236c505a1a',
            '0x1b30a3b5744e733d8d2f19f0812e3f79152a8777',
            '0x1974eeaf317ecf792ff307f25a3521c35eecde86',
          ].includes(asset.assetAddress)
            ? meta?.name ?? truncateHexString(asset.assetId)
            : meta?.name
            ? `${meta?.name} #${truncateHexString(asset.assetId)}`
            : `#${truncateHexString(asset.assetId)}`}
        </GlitchText>
        <Box textAlign="right">
          <PriceBox margin={false} size="small" color={actionColor}>
            {ppuDisplay}
          </PriceBox>
        </Box>
      </div>
      <div className={stockContainer}>
        {staticData?.symbol && (
          <Typography color="textSecondary">{staticData.symbol}</Typography>
        )}
        {totalSupplyString && (
          <Typography color="textSecondary">{totalSupplyString}</Typography>
        )}
      </div>
      <div className={lastPriceContainer}>
        <ExternalLink href={getExplorerLink(chainId, fill.id, 'transaction')}>
          <Typography className={smallText} noWrap>
            {unit?.toString()} taken
          </Typography>
        </ExternalLink>
        <Typography color="textSecondary" noWrap className={mr}>
          by
        </Typography>
        {/*<Typography color="textSecondary" noWrap>
          {truncateHexString(order.seller)}
        </Typography>*/}
        <ExternalLink href={getExplorerLink(chainId, fill.buyer, 'address')}>
          <Typography className={smallText} noWrap>
            {truncateHexString(fill.buyer)}
          </Typography>
        </ExternalLink>
      </div>
    </Paper>
  );
};
