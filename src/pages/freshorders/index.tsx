import { Chip, Stack } from '@mui/material';
import Grid from '@mui/material/Grid';
import Pagination from '@mui/material/Pagination';
import { Order } from '../../hooks/marketplace/types';
import { TokenMeta } from '../../hooks/useFetchTokenUri.ts/useFetchTokenUri.types';
import {
  useLatestBuyOrdersForTokenWithStaticCallback,
  useLatestSellOrdersForTokenWithStaticCallback,
} from 'hooks/useLatestOrdersWithStaticCallback/useLatestOrdersWithStaticCallback';
import { useRawCollectionsFromList } from '../../hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import { StaticTokenData } from '../../hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { useWhitelistedAddresses } from '../../hooks/useWhitelistedAddresses/useWhitelistedAddresses';
import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Drawer,
  GlitchText,
  Loader,
  Table,
  TableBody,
  TableCell,
  TableSortLabel,
  TableHeader,
  TableRow,
  Tabs,
} from 'ui';
import { orderFilter } from '../../utils/marketplace';
import { TokenOrder } from '../../components/TokenOrder/TokenOrder';
import { useActiveWeb3React, useClasses } from '../../hooks';
import { QUERY_COLLECTION_STATE } from 'subgraph/common';
import { DEFAULT_CHAIN, MARKETPLACE_SUBGRAPH_URLS } from '../../constants';
import {
  PAYMENT_Token_Address,
  PAMENT_CollectionAddress,
  PAMENT_Native_Token_Address,
} from '../../constants/paymenToken';
import { request } from 'graphql-request';
import { styles } from './styles';

type SortDirection = 'asc' | 'desc';

const PAGE_SIZE = 10;
const ExtendedTableHeader = ({
  handleSort,
  sortDirection,
  sortBy,
}: {
  handleSort: (sortBy: string) => void;
  sortDirection: SortDirection;
  sortBy: string;
}) => {
  return (
    <TableHeader>
      <TableRow>
        <TableCell>Item</TableCell>
        <TableCell sortDirection={sortBy === 'price' ? sortDirection : false}>
          <TableSortLabel
            active={sortBy === 'price'}
            direction={sortBy === 'price' ? sortDirection : 'asc'}
            onClick={() => {
              handleSort('price');
            }}
          >
            Unit Price
          </TableSortLabel>
        </TableCell>
        <TableCell
          sortDirection={sortBy === 'quantity' ? sortDirection : false}
        >
          <TableSortLabel
            active={sortBy === 'quantity'}
            direction={sortBy === 'quantity' ? sortDirection : 'asc'}
            onClick={() => {
              handleSort('quantity');
            }}
          >
            Quantity
          </TableSortLabel>
        </TableCell>
        <TableCell>From</TableCell>
        <TableCell>Strategy</TableCell>
        <TableCell sortDirection={sortBy === 'time' ? sortDirection : false}>
          <TableSortLabel
            active={sortBy === 'time'}
            direction={sortBy === 'time' ? sortDirection : 'asc'}
            onClick={() => {
              handleSort('time');
            }}
          >
            Created
          </TableSortLabel>
        </TableCell>
        <TableCell>Expiration</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHeader>
  );
};

