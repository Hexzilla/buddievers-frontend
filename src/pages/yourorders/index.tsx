import { AddressZero } from '@ethersproject/constants';
import { Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import { useActiveWeb3React, useClasses } from 'hooks';
import { Order } from 'hooks/marketplace/types';
import { useTokenStaticData } from 'hooks/useTokenStaticData/useTokenStaticData';
import { Link } from 'react-router-dom';
import {
  Button,
  GlitchText,
  PriceBox,
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
  Tabs,
} from 'ui';
import { truncateHexString } from 'utils';
import {
  getDisplayQuantity,
  getDisplayUnitPrice,
  StrategyMap,
  stringToOrderType,
  formatExpirationDateString,
  OrderType,
} from '../../utils/subgraph';
import { appStyles } from '../../app.styles';
import { useCancelDialog } from '../../hooks/useCancelDialog/useCancelDialog';
import { usePurchaseDialog } from '../../hooks/usePurchaseDialog/usePurchaseDialog';
import { styles } from './styles';
import { useUserOrders } from 'hooks/marketplace/useUserOrders';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import {
  useApprovedPaymentCurrency,
  useApprovedPaymentCurrencyCallback,
} from 'hooks/useApprovedPaymentCurrencies/useApprovedPaymentCurrencies';
import { useState } from 'react';

const geTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Asset</TableCell>
        <TableCell>Action</TableCell>
        <TableCell>Unit Price</TableCell>
        <TableCell>Quantity</TableCell>
        <TableCell>Currency</TableCell>
        <TableCell>Expiration</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHeader>
  );
};

