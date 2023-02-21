import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Media } from 'components';
import { useActiveWeb3React, useClasses } from 'hooks';
import { Asset } from 'hooks/marketplace/types';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { useNavigate  } from 'react-router-dom';
import { GlitchText } from 'ui';
import { formatAmountFractionString, truncateHexString } from 'utils';
import { StringAssetType } from 'utils/subgraph';
import { styles } from './TokenOwned.styles';
import { Fraction } from 'utils/Fraction';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import Collapse from '@mui/material/Collapse';
import CardContent from '@mui/material/CardContent';
import { useState } from 'react';
import CardActions from '@mui/material/CardActions';
import IconButton from '@mui/material/IconButton';
import { appStyles } from '../../app.styles';
import { getAttributesList } from 'utils/meta';
import Chip from '@mui/material/Chip';
import { useRawcollection } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import { theme } from 'theme/Theme';

export const TokenOwned = ({
  meta,
  staticData,
  asset,
  balance
}: {
  meta: TokenMeta | undefined;
  staticData: StaticTokenData;
  asset: Asset;
  balance: string;
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
    traitChip
  } = useClasses(styles);

  const { expand, expandOpen } = useClasses(appStyles);

  const navigate = useNavigate ();

  const { chainId } = useActiveWeb3React();
  const decimalOverrides = useDecimalOverrides();
  const [isCollectionExpanded, setExpanded] = useState(false);
  const rawCollection = useRawcollection(asset?.assetAddress)

  const handleExpandClick = () => {
    setExpanded(!isCollectionExpanded);
  };

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

  const balanceString = isErc721 ? 'unique' : balance ? formatAmountFractionString(Fraction.from(balance, decimals)?.toFixed(2)) : undefined;

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
        {/*<img src={LootBox} style={{width: '100%', height: 'auto'}}/>*/}
      </div>
      <div className={nameContainer}>
        <GlitchText className={tokenName}>
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
      </div>
      <div className={stockContainer}>
        {staticData?.symbol && (
          <Typography color="textSecondary">{staticData.symbol}</Typography>
        )}
        {balanceString && (
          <Typography color="textSecondary">{balanceString}</Typography>
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
        <CardContent style={{ /*padding: '8px 16px',*/ paddingTop: theme.spacing(2) }}>
          <Typography paragraph style={{ fontSize: '12px' }}>
            {meta?.description}
          </Typography>
          {rawCollection?.showAttributes && (
            <div style={{ paddingTop: theme.spacing(1) }}>
              <Typography color="textSecondary" style={{ fontSize: '12px' }}>
                {getAttributesList(meta?.attributes)?.map((label, i) => (
                  <Chip key={`${label}-${i}`} label={label} className={traitChip} />
                ))}
              </Typography>
            </div>
          )}
        </CardContent>
      </Collapse>
    </Paper>
  );
};
