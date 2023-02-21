import { CardActions, CardContent, Chip, Collapse, IconButton, Paper, Typography, useTheme } from '@mui/material';
import { Media } from 'components';
import { useNavigate } from 'react-router-dom';
import { GlitchText, PriceBox } from 'ui';
import { truncateHexString } from 'utils';
import { Fraction } from 'utils/Fraction';
import {
  getDisplayUnitPrice,
  OrderType,
  StringAssetType,
  stringToOrderType,
} from 'utils/subgraph';
import { styles } from './Token.styles';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { Order } from 'hooks/marketplace/types';
import { useEffect, useState } from 'react';
import { useAssetOrdersCallback } from 'hooks/marketplace/useAssetOrders';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import { useApprovedPaymentCurrency } from 'hooks/useApprovedPaymentCurrencies/useApprovedPaymentCurrencies';
import { useClasses } from 'hooks';
import { orderFilter } from 'utils/marketplace';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import { appStyles } from '../../app.styles';
import { getAttributesList } from 'utils/meta';
import { useRawcollection } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';

export interface TokenData {
  meta: TokenMeta | undefined;
  staticData: StaticTokenData;
  order?: Order | undefined;
}

export const Token = ({ meta, staticData, order }: TokenData) => {
  const {
    container,
    image,
    imageContainer,
    nameContainer,
    stockContainer,
    tokenName,
    traitChip
  } = useClasses(styles);

  const { expand, expandOpen } = useClasses(appStyles);

  const theme = useTheme()

  let navigate = useNavigate();
  const [fetchedOrder, setFetchedOrer] = useState<Order | undefined>(undefined);
  const decimalOverrides = useDecimalOverrides();

  const [isCollectionExpanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!isCollectionExpanded);
  };

  const asset = staticData.asset;

  const rawCollection = useRawcollection(asset?.assetAddress)

  const handleImageClick = () => {
    navigate(`/token/${asset.assetType}/${asset.assetAddress}/${asset.assetId}`);
  };

  const getOrderCB = useAssetOrdersCallback(
    asset.assetAddress,
    asset.assetId,
    false,
    true
  );
  const currency = useApprovedPaymentCurrency(asset);

  useEffect(() => {
    //console.log('useEffect run!');
    const fetch = async () => {
      const os: Order[] = await getOrderCB();
      const o: Order | undefined = os.filter(order => orderFilter(order, undefined)).reduce(
        (prev: Order | undefined, current: Order | undefined) => {
          if (prev && current) {
            if (prev.pricePerUnit.lt(current.pricePerUnit)) {
              return prev;
            } else {
              return current;
            }
          }
          return current;
        },
        undefined
      );
      console.log('useEffect run fetch', { os, o });
      if (o) {
        setFetchedOrer(o);
      }
    };
    if (!order) {
      fetch();
    }
  }, []);

  const finalOrder = order ?? fetchedOrder;

  const orderType = stringToOrderType(finalOrder?.orderType);

  const color = orderType === OrderType.BUY ? 'green' : '#b90e0e';

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

  const displayPPU = getDisplayUnitPrice(
    decimals,
    5,
    orderType,
    finalOrder?.askPerUnitNominator,
    finalOrder?.askPerUnitDenominator,
    true
  );

  let displayName = truncateHexString(asset.assetId)
  if (meta?.name) {
    if (asset.assetAddress.toLowerCase() === '0xfEd9e29b276C333b2F11cb1427142701d0D9f7bf'.toLowerCase()) {
      displayName = `${meta?.name} #${truncateHexString(asset.assetId)}`
    } else if (asset.assetAddress.toLowerCase() === '0xa17A550871E5F5F692a69a3ABE26e8DBd5991B75'.toLowerCase()) {
      displayName = `Plot #${truncateHexString(asset.assetId)}`
    } else {
      displayName = `${meta?.name}`
    }
  }

  const totalSupplyString =
    isErc721 || sup?.toString() === '1'
      ? 'unique'
      : sup
        ? `${sup} pieces`
        : undefined;

  return (
    <Paper className={container}>
      <div
        onClick={handleImageClick}
        onKeyPress={handleImageClick}
        style={{ cursor: 'pointer' }}
      >
        <div role="button" className={imageContainer} tabIndex={0}>
          <Media uri={meta?.image} className={image} />
        </div>
        <div className={nameContainer}>
          <GlitchText
            className={tokenName}
            variant="h1"
            style={{ margin: '12px 0' }}
          >
            {/** FIXME BLACKLIST */}
            {displayName}
          </GlitchText>
          {displayPPU && displayPPU !== '?' && (
            <PriceBox margin={false} size="small" color={color}>
              {displayPPU} {currency.symbol}
            </PriceBox>
          )}
        </div></div>
      <div className={stockContainer}>
        {staticData?.symbol && (
          <Typography color="textSecondary">{`${staticData.symbol} #${asset.assetId}`}</Typography>
        )}
        {totalSupplyString && (
          <Typography color="textSecondary">{totalSupplyString}</Typography>
        )}
        <CardActions disableSpacing style={{ maxHeight: 0 }}>
          <IconButton
            className={isCollectionExpanded ? expandOpen : expand}
            onClick={() => handleExpandClick()}
            aria-expanded={isCollectionExpanded}
            aria-label="show more"
          //style={{ marginTop: '-32px' }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </div>
      <Collapse in={isCollectionExpanded} timeout="auto" unmountOnExit>
        <CardContent style={{ /*padding: '8px 16px',*/ paddingTop: theme.spacing(3) }}>
          <Typography paragraph style={{ fontSize: '12px' }}>
            {meta?.description}
          </Typography>
          {rawCollection?.showAttributes && (
            <div /*style={{ paddingTop: theme.spacing(1) }}*/>
              <Typography color="textSecondary" style={{ fontSize: '12px' }}>
                {getAttributesList(meta?.attributes)?.map((label) => (
                  <Chip label={label} className={traitChip} />
                ))}
              </Typography>
            </div>
          )}
        </CardContent>
      </Collapse>
    </Paper>
  );
};