// TEST URL: http://localhost:3000/token/0xff3e85e33a8cfc73fe08f437bfaeadff7c95e285/0
export const MyOrdersPage = () => {
  const { chainId, account } = useActiveWeb3React();

  const { formBox, formLabel, formValue, formValueTokenDetails } =
    useClasses(appStyles);

  const {
    image,
    imageContainer,
    pageContainer,
    name,
    card,
    price,
    buttonsContainer,
    tabsContainer,
    tabs,
    externals,
    subHeader,
    subItemTitleCell,
    assetActionsBidTokenAmount,
    transferButton,
    newSellButton,
    tradeContainer,
    tradeRow,
    copyAddressButton,
  } = useClasses(styles);

  const { setPurchaseData, setPurchaseDialogOpen } = usePurchaseDialog();
  const { setCancelData, setCancelDialogOpen } = useCancelDialog();
  const [currentTab, setCurrentTab] = useState<number>(0);
  const decimalOverrides = useDecimalOverrides();

  const ordersMap = useUserOrders({
    from: 0,
    num: 1000,
  });

  const staticDatas = useTokenStaticData(
    (ordersMap?.userOrders ?? []).map((x) => {
      return stringToOrderType(x.orderType) === OrderType.BUY
        ? x?.buyAsset
        : x.sellAsset;
    })
  );

  const approvedPaymentCurrencyCallback = useApprovedPaymentCurrencyCallback();

  const getTableBody = (
    orders: Order[] | undefined | null,
    staticDatas: StaticTokenData[] | undefined
  ) => {
    return (
      <TableBody>
        {orders && staticDatas && orders.length > 0 ? (
          orders.map((order, i) => {
            const {
              id,
              seller,
              createdAt,
              strategyType,
              sellAsset,
              buyAsset,
              quantityLeft,
              askPerUnitDenominator,
              askPerUnitNominator,
              expiresAt,
              onlyTo,
              partialAllowed,
              orderType,
            } = order || {};

            const expiration = formatExpirationDateString(expiresAt);
            const sellerShort = truncateHexString(seller);
            const ot = stringToOrderType(orderType);
            console.log(ot);
            const orderAsset = ot === OrderType.BUY ? buyAsset : sellAsset;

            const currency = approvedPaymentCurrencyCallback(orderAsset);

            const decimals =
              decimalOverrides[orderAsset.assetAddress.toLowerCase()] ??
              staticDatas?.[i]?.decimals ??
              0;
            console.log('yada', { decimals, decimalOverrides });

            const displayUnitPrice = getDisplayUnitPrice(
              decimals,
              5,
              ot,
              askPerUnitNominator,
              askPerUnitDenominator
            );

            const qty = getDisplayQuantity(
              decimals,
              ot,
              quantityLeft,
              askPerUnitNominator,
              askPerUnitDenominator
            );

            console.log({
              displayUnitPrice,
              ot,
              askPerUnitNominator,
              askPerUnitDenominator,
            });

            return (
              <TableRow
                key={id}
                renderExpand={() => {
                  return (
                    <div>
                      <Typography className={subHeader}>
                        Order Details
                      </Typography>

                      <Grid container spacing={2}>
                        <Grid item xs={12}>
                          <Grid container spacing={2}>
                            <Grid item className={subItemTitleCell}>
                              Order ID
                            </Grid>
                            <Grid item>{id}</Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid item className={subItemTitleCell}>
                              Maker
                            </Grid>
                            <Grid item>{seller}</Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid item className={subItemTitleCell}>
                              Created at
                            </Grid>
                            <Grid item>
                              {formatExpirationDateString(createdAt)}
                            </Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid item className={subItemTitleCell}>
                              Available to
                            </Grid>
                            <Grid item>
                              {onlyTo === AddressZero ? 'everyone' : onlyTo}
                            </Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid item className={subItemTitleCell}>
                              Partial fills allowed
                            </Grid>
                            <Grid item>
                              {partialAllowed ? (
                                <DoneOutlineIcon aria-label="yes" />
                              ) : (
                                'no'
                              )}
                            </Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid item className={subItemTitleCell}>
                              Asset type
                            </Grid>
                            <Grid item>{orderAsset?.assetType}</Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid item className={subItemTitleCell}>
                              Asset address
                            </Grid>
                            <Grid item>{orderAsset?.assetAddress}</Grid>
                          </Grid>
                          <Grid container spacing={2}>
                            <Grid item className={subItemTitleCell}>
                              Asset ID
                            </Grid>
                            <Grid item>{orderAsset?.assetId}</Grid>
                          </Grid>
                        </Grid>
                      </Grid>
                    </div>
                  );
                }}
              >
                <TableCell title={id}>{truncateHexString(id)}</TableCell>
                <TableCell title={orderAsset?.id}>
                  <Link
                    to={`/token/${orderAsset?.assetType}/${orderAsset?.assetAddress}/${orderAsset?.assetId}`}
                  >
                    {truncateHexString(orderAsset?.id, 5)}
                  </Link>
                </TableCell>
                <TableCell>
                  {ot ? (OrderType.BUY === ot ? 'BUY' : 'SELL') : '?'}
                </TableCell>
                <TableCell>{displayUnitPrice?.toString()}</TableCell>
                <TableCell>{qty?.toString()}</TableCell>
                <TableCell>{currency.symbol}</TableCell>
                <TableCell>{expiration}</TableCell>
                <TableCell>
                  {seller.toLowerCase() === account?.toLowerCase() ? (
                    <Button
                      onClick={() => {
                        setCancelDialogOpen(true);
                        setCancelData({ orderHash: order.id });
                      }}
                      variant="contained"
                      color="secondary"
                    >
                      Cancel
                    </Button>
                  ) : (
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
                      Fill
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            );
          })
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
    <Grid container className={pageContainer} justifyContent="center">
      <Tabs
        containerClassName={tabsContainer}
        tabsClassName={tabs}
        currentTab={currentTab}
        onTabChanged={(value: number) => {
          setCurrentTab(value);
        }}
        tabs={[
          {
            label: 'Your Offers',
            view: (
              <Table isExpandable style={{ whiteSpace: 'nowrap' }}>
                {geTableHeader()}
                {getTableBody(ordersMap?.userOrders, staticDatas)}
              </Table>
            ),
          },
        ]}
      />
      <div style={{ marginTop: 40, width: '100%' }} />
    </Grid>
  );
};

export default MyOrdersPage;