const FreshOrdersPage = () => {
  const { chainId, account } = useActiveWeb3React();

  const [buyOrders, setBuyOrders] = useState<
    {
      meta: TokenMeta | undefined;
      staticData: StaticTokenData;
      order: Order;
    }[]
  >([]);

  const [sellOrders, setSellOrders] = useState<
    {
      meta: TokenMeta | undefined;
      staticData: StaticTokenData;
      order: Order;
    }[]
  >([]);

  const collections = useRawCollectionsFromList();
  let navigate = useNavigate();
  const sampleLocation = useLocation();
  const [searchParams] = useSearchParams();
  const sortByParam = searchParams.get('sortBy') ?? 'price';
  const tabParamRes = searchParams.get('tab');
  const tabParam = tabParamRes ? parseInt(tabParamRes) : 0;
  const sortDirectionParam = searchParams.get('sortDirection') ?? 'asc';
  const selectedIndexParamRes = searchParams.get('collIndex');
  const tempIndx =
    collections.findIndex((x) => (x.display_name = 'Moonsama')) ?? 0;
  const selectedIndexParam = selectedIndexParamRes
    ? parseInt(selectedIndexParamRes)
    : tempIndx;
  const pageParamRes = searchParams.get('page');
  const pageParam = pageParamRes ? parseInt(pageParamRes) : 1;
  const [selectedIndex, setSelectedIndex] =
    useState<number>(selectedIndexParam);
  const [take, setTake] = useState<number>((pageParam - 1) * PAGE_SIZE);
  const [paginationEnded, setPaginationEnded] = useState<boolean>(false);
  const [pageLoading, setPageLoading] = useState<boolean>(false);
  const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState(sortByParam);
  const [sortDirection, setSortDirection] = useState(
    sortDirectionParam as SortDirection
  );
  const [page, setPage] = useState<number>(pageParam);
  const [currentTab, setCurrentTab] = useState<number>(tabParam);
  const [sellTotalCount, setSellTotalCount] = useState<number>(1);
  const [buyTotalCount, setBuyTotalCount] = useState<number>(1);
  const [totalCount, setTotalCount] = useState<number>(1);

  const {
    placeholderContainer,
    container,
    pageContainer,
    tabsContainer,
    tabs,
    filterChip,
  } = useClasses(styles);
  const whitelist = useWhitelistedAddresses(); // REMOVEME later

  const getPaginatedSellOrders =
    useLatestSellOrdersForTokenWithStaticCallback();
  const getPaginatedBuyOrders = useLatestBuyOrdersForTokenWithStaticCallback();

  const selectedTokenAddress = collections[selectedIndex]?.address;

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

  useEffect(() => {
    if (chainId) {
      setBuyOrders([]);
      setSellOrders([]);
      setPaginationEnded(false);
      setPageLoading(false);
      setIsDrawerOpened(false);
      let newPath =
        sampleLocation.pathname +
        '?collIndex=' +
        selectedIndex +
        '&page=' +
        page +
        '&tab=' +
        currentTab +
        '&sortBy=' +
        sortBy +
        '&sortDirection=' +
        sortDirection;
      navigate(newPath);
    }
  }, [chainId, JSON.stringify(collections)]);

  const handleSortUpdate = (_sortBy: string) => {
    setBuyOrders([]);
    setSellOrders([]);
    setTake(0);
    setPaginationEnded(false);
    setPage(1);
    if (_sortBy !== sortBy) {
      handleNavigate('&sortBy=', _sortBy);
      handleNavigate('&sortDirection=', 'asc');
      handleNavigate('&page=', '1');
      setSortBy(_sortBy);
      setSortDirection('asc');
    } else {
      let tempSortDirection: SortDirection =
        sortDirection === 'asc' ? 'desc' : 'asc';
      setSortDirection(tempSortDirection);
      handleNavigate('&sortBy=', _sortBy);
      handleNavigate('&sortDirection=', tempSortDirection);
      handleNavigate('&page=', '1');
    }
  };

  const handleTabChange = (newValue: number) => {
    setBuyOrders([]);
    setSellOrders([]);
    setPaginationEnded(false);
    setCurrentTab(newValue);
    setPage(1);
    setTake(0);
    if (newValue == 0) {
      setSortBy('price');
      setSortDirection('asc');
      setTotalCount(sellTotalCount);
    } else {
      setSortBy('price');
      setSortDirection('desc');
      setTotalCount(buyTotalCount);
    }
    handleNavigate('&tab=', newValue);
    handleNavigate('&sortBy=', sortBy);
    handleNavigate('&sortDirection=', sortDirection);
    handleNavigate('&page=', '1');
  };

  const handleSelection = (i: number) => {
    if (i !== selectedIndex) {
      setBuyOrders([]);
      setSellOrders([]);
      setSelectedIndex(i);
      setTake(0);
      setPage(1);
      setPaginationEnded(false);
      handleNavigate('collIndex=', i);
      handleNavigate('&page=', '1');
    }
  };

  const handlePageChange = useCallback(
    (event: React.ChangeEvent<unknown>, value: number) => {
      if (pageLoading) return;
      setPage(value);
      setTake((state) => (state = PAGE_SIZE * (value - 1)));
      handleNavigate('&page=', value);

    },
    []
  );

  useEffect(() => {
    const getCollectionById = async () => {
      setPageLoading(true);
      let sellCount = 0,
        buyCount = 0;
      let foundIndex = selectedTokenAddress
        ? PAMENT_CollectionAddress.findIndex(
            (e) => e.address === selectedTokenAddress
          )
        : -1;

      if (foundIndex === -1) {
        let query = QUERY_COLLECTION_STATE(
          selectedTokenAddress.toLowerCase() +
            '-' +
            PAMENT_Native_Token_Address.toLowerCase()
        );
        let response = await request(
          MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
          query
        );
        sellCount = parseInt(response.collectionStat.activeSellOrderNum);
        buyCount = parseInt(response.collectionStat.activeBuyOrderNum);
      } else {
        let promises: Array<Promise<any>> = [];
        PAYMENT_Token_Address[PAMENT_CollectionAddress[foundIndex].name].map(
          (token: any) => {
            promises.push(
              new Promise(async (resolve, reject) => {
                let query = QUERY_COLLECTION_STATE(
                  selectedTokenAddress.toLowerCase() +
                    '-' +
                    token.address.toLowerCase()
                );
                let response = await request(
                  MARKETPLACE_SUBGRAPH_URLS[chainId ?? DEFAULT_CHAIN],
                  query
                );
                sellCount += parseInt(
                  response.collectionStat.activeSellOrderNum
                );
                buyCount += parseInt(response.collectionStat.activeBuyOrderNum);
                resolve(0);
              })
            );
          }
        );
        await Promise.all(promises);
      }
      sellCount =
        sellCount % 10
          ? Math.floor(sellCount / 10) + 1
          : Math.floor(sellCount / 10);
      buyCount =
        buyCount % 10
          ? Math.floor(buyCount / 10) + 1
          : Math.floor(buyCount / 10);
      setBuyTotalCount(buyCount);
      setSellTotalCount(sellCount);
      if (currentTab == 0) setTotalCount(sellCount);
      else setTotalCount(buyCount);
      let buyData = await getPaginatedBuyOrders(
        selectedTokenAddress,
        PAGE_SIZE,
        take,
        sortBy,
        sortDirection
      );
      let sellData = await getPaginatedSellOrders(
        selectedTokenAddress,
        PAGE_SIZE,
        take,
        sortBy,
        sortDirection
      );
      buyData = buyData.filter((x) =>
        whitelist.includes(x.order.buyAsset.assetAddress.toLowerCase())
      ); // REMOVEME later
      sellData = sellData.filter((x) =>
        whitelist.includes(x.order.sellAsset.assetAddress.toLowerCase())
      ); // REMOVEME later

      setPageLoading(false);

      const isEnd =
        buyData.some(({ meta }) => !meta) || sellData.some(({ meta }) => !meta);

      if (isEnd) {
        const buyPieces = buyData.filter(({ meta }) => !!meta);
        const sellPieces = sellData.filter(({ meta }) => !!meta);

        setPaginationEnded(true);
        setSellOrders(sellPieces);
        setBuyOrders(buyPieces);
        return;
      }
      setSellOrders(sellData);
      setBuyOrders(buyData);
    };
    if (!paginationEnded) {
      getCollectionById();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    take,
    currentTab,
    paginationEnded,
    selectedTokenAddress,
    sortBy,
    sortDirection,
  ]);

  const getTableBody = (
    filteredCollection:
      | {
          meta: TokenMeta | undefined;
          staticData: StaticTokenData;
          order: Order;
        }[]
      | undefined
      | null
  ) => {
    return (
      <TableBody>
        {filteredCollection && filteredCollection.length > 0 ? (
          filteredCollection.map(
            (token, i) =>
              token && (
                <TokenOrder
                  key={`${token.staticData.asset.id}-${i}`}
                  {...token}
                />
              )
          )
        ) : (
          <TableRow>
            <TableCell style={{ textAlign: 'center' }} colSpan={7}>
              No records available...
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    );
  };

  return (
    <>
      <div className={container}>
        <GlitchText variant="h1">Latest offers</GlitchText>
      </div>

      <Drawer
        anchor="left"
        open={isDrawerOpened}
        onClose={() => setIsDrawerOpened(false)}
        onOpen={() => setIsDrawerOpened(true)}
      >
        Filters
      </Drawer>

      <Grid container className={pageContainer} justifyContent="center">
        <Stack
          direction={{ xs: 'row' }}
          flexWrap={{ xs: 'wrap' }}
          justifyContent="center"
          alignItems="center"
        >
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
        <Tabs
          containerClassName={tabsContainer}
          tabsClassName={tabs}
          currentTab={currentTab}
          onTabChanged={(value: number) => {
            setCurrentTab(value);
            handleTabChange(value);
          }}
          tabs={[
            {
              label: 'Sell Offers',
              view: (
                <Table isExpandable style={{ whiteSpace: 'nowrap' }}>
                  <ExtendedTableHeader
                    handleSort={handleSortUpdate}
                    sortDirection={sortDirection}
                    sortBy={sortBy}
                  />
                  {getTableBody(
                    sellOrders?.filter((order) =>
                      orderFilter(order.order, account)
                    )
                  )}
                </Table>
              ),
            },
            {
              label: 'Buy Offers',
              view: (
                <Table isExpandable style={{ whiteSpace: 'nowrap' }}>
                  <ExtendedTableHeader
                    handleSort={handleSortUpdate}
                    sortDirection={sortDirection}
                    sortBy={sortBy}
                  />
                  {getTableBody(
                    buyOrders?.filter((order) =>
                      orderFilter(order.order, account)
                    )
                  )}
                </Table>
              ),
            },
          ]}
        />
        {/* <div style={{ marginTop: 40, width: '100%' }} /> */}
      </Grid>
      {pageLoading && (
        <div className={placeholderContainer}>
          <Loader />
        </div>
      )}
      <div className={placeholderContainer}>
        <Pagination
          count={totalCount}
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

export default FreshOrdersPage;
