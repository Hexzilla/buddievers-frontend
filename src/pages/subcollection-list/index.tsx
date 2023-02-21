import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Card,
  CardActions,
  CardContent,
  Collapse,
  IconButton,
  Typography,
} from '@mui/material';
import Grid from '@mui/material/Grid';
import { ExternalLink, Media } from 'components';
import { useActiveWeb3React, useClasses } from 'hooks';
import {
  CollectionMeta,
  useFetchSubcollectionMeta,
} from 'hooks/useFetchCollectionMeta/useFetchCollectionMeta';
import {
  RawCollection,
  RawSubcollection,
  useRawcollection,
} from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlitchText } from 'ui';
import { StringAssetType } from 'utils/subgraph';
import { appStyles } from '../../app.styles';
import { collectionListStyles } from './subcollection-list.styles';

export const SubcollectionListPage = () => {
  let { address } = useParams<{ address: string }>();

  const collection = useRawcollection(address ?? '');
  const subcollections = collection?.subcollections ?? [];
  const metas = useFetchSubcollectionMeta(subcollections);

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
        <GlitchText variant="h1">{collection?.display_name}</GlitchText>
      </div>

      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <GlitchText variant="h2">Subcollections</GlitchText>
      </div>

      <Grid container spacing={2} style={{ marginTop: 12 }}>
        {subcollections.map((subcollection, i) => {
          return SubcollectionListItem(
            collection,
            collection?.subcollections?.[i],
            metas[i],
            i
          );
        })}
      </Grid>
    </>
  );
};

const SubcollectionListItem = (
  collection: RawCollection | undefined,
  subcollection: RawSubcollection | undefined,
  meta: CollectionMeta | undefined,
  i: number
) => {
  const [isCollectionExpanded, setExpanded] = useState(false);

  const { chainId } = useActiveWeb3React();

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

  const isErc20 =
    collection?.type.valueOf() === StringAssetType.ERC20.valueOf();

  const itemsize = subcollection?.tokens.length;
  const itemstring = !!itemsize && itemsize > 0 ? `${itemsize} items` : '';

  return (
    <Grid
      item
      key={`${collection?.address ?? 'collection'}-${subcollection?.id}-${i}`}
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
              ? `/token/${collection?.type}/${collection?.address}/0`
              : `/collection/${collection?.type}/${
                  collection?.address
                }/${subcollection?.id ?? '0'}?page=1&sort=3`
          }
        >
          <div className={mediaContainer}>
            <Media uri={meta?.image} />
          </div>
          {/*<CardMedia
              className={cardMediaImage}
              src={WHITE_SUSU}
              title={collection.display_name}
            />*/}
        </Link>
        <CardContent>
          <Typography
            className={cardTitle}
            variant="body2"
            color="textSecondary"
            component="div"
          >
            <div className={collectionName}>{meta?.name}</div>
            <div className={collectionSymbol}>{itemstring}</div>
          </Typography>
          {/*<div className={collectionType}>By {meta?.artist}</div>*/}
          {meta?.external_link && meta?.artist && (
            <ExternalLink href={meta.external_link}>{meta.artist}</ExternalLink>
          )}
          {/*
            {collection?.address && chainId && (
              <ExternalLink
                href={getExplorerLink(chainId, collection.address, 'address')}
              >
                {truncateHexString(collection.address)}↗
              </ExternalLink>
            )}
            */}
        </CardContent>

        <Collapse in={isCollectionExpanded} timeout="auto" unmountOnExit>
          <CardContent style={{ padding: '8px 16px' }}>
            <Typography paragraph className={collectionDescription}>
              {meta?.description}
            </Typography>
          </CardContent>
        </Collapse>
        <CardActions disableSpacing style={{ maxHeight: 0 }}>
          <IconButton
            className={isCollectionExpanded ? expandOpen : expand}
            onClick={handleExpandClick}
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
