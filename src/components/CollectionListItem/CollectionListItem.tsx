import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { appStyles } from '../../app.styles';
import { collectionListStyles } from './CollectionListItem.style';
import { RawCollection } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import { CollectionMeta } from 'hooks/useFetchCollectionMeta/useFetchCollectionMeta';
import { ExternalLink, Media } from 'components';
import { getExplorerLink, truncateHexString } from 'utils';
import { useActiveWeb3React, useClasses } from 'hooks';
import { StringAssetType } from '../../utils/subgraph';

export type CollectionListItemProps = {
  collection: RawCollection;
  meta: CollectionMeta | undefined;
  salt: number;
};

export const CollectionListItem = ({
  collection,
  meta,
  salt,
}: CollectionListItemProps) => {
  const { chainId } = useActiveWeb3React();
  const [isCollectionExpanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!isCollectionExpanded);
  };

  const { expand, expandOpen } = useClasses(appStyles);
  const {
    mediaContainer,
    cardTitle,
    collectionName,
    collectionSymbol,
    collectionType,
    card,
    collectionDescription,
  } = useClasses(collectionListStyles);

  //console.warn('META', { meta });

  const isErc20 = collection.type.valueOf() === StringAssetType.ERC20.valueOf();
  const subcollection = collection.subcollections;

  return (
    <Grid
      item
      key={`${collection?.address ?? 'collection'}-${salt}`}
      xl={3}
      md={4}
      sm={6}
      xs={12}
    >
      <Card className={card}>
        <Link
          style={{
            display: 'flex',
            justifyContent: 'center',
          }}
          to={
            isErc20
              ? `/token/${collection.type}/${collection.address}/0`
              : !!subcollection
              ? `/subcollections/${collection.address}`
              : `/collection/${collection.type}/${collection.address}/0?page=1&sort=3`
          }
        >
          <div className={mediaContainer}>
            <Media uri={meta?.image} />
          </div>
        </Link>
        <CardContent>
          <Typography
            className={cardTitle}
            variant="body2"
            color="textSecondary"
            component="div"
          >
            <div className={collectionName}>{collection.display_name}</div>
            <div className={collectionSymbol}>{collection.symbol}</div>
          </Typography>
          <div className={collectionType}>{collection.type}</div>
          {collection?.address && chainId && (
            <ExternalLink
              href={getExplorerLink(chainId, collection.address, 'address')}
            >
              {truncateHexString(collection.address)}↗
            </ExternalLink>
          )}
        </CardContent>

        <Collapse in={isCollectionExpanded} timeout="auto" unmountOnExit>
          <CardContent style={{ padding: '8px 16px' }}>
            <Typography paragraph className={collectionDescription}>
              {meta?.description}
            </Typography>
            {meta?.external_link && (
              <ExternalLink href={meta?.external_link}>
                External site↗
              </ExternalLink>
            )}
          </CardContent>
        </Collapse>
        <CardActions disableSpacing style={{ maxHeight: 0 }}>
          <IconButton
            className={isCollectionExpanded ? expandOpen : expand}
            onClick={() => handleExpandClick()}
            aria-expanded={isCollectionExpanded}
            aria-label="show more"
            style={{ marginTop: '-32px' }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
      </Card>
    </Grid>
  );
};
