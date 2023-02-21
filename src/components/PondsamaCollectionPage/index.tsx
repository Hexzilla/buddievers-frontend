import { isAddress } from '@ethersproject/address';
import { BigNumber } from '@ethersproject/bignumber';
import SearchIcon from '@mui/icons-material/SearchSharp';
import { Button, IconButton, InputAdornment, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { Token as TokenComponent } from 'components';
import { useClasses } from 'hooks';
import { Asset } from 'hooks/marketplace/types';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import { useRawcollection } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import {
  StaticTokenData,
  usePondsamaTokenStaticDataCallbackArrayWithFilter,
} from 'hooks/usePondsamaTokenStaticDataCallback/usePondsamaTokenStaticDataCallback';
import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import {
  useParams,
  useSearchParams,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { PondsamaFilter, GlitchText, Loader, Sort } from 'ui';
import { SortOption } from 'ui/Sort/Sort';
import { truncateHexString } from 'utils';
import {
  getAssetEntityId,
  StringAssetType,
  stringToStringAssetType,
  stringToOrderType,
  getDisplayUnitPrice,
} from 'utils/subgraph';
import { styles } from './styles';

import { useFloorOrder } from 'hooks/useFloorOrder/useFloorOrder';
import { useTokenStaticData } from 'hooks/useTokenStaticData/useTokenStaticData';
import { useFetchTokenUri } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri';
import { usePurchaseDialog } from '../../hooks/usePurchaseDialog/usePurchaseDialog';
import { useTokenBasicData } from 'hooks/useTokenBasicData.ts/useTokenBasicData';
import { useApprovedPaymentCurrency } from 'hooks/useApprovedPaymentCurrencies/useApprovedPaymentCurrencies';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';

const DEFAULT_PAGE_SIZE = 24;
const SEARCH_PAGE_SIZE = 50;

const PondsamaCollectionPage = () => {
  const [collection, setCollection] = useState<
    {
      meta: TokenMeta | undefined;
      staticData: StaticTokenData;
    }[]
  >([]);
  let navigate = useNavigate();
  const sampleLocation = useLocation();
  const [searchParams] = useSearchParams();
  const { address, type, subcollectionId } = useParams() as {
    address: string;
    type: string;
    subcollectionId: string;
  };
  const pageParamRes = searchParams.get('page');
  const pageParam = pageParamRes ? parseInt(pageParamRes) : 1;
  let search = searchParams.get('search') ?? '';
  let sortParam = searchParams.get('sort');
  let sort = sortParam ? parseInt(sortParam) : 3;
  const assetType = stringToStringAssetType(type);
  const asset: Asset = {
    assetAddress: address?.toLowerCase(),
    assetType: assetType,
    assetId: '0',
    id: getAssetEntityId(address?.toLowerCase(), '0'),
  };
  const recognizedCollection = useRawcollection(asset.assetAddress);
  const searchBarOn = recognizedCollection?.idSearchOn ?? true;
  const [filters, setFilters] = useState<PondsamaFilter | undefined>(undefined);
  const [sortBy, setSortBy] = useState<SortOption>(sort);
  const [paginationEnded, setPaginationEnded] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [searchCounter, setSearchCounter] = useState<number>(0);
  const [page, setPage] = useState<number>(pageParam);
  const [totalLength, setTotalLength] = useState<number>(0);
  const { placeholderContainer, container, paginationContainer } =
    useClasses(styles);
  const { register, handleSubmit } = useForm();
  let searchSize =
    filters?.selectedOrderType === undefined
      ? DEFAULT_PAGE_SIZE
      : SEARCH_PAGE_SIZE;
  let forTake = (pageParam - 1) * searchSize;
  const [take, setTake] = useState<number>(forTake);
  const displayFilters = assetType === StringAssetType.ERC721;

  const collectionName = recognizedCollection
    ? recognizedCollection.display_name
    : `Collection ${truncateHexString(address)}`;

  const getItemsWithFilterAndSort =
    usePondsamaTokenStaticDataCallbackArrayWithFilter(
      asset,
      subcollectionId,
      filters,
      sortBy
    ); //useTokenStaticDataCallback(asset)//

  function handleNavigate(searchParam: string, param: any) {
    let href = window.location.href;
    let temp = href.split('?');
    let path = '?' + temp[1];
    let newPath = sampleLocation.pathname;
    let ind = path.search(searchParam);
    if (ind !== -1) {
      newPath = newPath + path.slice(0, ind);
      ind += 3;
      for (; ind < path.length; ind++) {
        if (path[ind] === '&') break;
      }
      newPath = newPath + searchParam + param + path.slice(ind, path.length);
    } else newPath = newPath + path + searchParam + param;
    navigate(newPath);
  }

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      if (pageLoading) return;
      setCollection([]);
      handleNavigate('page=', value);
      setPage(value);
      setTake((state) => (state = searchSize * (value - 1)));
      setSearchCounter((state) => (state += 1));
    },
    []
  );

  useEffect(() => {
    const filter = searchParams.get('filter') ?? '';
    if (filter.length >= 1) {
      let newFilter: PondsamaFilter = JSON.parse(filter);
      searchSize =
        newFilter?.selectedOrderType === undefined
          ? DEFAULT_PAGE_SIZE
          : SEARCH_PAGE_SIZE;
      setFilters(newFilter);
      setCollection([]);
      setTake(0);
      setPage(1);
      setPageLoading(true);
      setPaginationEnded(false);
    }
    setSearchCounter((state) => (state += 1));
  }, []);

  useEffect(() => {
    const getCollectionById = async () => {
      setPageLoading(true);
      if (search === '') {
        const res: any = await getItemsWithFilterAndSort(
          searchSize,
          BigNumber.from(take),
          setCollection,
          0
        );
        setTotalLength(
          res % searchSize
            ? Math.floor(res / searchSize) + 1
            : Math.floor(res / searchSize)
        );
      } else {
        const res: any = await getItemsWithFilterAndSort(
          searchSize,
          BigNumber.from(0),
          setCollection,
          parseInt(search)
        );
        setTotalLength(
          res % searchSize
            ? Math.floor(res / searchSize) + 1
            : Math.floor(res / searchSize)
        );
      }
      setPageLoading(false);
    };
    if (!paginationEnded && searchCounter) {
      getCollectionById();
    }
  }, [address, searchCounter, paginationEnded, searchSize, sortBy]);

  if (assetType.valueOf() === StringAssetType.UNKNOWN) {
    throw Error('Asset type was not recognized');
  }
  if (!isAddress(address)) {
    throw Error('Address format is incorrect');
  }

  const handleTokenSearch = useCallback(
    async ({ tokenID }) => {
      handleNavigate('&search=', tokenID);
      handleNavigate('page=', '1');
      if (!!tokenID) {
        setPaginationEnded(true);
        setPageLoading(true);
        const res: any = await getItemsWithFilterAndSort(
          searchSize,
          BigNumber.from(0),
          setCollection,
          tokenID
        );
        setTotalLength(
          res % searchSize
            ? Math.floor(res / searchSize) + 1
            : Math.floor(res / searchSize)
        );
        setPageLoading(false);
      } else {
        setPaginationEnded(false);
        setPageLoading(true);
        const res: any = await getItemsWithFilterAndSort(
          searchSize,
          BigNumber.from(take),
          setCollection,
          0
        );
        setTotalLength(
          res % searchSize
            ? Math.floor(res / searchSize) + 1
            : Math.floor(res / searchSize)
        );
        setPageLoading(false);
      }
    },
    [searchSize, sortBy]
  );

  const handleFiltersUpdate = useCallback(async (filters: PondsamaFilter) => {
    let filterStrings = JSON.stringify(filters);
    handleNavigate('&filter=', filterStrings);
    handleNavigate('page=', '1');
    setCollection([]);
    setTake(0);
    setPage(1);
    setFilters(filters);
    setPageLoading(true);
    setPaginationEnded(false);
    setSearchCounter((state) => (state += 1));
  }, []);

  const handleSortUpdate = useCallback(async (sortBy: SortOption) => {
    setCollection([]);
    setTake(0);
    setPage(1);
    setSortBy(sortBy);
    handleNavigate('&sort=', sortBy);
    handleNavigate('page=', '1');
    setPageLoading(true);
    setPaginationEnded(false);
    setSearchCounter((state) => (state += 1));
  }, []);

  const { setPurchaseData, setPurchaseDialogOpen } = usePurchaseDialog();
  const floorAssetOrder = useFloorOrder(asset);
  const floorAssets = useMemo(() => {
    if (floorAssetOrder?.sellAsset) {
      return [floorAssetOrder.sellAsset] as Asset[];
    }
    return [] as Asset[];
  }, [floorAssetOrder]);

  const approvedPaymentCurrency = useApprovedPaymentCurrency(
    floorAssetOrder?.sellAsset || ({} as Asset)
  );
  const staticData = useTokenStaticData(floorAssets);
  const balanceData = useTokenBasicData(floorAssets);
  const metas = useFetchTokenUri(staticData);
  const decimalOverrides = useDecimalOverrides();

  const assetMeta = metas?.[0];

  const decimals =
    decimalOverrides[asset.assetAddress] ?? balanceData?.[0]?.decimals ?? 0;
  const tokenName = staticData?.[0]?.name;
  const tokenSymbol = staticData?.[0]?.symbol;

  const displayPPU = getDisplayUnitPrice(
    decimals,
    5,
    stringToOrderType(floorAssetOrder?.orderType),
    floorAssetOrder?.askPerUnitNominator,
    floorAssetOrder?.askPerUnitDenominator,
    true
  );

  return (
    <>
      <div className={container}>
        <GlitchText variant="h1">{collectionName}</GlitchText>
        <Stack
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
          spacing={{ xs: 1, sm: 2, md: 4 }}
          sx={{
            marginTop: '10px',
            padding: '16px',
          }}
          justifyContent="flex-end"
          alignItems="center"
        >
          {searchBarOn && (
            <div>
              <TextField
                placeholder="Search by token ID"
                variant="outlined"
                defaultValue={search}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="start">
                      <IconButton
                        onClick={handleSubmit(handleTokenSearch)}
                        onMouseDown={handleSubmit(handleTokenSearch)}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                {...register('tokenID')}
              />
            </div>
          )}

          {displayFilters && (
            <div>
              <PondsamaFilter onFiltersUpdate={handleFiltersUpdate} />
            </div>
          )}
          <div>
            <Sort onSortUpdate={handleSortUpdate} sortBy={sortBy} />
          </div>
        </Stack>
        {floorAssetOrder && assetMeta && recognizedCollection?.floorDisplay && (
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={{ xs: 1, sm: 2, md: 4 }}
            sx={{
              marginTop: '10px',
              padding: '16px',
            }}
            justifyContent="flex-end"
            alignItems="center"
          >
            <GlitchText>Floor NFT</GlitchText>: {assetMeta.name}{' '}
            {asset.assetAddress.toLowerCase() !==
            '0xb654611f84a8dc429ba3cb4fda9fad236c505a1a'
              ? `#${floorAssetOrder.sellAsset.assetId}`
              : ''}{' '}
            ({displayPPU} {approvedPaymentCurrency.symbol})
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={() => {
                setPurchaseDialogOpen(true);
                setPurchaseData({
                  order: floorAssetOrder,
                  orderType: stringToOrderType(floorAssetOrder.orderType),
                  decimals,
                  symbol: tokenSymbol,
                  name: tokenName,
                  approvedPaymentCurrency,
                });
              }}
            >
              {' '}
              Fill
            </Button>
          </Stack>
        )}
      </div>
      <Grid container alignContent="center">
        {collection.length ? (
          collection.map(
            (token, i) =>
              token && (
                <Grid
                  item
                  key={`${token.staticData.asset.id}-${i}`}
                  xs={12}
                  md={6}
                  lg={3}
                >
                  <TokenComponent {...token} />
                </Grid>
              )
          )
        ) : pageLoading ? (
          <></>
        ) : (
          <GlitchText>No items</GlitchText>
        )}
      </Grid>
      {pageLoading && (
        <div className={placeholderContainer}>
          <Loader />
        </div>
      )}

      <div className={paginationContainer}>
        <Pagination
          count={totalLength}
          siblingCount={0}
          boundaryCount={2}
          color="primary"
          size="large"
          page={page}
          onChange={handlePageChange}
          showFirstButton
          showLastButton
        />
      </div>
    </>
  );
};

export default PondsamaCollectionPage;
