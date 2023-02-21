import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import { TokenTrade } from 'components/TokenTrade/TokenTrade';
import { useClasses } from 'hooks';
import { FillWithOrder } from 'hooks/marketplace/types';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { useLatestTradesWithStaticCallback } from 'hooks/useLatestTradesWithStaticCallback/useLatestTradesWithStaticCallback';
import { useRawCollectionsFromList } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { useWhitelistedAddresses } from 'hooks/useWhitelistedAddresses/useWhitelistedAddresses';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useBottomScrollListener } from 'react-bottom-scroll-listener';
import { GlitchText, Loader } from 'ui';
import { styles } from './styles';

const PAGE_SIZE = 10;

const AuctionListPage = () => {
  const [collection, setCollection] = useState<
    {
      meta: TokenMeta | undefined;
      staticData: StaticTokenData;
      fill: FillWithOrder;
    }[]
  >([]);
  const [take, setTake] = useState<number>(0);
  const [paginationEnded, setPaginationEnded] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);

  const { placeholderContainer, container, filterChip } = useClasses(styles);

  const getPaginatedItems = useLatestTradesWithStaticCallback();
  const collections = useRawCollectionsFromList();
  const [selectedIndex, setSelectedIndex] = useState<number | undefined>(3);
  const [searchCounter, setSearchCounter] = useState<number>(0);

  const handleScrollToBottom = useCallback(() => {
    setTake((state) => (state += PAGE_SIZE));
    setSearchCounter((state) => (state += 1));
  }, []);

  useBottomScrollListener(handleScrollToBottom, { offset: 400 });

  const whitelist = useWhitelistedAddresses(); // REMOVEME later

  const selectedTokenAddress =
    selectedIndex === undefined
      ? undefined
      : collections[selectedIndex]?.address?.toLowerCase();

  useEffect(() => {
    const getCollectionById = async () => {
      setPageLoading(true);
      let data = await getPaginatedItems(
        PAGE_SIZE,
        take,
        'time',
        'desc',
        selectedTokenAddress,
        setTake
      );
      data = data.filter((x) =>
        whitelist.includes(x.staticData.asset.assetAddress.toLowerCase())
      ); // REMOVEME later
      setPageLoading(false);
      const isEnd = data.some(({ meta }) => !meta);

      //console.log('IS END', {paginationEnded, isEnd, pieces, data})

      //console.log('FRESH', {data, PAGE_SIZE, take, isEnd})

      if (isEnd) {
        const pieces = data.filter(({ meta }) => !!meta);
        setPaginationEnded(true);
        setCollection((state) => state.concat(pieces));
        return;
      }
      setCollection((state) => state.concat(data));
    };
    if (!paginationEnded) {
      getCollectionById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchCounter, paginationEnded, selectedTokenAddress]);

  const handleSelection = (i: number | undefined) => {
    if (i !== selectedIndex) {
      setCollection([]);
      setSelectedIndex(i);
      setTake(0);
      setSearchCounter(0);
      setPaginationEnded(false);
    }
  };

  return (
    <>
      <div className={container}>
        <GlitchText variant="h1">Active Auctions</GlitchText>
      </div>
      <Grid container display="flex" justifyContent="center">
        <Stack
          direction={{ xs: 'row' }}
          flexWrap={{ xs: 'wrap' }}
          justifyContent="center"
          alignItems="center"
        >
          <Chip
            key="all"
            label="All"
            variant="outlined"
            onClick={() => handleSelection(undefined)}
            className={`${filterChip}${
              selectedIndex === undefined ? ' selected' : ''
            }`}
          />
          {collections.map((collection, i) => {
            return (
              <Chip
                key={`${collection.address}-${i}`}
                label={collection.display_name}
                variant="outlined"
                onClick={() => handleSelection(i)}
                className={`${filterChip}${
                  selectedIndex === i ? ' selected' : ''
                }`}
              />
            );
          })}
        </Stack>
      </Grid>
      <Grid container spacing={1}>
        {collection
          .map(
            (token, i) =>
              token && (
                <Grid
                  item
                  key={`${token.staticData.asset.id}-${i}`}
                  xs={12}
                  md={6}
                  lg={3}
                >
                  <TokenTrade {...token} />
                </Grid>
              )
          )
          .filter((x) => !!x)}
      </Grid>
      {pageLoading && (
        <div className={placeholderContainer}>
          <Loader />
        </div>
      )}
    </>
  );
};

export default AuctionListPage;
