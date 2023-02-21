import Grid from '@mui/material/Grid';
import { GlitchText, Loader } from 'ui';

import {
  useRawCollectionsFromList,
  RawCollection,
} from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import { useFetchCollectionMeta } from 'hooks/useFetchCollectionMeta/useFetchCollectionMeta';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useActiveWeb3React, useClasses } from 'hooks';
import { StringAssetType } from '../../utils/subgraph';
import { NETWORK_NAME } from '../../constants';
import { CollectionListItem } from 'components/CollectionListItem/CollectionListItem';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { collectionListStyles } from './collection-list.styles';

export const CollectionListPage = () => {
  const { chainId } = useActiveWeb3React();
  const rawCollections = useRawCollectionsFromList();
  const metas = useFetchCollectionMeta(rawCollections);

  const DEFAULT_PAGE_SIZE = 30;
  const [take, setTake] = useState<number>(0);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const { placeholderContainer } = useClasses(collectionListStyles);
  let collections: RawCollection[] = rawCollections.slice(
    0,
    take + DEFAULT_PAGE_SIZE
  );
  const handleScrollToBottom = useCallback(() => {
    if (pageLoading) return;
    if (rawCollections.length < take + DEFAULT_PAGE_SIZE) setPageLoading(true);
    console.log('SCROLLBOTTOM');
    collections = rawCollections.slice(0, take + DEFAULT_PAGE_SIZE);
    setPageLoading(false)
    setTake((state) => (state += DEFAULT_PAGE_SIZE));
  }, [DEFAULT_PAGE_SIZE]);

  useBottomScrollListener(handleScrollToBottom);

  // console.log('this runs', collections);
  return collections && collections.length > 0 ? (
    <>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
        <GlitchText variant="h1">Featured collections</GlitchText>
      </div>
      <Grid container spacing={2} style={{ marginTop: 12 }}>
        {collections.map((collection: RawCollection, i) => {
          return (
            <CollectionListItem
              collection={collection}
              salt={i}
              meta={metas[i]}
              key = {i}
            />
          );
        })}
      </Grid>
      {pageLoading && (
        <div className={placeholderContainer}>
          <Loader />
        </div>
      )}
    </>
  ) : (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 12 }}>
      <GlitchText variant="h1">
        {chainId
          ? `No collections found on ${NETWORK_NAME[chainId]}`
          : 'No collections found'}
      </GlitchText>
    </div>
  );
};
