import { AddressZero } from '@ethersproject/constants';
import { Chip, Stack, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Tooltip from '@mui/material/Tooltip';
import Switch from '@mui/material/Switch';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import MoneyIcon from '@mui/icons-material/Money';
import SyncAltIcon from '@mui/icons-material/SyncAltSharp';
import { AddressDisplayComponent } from 'components/form/AddressDisplayComponent';
import { useActiveWeb3React, useBidDialog, useClasses } from 'hooks';
import { LastTradedPrice, Order } from 'hooks/marketplace/types';
import { useTokenPageOrders } from 'hooks/marketplace/useTokenPageOrders';
import { useFetchTokenUri } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri';
import { useTokenBasicData } from 'hooks/useTokenBasicData.ts/useTokenBasicData';
import { useTokenStaticData } from 'hooks/useTokenStaticData/useTokenStaticData';
import { useTransferDialog } from 'hooks/useTransferDialog/useTransferDialog';
import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import { getExplorerLink, truncateHexString } from 'utils';
import { appStyles } from '../../app.styles';
import { ExternalLink, Media } from '../../components';
import { ChainId } from '../../constants';
import { useCancelDialog } from '../../hooks/useCancelDialog/useCancelDialog';
import { usePurchaseDialog } from '../../hooks/usePurchaseDialog/usePurchaseDialog';
import {
  getAssetEntityId,
  getDisplayQuantity,
  StringAssetType,
  stringToOrderType,
  stringToStringAssetType,
  formatExpirationDateString,
  getDisplayUnitPrice,
  OrderType,
  getLastTradedPrice,
} from '../../utils/subgraph';
import { styles } from './styles';
import { useLastTradedPrice } from 'hooks/marketplace/useLastTradedPrice';
import { Fraction } from 'utils/Fraction';
import { MOONSAMA_TRAITS, MOONSAMA_MAX_SUPPLY } from 'utils/constants';
import { useWhitelistedAddresses } from 'hooks/useWhitelistedAddresses/useWhitelistedAddresses';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import uriToHttp from 'utils/uriToHttp';
import { getAttributesList, getMinecraftSkinUrl } from 'utils/meta';
import { useApprovedPaymentCurrency } from 'hooks/useApprovedPaymentCurrencies/useApprovedPaymentCurrencies';
import { useRawcollection } from 'hooks/useRawCollectionsFromList/useRawCollectionsFromList';
import { RARITY_COLORS } from 'constants/colors';
import { orderFilter } from '../../utils/marketplace';
import { theme } from 'theme/Theme';

const geTableHeader = () => {
  return (
    <TableHeader>
      <TableRow>
        <TableCell>ID</TableCell>
        <TableCell>Unit Price</TableCell>
        <TableCell>Quantity</TableCell>
        <TableCell>Currency</TableCell>
        <TableCell>Expiration</TableCell>
        <TableCell>Maker</TableCell>
        <TableCell></TableCell>
      </TableRow>
    </TableHeader>
  );
};

// TEST URL: http://localhost:3000/token/0xff3e85e33a8cfc73fe08f437bfaeadff7c95e285/0
const TokenPage = () => {
  const { chainId, account } = useActiveWeb3React();
  const whitelist = useWhitelistedAddresses(); // REMOVEME later
  let { id, address, type } = useParams() as {
    id: string;
    address: string;
    type: string;
  };
  const assetType = stringToStringAssetType(type);

  if (assetType.valueOf() === StringAssetType.UNKNOWN.valueOf())
    throw Error('Token type was not recognized');

  if (address.toLowerCase() === AddressZero) throw Error('Nonexistant token');

  if (!whitelist.includes(address.toLowerCase())) {
    console.log({ whitelist, address });
    // REMOVEME later
    throw Error('Unsupported token');
  }

  if (assetType.valueOf() === StringAssetType.ERC20.valueOf())
    throw Error('ERC20 trades are not enabled yet');

  if (!id) {
    if (assetType.valueOf() !== StringAssetType.ERC20.valueOf()) {
      throw Error('Token ID was not given');
    }
  }

  const asset = {
    assetType,
    assetAddress: address?.toLowerCase(),
    assetId: id,
    id: getAssetEntityId(address, id),
  };

  const ordersMap = useTokenPageOrders({
    assetId: id,
    assetAddress: address?.toLowerCase(),
    from: 0,
    num: 1000,
  });

  const ltp = useLastTradedPrice({
    assetId: id,
    assetAddress: address?.toLowerCase(),
  }) as LastTradedPrice;

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
    smallText,
    traitChip,
    rarityChip,
    artist,
  } = useClasses(styles);

  const { setBidDialogOpen, setBidData } = useBidDialog();
  const { setPurchaseData, setPurchaseDialogOpen } = usePurchaseDialog();
  const { setCancelData, setCancelDialogOpen } = useCancelDialog();
  const { setTransferData, setTransferDialogOpen } = useTransferDialog();
  const [metaVersion, setMetaVersion] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<number>(0);

  const assets = useMemo(() => {
    return [asset];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chainId, asset.assetAddress, asset.assetType, asset.assetId]);

  const rawCollection = useRawcollection(asset.assetAddress);

  const approvedPaymentCurrency = useApprovedPaymentCurrency(asset);

  const staticData = useTokenStaticData(assets);
  const balanceData = useTokenBasicData(assets);
  const metas = useFetchTokenUri(staticData, metaVersion);
  const decimalOverrides = useDecimalOverrides();

  //console.log('METAS', {metas, staticData})

  //console.error('ERRRORORS', {asset, assets, staticData, balanceData, metas, chainId, account})

  //const currencyLogo = useCurrencyLogo(asset.assetAddress);
  //const auctiondetails = useAuction(asset.assetAddress, asset.assetId)
  // check deadline
  // if deadline is passed, check if there was a sell order after deadline
  // 1. now is before deadline -> business as usual
  // 2. now is after deadline: auction mode ON -> BIDDING IS OFF
  // - check current highest bid
  // - fetch the bids between deadline and next 5 minutes, get the highest one.
  // - if there isn't a highest one in the next 5 minutes,
  //        - if now > those extra 5 minutes, auction ends, and the winner is the highest one => bidding over
  //        - if now <= those extra five minutes -> Bidding is ON -> Minimum increment requirement is needed
  // - if there is a highest one, keep note of it and repeat loop

  const isErc20 = asset.assetType.valueOf() === StringAssetType.ERC20.valueOf();
  const isErc721 =
    asset.assetType.valueOf() === StringAssetType.ERC721.valueOf();

  const owner = balanceData?.[0].owner;

  const assetMeta = metas?.[0];

  const decimals =
    decimalOverrides[asset.assetAddress] ?? balanceData?.[0]?.decimals ?? 0;
  const tokenName = staticData?.[0]?.name;
  const tokenSymbol = staticData?.[0]?.symbol;

  const isFungible = decimals > 0;

  let userBalanceString = isFungible
    ? Fraction.from(
        balanceData?.[0]?.userBalance?.toString() ?? '0',
        decimals
      )?.toFixed(2) ?? '0'
    : balanceData?.[0]?.userBalance?.toString() ?? '0';

  userBalanceString = account ? userBalanceString : '0';

  const isOwner = userBalanceString !== '0' && userBalanceString !== '0.0';

  console.log('yoyoyo', { ...balanceData?.[0] });
  let totalSupplyString = balanceData?.[0]?.totalSupply
    ? isFungible
      ? Fraction.from(
          balanceData?.[0]?.totalSupply?.toString() ?? '0',
          decimals
        )?.toFixed(2) ?? '0'
      : balanceData?.[0]?.totalSupply?.toString()
    : asset.assetType.valueOf() === StringAssetType.ERC721
    ? '1'
    : undefined;

  //console.log('data', { balanceData, staticData, assetMeta });

  const transformedMetaData = assetMeta?.description
    ?.replace(/\s*,\s*/g, ',')
    .split(',')
    .map((trait: string) => {
      // TODO: Get token supply correctly
      const rarity = (
        ((MOONSAMA_TRAITS as any)[trait] / MOONSAMA_MAX_SUPPLY) *
        100
      ).toFixed(2);

      return {
        label: trait,
        rarity,
      };
    });

  const displayRarity =
    asset.assetAddress ==
    '0xb654611F84A8dc429BA3cb4FDA9Fad236C505a1a'.toLowerCase();
  const minecraftskin = getMinecraftSkinUrl(assetMeta?.attributes);

  const ordersDisabled =
    (rawCollection?.ordersDisabled ?? false) ||
    (rawCollection?.ordersDisabledFor?.includes(asset?.assetId ?? '') ?? false);
  const transferDisabled =
    (rawCollection?.transferDisabled ?? false) ||
    (rawCollection?.transferDisabledFor?.includes(asset?.assetId ?? '') ??
      false);

  const getTableBody = (
    orders: Order[] | undefined | null,
    orderType?: OrderType
  ) => {
    return (
      <TableBody>
        {orders && orders.length > 0 ? (
          orders.map((order) => {
            const {
              id,
              seller,
              createdAt,
              quantityLeft,
              askPerUnitDenominator,
              askPerUnitNominator,
              expiresAt,
              onlyTo,
              partialAllowed,
              orderType: indexedOrderType,
            } = order;

            const expiration = formatExpirationDateString(expiresAt);

            const sellerShort = truncateHexString(seller);

            const ot = orderType ?? stringToOrderType(indexedOrderType);

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

            const freeForAll = onlyTo === AddressZero;
            const isExlusiveRecipient = onlyTo === account?.toLowerCase();

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
                          <Grid
                            container
                            spacing={2}
                            style={{ justifyContent: 'start' }}
                          >
                            <Grid item className={subItemTitleCell}>
                              Order ID
                            </Grid>
                            <Grid item>{id}</Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={2}
                            style={{ justifyContent: 'start' }}
                          >
                            <Grid item className={subItemTitleCell}>
                              Maker
                            </Grid>
                            <Grid item>{seller}</Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={2}
                            style={{ justifyContent: 'start' }}
                          >
                            <Grid item className={subItemTitleCell}>
                              Created at
                            </Grid>
                            <Grid item>
                              {formatExpirationDateString(createdAt)}
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={2}
                            style={{ justifyContent: 'start' }}
                          >
                            <Grid item className={subItemTitleCell}>
                              Available to
                            </Grid>
                            <Grid item>{freeForAll ? 'everyone' : onlyTo}</Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={2}
                            style={{ justifyContent: 'start' }}
                          >
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
                        </Grid>
                      </Grid>
                    </div>
                  );
                }}
              >
                <TableCell title={id}> {truncateHexString(id)}</TableCell>
                <TableCell>{displayUnitPrice?.toString()}</TableCell>
                <TableCell>{qty?.toString()}</TableCell>
                <TableCell>{approvedPaymentCurrency.symbol}</TableCell>
                <TableCell>{expiration}</TableCell>
                <TableCell title={seller}>
                  <ExternalLink
                    href={getExplorerLink(
                      chainId ?? ChainId.MOONRIVER,
                      seller,
                      'address'
                    )}
                  >
                    {truncateHexString(sellerShort)}
                  </ExternalLink>
                </TableCell>
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
                      style={isExlusiveRecipient ? { background: 'blue' } : {}}
                      disabled={!freeForAll && !isExlusiveRecipient}
                      onClick={() => {
                        setPurchaseDialogOpen(true);
                        setPurchaseData({
                          order,
                          orderType: ot,
                          decimals,
                          symbol: tokenSymbol,
                          name: tokenName,
                          approvedPaymentCurrency,
                        });
                      }}
                      variant="contained"
                      color={'primary'}
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
    <Grid
      container
      className={pageContainer}
      style={{ margin: '0 auto' }}
      alignItems="flex-start"
      justifyContent="space-between"
      maxWidth="lg"
    >
      <Grid
        pr={{ lg: 3, md: 3 }}
        item
        lg={6}
        md={6}
        xs={12}
        style={{ paddingTop: 0 }}
        className={imageContainer}
      >
        <Media uri={assetMeta?.image} className={image} />
        {rawCollection?.hasVersion2 && (
          <Stack
            direction="row"
            spacing={1}
            alignItems="center"
            justifyContent={'center'}
          >
            <Typography>1.0</Typography>
            <Switch
              checked={metaVersion}
              onChange={(event) => setMetaVersion(event.target.checked)}
              sx={{
                '.MuiSwitch-thumb': {
                  color: '#d2023e',
                },
                '.MuiSwitch-track': {
                  backgroundColor: '#d2023e',
                },
              }}
            />
            <Typography>2.0</Typography>
          </Stack>
        )}
      </Grid>
      <Grid
        pl={{ lg: 3, md: 3 }}
        item
        lg={6}
        md={6}
        xs={12}
        style={{ paddingTop: 0 }}
      >
        <GlitchText
          variant="h1"
          className={name}
          style={{ textAlign: 'left', margin: 0 }}
        >
          {assetMeta?.name ??
            assetMeta?.title ??
            truncateHexString(asset?.assetAddress)}
        </GlitchText>
        {!isErc20 && (
          <GlitchText
            variant="h2"
            className={name}
            style={{ textAlign: 'left', marginTop: '10px' }}
          >
            #{truncateHexString(asset?.assetId)}
          </GlitchText>
        )}
        <Box className={price}>
          <PriceBox variant="primary">{assetType}</PriceBox>
          {isErc20 ? (
            <Typography color="textSecondary" variant="subtitle1">
              BALANCE: {userBalanceString}
            </Typography>
          ) : isErc721 ? (
            userBalanceString === '1' ? (
              <Typography color="textSecondary" className={smallText}>
                OWNED BY YOU
              </Typography>
            ) : (
              <Typography color="textSecondary" className={smallText}>
                {owner && (
                  <ExternalLink
                    className={smallText}
                    href={getExplorerLink(chainId, owner, 'address')}
                  >
                    {' '}
                    Owned by {truncateHexString(owner)}
                  </ExternalLink>
                )}
              </Typography>
            )
          ) : (
            <Typography color="textSecondary" variant="subtitle1">
              {`OWNED ${userBalanceString}${
                totalSupplyString ? ` OF ${totalSupplyString}` : ''
              }`}
            </Typography>
          )}
        </Box>

        {assetMeta?.rarity && (
          <Box className={artist}>
            <Typography color="textSecondary" variant="subtitle1">
              <Chip
                label={assetMeta.rarity}
                className={rarityChip}
                style={{ background: RARITY_COLORS[assetMeta.rarity] }}
              />
            </Typography>
          </Box>
        )}

        {/*TODO: Make traits calculation collection specific*/}
        {displayRarity && (
          <Typography color="textSecondary" className={smallText}>
            {transformedMetaData?.map((trait) => (
              <Tooltip title={`${trait.rarity}% have this trait`}>
                <Chip label={trait.label} className={traitChip} />
              </Tooltip>
            ))}
          </Typography>
        )}

        {rawCollection?.plot && (
          <Typography color="textSecondary" className={smallText}>
            {Object.keys(assetMeta?.plot ?? {}).map((key) => (
              <Chip
                label={`${key}: ${assetMeta?.plot[key]}`}
                className={traitChip}
              />
            ))}
          </Typography>
        )}

        {!displayRarity && !rawCollection?.plot && (
          <Typography>{assetMeta?.description}</Typography>
        )}

        {rawCollection?.showAttributes && (
          <div style={{ paddingTop: theme.spacing(3) }}>
            <Typography color="textSecondary" className={smallText}>
              {getAttributesList(assetMeta?.attributes)?.map((label) => (
                <Chip label={label} className={traitChip} />
              ))}
            </Typography>
          </div>
        )}

        {assetMeta?.artist_url && assetMeta?.artist && (
          <Box className={artist}>
            <Typography color="textSecondary" variant="subtitle1">
              Made by{' '}
              <ExternalLink href={assetMeta.artist_url} fontSize="14px">
                {assetMeta.artist}
              </ExternalLink>
            </Typography>
          </Box>
        )}

        <Paper className={card}>
          {ltp && (
            <Box className={formBox} style={{ marginBottom: 32 }}>
              <div className={tradeContainer}>
                <div className={tradeRow}>
                  <Grid container alignItems="center">
                    <Grid item style={{ marginRight: '0.3rem' }}>
                      <AccountCircleIcon style={{ fontSize: 60 }} />
                    </Grid>
                    <Grid item>
                      Last trade by:
                      <AddressDisplayComponent
                        className={`${formValue} ${formValueTokenDetails}`}
                        charsShown={5}
                      >
                        {ltp?.user}
                      </AddressDisplayComponent>
                    </Grid>
                  </Grid>
                </div>
                <div className={tradeRow}>
                  <div className={formLabel}>Token Type: </div>
                  <div
                    className={`${formValue} ${formValueTokenDetails}`}
                    style={{ marginLeft: 8 }}
                  >
                    {`${assetType}`}
                  </div>
                </div>
                <div className={tradeRow}>
                  <div className={formLabel}>Offer Type:</div>
                  <div
                    className={`${formValue} ${formValueTokenDetails}`}
                    style={{ marginLeft: 8 }}
                  >
                    {`${ltp?.orderType ?? ''}`}
                  </div>
                </div>
                <div className={tradeRow}>
                  <div className={formLabel}>Value:</div>
                  <div
                    className={`${formValue} ${formValueTokenDetails}`}
                    style={{
                      justifyContent: 'flex-end',
                      marginLeft: 8,
                    }}
                  >
                    <span className={assetActionsBidTokenAmount}>
                      {getDisplayUnitPrice(
                        decimals,
                        4,
                        stringToOrderType(ltp.orderType.valueOf()),
                        ltp.askPerUnitNominator,
                        ltp.askPerUnitDenominator
                      )}{' '}
                      {approvedPaymentCurrency.symbol}
                    </span>
                    {/** TODO USD PRICE 
                  <span className={assetActionsBidCurrency}>
                    {12 * 0.12} USD
                  </span>
                  */}
                  </div>
                </div>
              </div>
            </Box>
          )}

          <Box
            className={buttonsContainer}
            style={{ justifyContent: 'space-around' }}
          >
            {!ordersDisabled &&
              !!ordersMap?.sellOrders &&
              ordersMap?.sellOrders.length > 0 &&
              (ordersMap.sellOrders[0].onlyTo === AddressZero ||
                ordersMap.sellOrders[0].onlyTo === account?.toLowerCase()) && (
                <Button
                  style={{ background: 'green' }}
                  onClick={() => {
                    setPurchaseDialogOpen(true);
                    setPurchaseData({
                      order: ordersMap.sellOrders?.[0] as Order,
                      orderType: OrderType.SELL,
                      decimals,
                      symbol: tokenSymbol,
                      name: tokenName,
                      approvedPaymentCurrency,
                    });
                  }}
                  startIcon={<AccountBalanceWalletIcon />}
                  variant="contained"
                  color="primary"
                >
                  Buy now
                </Button>
              )}
            {!ordersDisabled && ((!isOwner && isErc721) || !isErc721) && (
              <Button
                onClick={() => {
                  setBidDialogOpen(true);
                  setBidData({
                    orderType: OrderType.BUY,
                    asset,
                    decimals,
                    name: tokenName,
                    symbol: tokenSymbol,
                    approvedPaymentCurrency,
                    media: assetMeta?.image,
                  });
                }}
                startIcon={<AccountBalanceWalletIcon />}
                variant="contained"
                color="primary"
              >
                Make an offer
              </Button>
            )}
            {!ordersDisabled && isOwner && (
              <Button
                onClick={() => {
                  setBidDialogOpen(true);
                  setBidData({
                    orderType: OrderType.SELL,
                    asset,
                    decimals,
                    name: tokenName,
                    symbol: tokenSymbol,
                    approvedPaymentCurrency,
                    media: assetMeta?.image,
                  });
                }}
                startIcon={<MoneyIcon />}
                variant="outlined"
                color="primary"
                className={newSellButton}
              >
                New sell offer
              </Button>
            )}
            {!transferDisabled && isOwner && (
              <Button
                onClick={() => {
                  setTransferDialogOpen(true);
                  setTransferData({ asset, decimals });
                }}
                startIcon={<SyncAltIcon />}
                variant="outlined"
                color="primary"
                className={transferButton}
              >
                Transfer
              </Button>
            )}
          </Box>
          <Box className={externals}>
            {rawCollection?.plotMap && (
              <ExternalLink
                href={
                  !!asset?.assetId
                    ? `${rawCollection?.plotMap}/?plot=${asset?.assetId}`
                    : `${rawCollection?.plotMap}`
                }
              >
                <Button>Plot map↗</Button>
              </ExternalLink>
            )}
            {minecraftskin && (
              <ExternalLink href={uriToHttp(minecraftskin)?.[0]}>
                <Button>Minecraft skin↗</Button>
              </ExternalLink>
            )}
            {assetMeta?.external_url && (
              <ExternalLink href={assetMeta?.external_url}>
                <Button>External site↗</Button>
              </ExternalLink>
            )}
            {staticData?.[0]?.tokenURI && (
              <ExternalLink href={uriToHttp(staticData?.[0].tokenURI)?.[0]}>
                <Button>Full metadata↗</Button>
              </ExternalLink>
            )}
            <ExternalLink
              href={getExplorerLink(
                chainId ?? ChainId.MOONRIVER,
                asset?.assetAddress,
                'address'
              )}
            >
              <Button>Check the contract↗</Button>
            </ExternalLink>
          </Box>
        </Paper>
      </Grid>
      <Tabs
        containerClassName={tabsContainer}
        tabsClassName={tabs}
        currentTab={currentTab}
        onTabChanged={(value: number) => {
          setCurrentTab(value);
        }}
        tabs={[
          {
            label: 'Buy Offers',
            view: (
              <Table isExpandable style={{ whiteSpace: 'nowrap' }}>
                {geTableHeader()}
                {getTableBody(
                  ordersMap?.buyOrders?.filter((order) =>
                    orderFilter(order, account)
                  ),
                  OrderType.BUY
                )}
              </Table>
            ),
          },
          {
            label: 'Sell Offers',
            view: (
              <Table isExpandable style={{ whiteSpace: 'nowrap' }}>
                {geTableHeader()}
                {getTableBody(
                  ordersMap?.sellOrders?.filter((order) =>
                    orderFilter(order, account)
                  ),
                  OrderType.SELL
                )}
              </Table>
            ),
          },
          {
            label: 'Your Offers',
            view: (
              <Table isExpandable style={{ whiteSpace: 'nowrap' }}>
                {geTableHeader()}
                {getTableBody(ordersMap?.userOrders)}
              </Table>
            ),
          },
        ]}
      />
      <div style={{ marginTop: 40, width: '100%' }} />
    </Grid>
  );
};

export default TokenPage;
