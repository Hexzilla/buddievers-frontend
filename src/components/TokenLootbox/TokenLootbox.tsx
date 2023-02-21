import { GlitchText, NavLink, Dialog } from 'ui';
import { truncateHexString } from 'utils';
import { styles } from './TokenLootbox.styles';
import { Fraction, Rounding } from 'utils/Fraction';
import { useActiveWeb3React, useClasses } from 'hooks';
import { useTokenStaticData } from 'hooks/useTokenStaticData/useTokenStaticData';
import { useTokenBasicData } from 'hooks/useTokenBasicData.ts/useTokenBasicData';
import {
  useFetchTokenUri,
  useFetchTokenUriCb,
} from 'hooks/useFetchTokenUri.ts/useFetchTokenUri';
import { useDecimalOverrides } from 'hooks/useDecimalOverrides/useDecimalOverrides';
import { StringAssetType } from '../../utils/subgraph';
import { useBlueprint } from 'hooks/loot/useBlueprint';
import { Asset } from 'hooks/marketplace/types';
import { useState, useRef, SyntheticEvent, useEffect } from 'react';
import { useAllowances } from 'hooks/useApproveCallback/useApproveCallback';
import {
  useLootboxOpen,
  OpenData,
  RewardData,
  LootboxOpenStatus,
} from 'hooks/loot/useLootboxOpen';
import {
  WORKBENCH_ADDRESSES,
  WORKBENCHV2_ADDRESSES,
  ChainId,
} from '../../constants';
import { BigNumber } from '@ethersproject/bignumber';
import {
  CraftCallbackState,
  useCraftCallback,
} from 'hooks/loot/useCraftCallback';
import {
  Box,
  Button,
  Grow,
  Link,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { Media, MintResourceApproveItem } from 'components';
import { DoDisturb } from '@mui/icons-material';
import DialogUI from '@mui/material/Dialog';

import { LootboxDataType, LOOTBOXES } from '../../assets/data/lootboxes';
import {
  BurnCallbackState,
  useBurnSemaphore,
} from 'hooks/loot/useBurnSemaphore';
import { useBlockNumber } from 'state/application/hooks';
import TextField from '@material-ui/core/TextField';
import { TokenMeta } from 'hooks/useFetchTokenUri.ts/useFetchTokenUri.types';

import './index.css';

export const TokenLootbox = () => {
  const styleClasses = useClasses(styles);
  const {
    container,
    image,
    imageContainer,
    detailContainer,
    buttonsContainer,
    name,
    newSellButton,
    transferButton,
    dialogContainer,
    lootCardContainer,
    lootboxResultContainer,
    boldText,
    detailContainerNoMT,
    lootboxOpenButton,
    amountTextInput,
  } = styleClasses;

  const defaultBoxIndex = LOOTBOXES.length - 1;
  const blocknumber = useBlockNumber();

  const theme = useTheme();

  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [openBoxDialogOpen, setOpenBoxDialogOpen] = useState(false);
  const { chainId, account } = useActiveWeb3React();
  const decimalOverrides = useDecimalOverrides();

  const [tabValue, setTabValue] = useState<number>(defaultBoxIndex);
  const [lootboxData, setLootboxData] = useState<LootboxDataType>(
    LOOTBOXES[defaultBoxIndex]
  );
  const [lootboxStatus, setLootboxStatus] = useState<LootboxOpenStatus>(
    LootboxOpenStatus.NO_BURN_PROOF
  );
  const [burnSubmitted, setBurnSubmitted] = useState<boolean>(false);

  const [amountPickerDialogOpen, setAmountPickerDialogOpen] =
    useState<boolean>(false);

  const [chosenAmount, setChosenAmount] = useState<string>('1');

  const handleTabValueChange = (event: SyntheticEvent, newTabValue: number) => {
    setTabValue(newTabValue);
    setLootboxData(LOOTBOXES[newTabValue]);
    setLootboxStatus(LootboxOpenStatus.NO_BURN_PROOF);
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChosenAmount(event.target.value);
  };

  const { openCallback, confirmCallback } = useLootboxOpen({
    lootboxId: lootboxData.lootboxId,
  } as OpenData);

  useEffect(() => {
    const checkStatus = async () => {
      const [rewardData] = (await openCallback?.()) ?? [undefined, undefined];
      // if there was a change..
      console.log('LOOTBOX DEBUG STATE', { rewardData });
      if (!!rewardData?.status && rewardData?.status !== lootboxStatus) {
        console.log(
          'LOOTBOX DEBUG STATE',
          'status changed',
          rewardData?.status
        );
        setLootboxStatus(rewardData.status);
        if (rewardData.status === LootboxOpenStatus.NO_BURN_PROOF) {
          console.log('LOOTBOX DEBUG STATE', 'setBurnSubmitted false');
          setBurnSubmitted(false);
        }
      }
    };
    if (openCallback) {
      checkStatus();
    }
  }, [openCallback, blocknumber, lootboxStatus, lootboxData.lootboxId]);

  const onDialogClose = (event: any, reason: string) => {
    if (reason === 'backdropClick') {
      return;
    }
    if (openBoxDialogOpen) {
      setOpenBoxDialogOpen(false);
    }
    confirmCallback?.();
    setVideoPlay(false);
    setConfirmButtonShow(false);
    setOpenError(undefined);
    setOpenResult(undefined);
    setBurnSubmitted(false);
  };

  const onAmountDialogClose = (event: any, reason: string) => {
    if (amountPickerDialogOpen) {
      setAmountPickerDialogOpen(false);
    }
    setChosenAmount('1');
  };

  const blueprint = useBlueprint(lootboxData.blueprintId, lootboxData.version); // 2 for prod
  const craftCallback = useCraftCallback({
    amount: chosenAmount,
    blueprintId: lootboxData.blueprintId,
    version: lootboxData.version,
  });
  const burnCallback = useBurnSemaphore({
    assetAddress: lootboxData.blueprintOutput.assetAddress,
    assetId: lootboxData.blueprintOutput.assetId,
  });

  console.log('blueprint', { blueprint });

  let asset: Asset = lootboxData.blueprintOutput;

  const balanceData = useTokenBasicData([asset as Asset]);
  const decimals =
    decimalOverrides[asset?.assetAddress] ?? balanceData?.[0]?.decimals ?? 0;
  const isFungible = decimals > 0;

  let userBalanceString = isFungible
    ? Fraction.from(
        balanceData?.[0]?.userBalance?.toString() ?? '0',
        decimals
      )?.toFixed(2) ?? '0'
    : balanceData?.[0]?.userBalance?.toString() ?? '0';
  userBalanceString = account ? userBalanceString : '0';

  let totalSupplyString = balanceData?.[0]?.totalSupply
    ? isFungible
      ? Fraction.from(
          balanceData?.[0]?.totalSupply?.toString() ?? '0',
          decimals
        )?.toFixed(2) ?? '0'
      : balanceData?.[0]?.totalSupply?.toString()
    : asset?.assetType.valueOf() === StringAssetType.ERC721
    ? '1'
    : undefined;

  const availableToMint = blueprint?.availableToMint?.toString() ?? '0';

  const lootboxStaticData = useTokenStaticData([asset as Asset]);
  const lootboxMeta = useFetchTokenUri(lootboxStaticData)?.[0];

  const inputAssets = blueprint?.inputs.map((input) => ({
    id: input.assetAddress + input.assetId,
    assetId: input.assetId,
    assetType: input.assetType,
    assetAddress: input.assetAddress.toLowerCase(),
    amount: input.amount,
  }));

  const inputsStaticData = useTokenStaticData(inputAssets ?? []);
  const inputMetas = useFetchTokenUri(inputsStaticData);
  const inputsBalanceData = useTokenBasicData(inputAssets ?? []);

  const items =
    inputAssets?.map((asset, i) => {
      const decimals =
        decimalOverrides[asset.assetAddress] ??
        inputsBalanceData?.[i]?.decimals ??
        0;
      const isFungible = decimals > 0;
      const target = isFungible
        ? Fraction.from(
            asset.amount?.toString() ?? '0',
            decimals
          )?.toSignificant(5) ?? '0'
        : asset.amount?.toString() ?? '0';
      const name = inputMetas[i]?.name ? inputMetas[i]?.name : '';
      return {
        asset,
        target,
        name,
        decimals,
        isFungible,
      };
    }) ?? [];

  const operator =
    lootboxData.version === 'V1'
      ? WORKBENCH_ADDRESSES[chainId ?? ChainId.MOONRIVER]
      : WORKBENCHV2_ADDRESSES[chainId ?? ChainId.MOONRIVER];
  const allowances = useAllowances(
    inputAssets?.map((x) => {
      return { ...x, operator };
    }) ?? [],
    account ?? undefined
  );

  const formattedUserBalances = inputsBalanceData?.map((ibd, index) => {
    const item = items?.[index];
    console.log('DEBUG', { item, ibd });
    return item?.isFungible
      ? Fraction.from(
          ibd?.userBalance?.toString() ?? '0',
          item?.decimals ?? 18
        )?.toFixed(0, undefined, Rounding.ROUND_DOWN) ?? '0'
      : ibd?.userBalance?.toString() ?? '0';
  });

  console.log('DEBUG', { formattedUserBalances });

  let approvalNeeded = false;
  allowances?.map((allowance, i) => {
    if (BigNumber.from(inputAssets?.[i]?.amount ?? '0').gt(allowance ?? '0')) {
      approvalNeeded = true;
      return;
    }
  });

  let userHasEnough = true;
  inputsBalanceData?.map((inputBalanceData, i) => {
    if (
      BigNumber.from(inputAssets?.[i]?.amount ?? '0').gt(
        inputBalanceData?.userBalance ?? '0'
      )
    ) {
      userHasEnough = false;
      return;
    }
  });

  let maxCraftCount = '0',
    maxCraftCountTemp = 999999999999999999999;
  items.map((item, i) => {
    let costValue = parseInt(item?.target ?? '0');
    let myValue = parseInt(formattedUserBalances?.[i] ?? '0');
    let temp3 = Math.floor(myValue / costValue);
    if (maxCraftCountTemp > temp3) maxCraftCountTemp = temp3;
  });

  maxCraftCount = maxCraftCountTemp.toString();

  const noMoreLeftToMint = availableToMint === '0';
  const notAvailableToCraft = noMoreLeftToMint || !userHasEnough;
  const notAvailableText = noMoreLeftToMint
    ? lootboxData.noMoreText
    : lootboxData.notEnoughText;
  const notAvailableLink = noMoreLeftToMint
    ? lootboxData.noMoreLink
    : lootboxData.notEnoughLink;
  const openInProgress = LootboxOpenStatus.NO_BURN_PROOF !== lootboxStatus;

  console.log('lootbox debug', {
    userHasEnough,
    inputsBalanceData,
    approvalNeeded,
    allowances,
    items,
    inputAssets,
  });

  const openVidRef = useRef<any>(null);
  const [videoPlay, setVideoPlay] = useState(false);
  const [openError, setOpenError] = useState<string | undefined>(undefined);
  const [openResult, setOpenResult] = useState<RewardData | undefined>(
    undefined
  );
  const [confirmButtonShow, setConfirmButtonShow] = useState(false);
  const [sentMeta0, setSentMeta0] = useState<TokenMeta | undefined>(undefined);

  const rarityClass0 =
    styleClasses[`${openResult?.rewards[0]?.rarity ?? 'common'}Loot`];
  const rarityClass1 =
    styleClasses[`${openResult?.rewards[1]?.rarity ?? 'common'}Loot`];
  const rarityClass2 =
    styleClasses[`${openResult?.rewards[2]?.rarity ?? 'common'}Loot`];

  const metaCb = useFetchTokenUriCb();

  useEffect(() => {
    const fetch = async () => {
      const m0 = (
        await metaCb([
          { tokenURI: openResult?.rewards[0]?.tokenURI, asset: undefined },
        ])
      )?.[0];
      if (m0) {
        setSentMeta0(m0);
      }
    };
    fetch();
  }, [openResult?.rewards[0]?.tokenURI]);

  //const sentMeta0: any = undefined
  console.log('LOOTBOX DEBUG status check', {
    lootboxStatus,
    sentMeta0,
    rarityClass0,
  });

  return (
    <Paper className={container} sx={{ borderRadius: 0 }}>
      <Tabs
        onChange={handleTabValueChange}
        value={tabValue}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="moonsama workbench blueprints tab"
      >
        {LOOTBOXES.map((lootboxdata) => {
          return <Tab key={lootboxdata.lootboxId} label={lootboxdata.name} />;
        })}
      </Tabs>

      <div role="button" className={imageContainer} tabIndex={0}>
        <Media uri={lootboxMeta?.image} className={image} />
      </div>

      <GlitchText variant="h1" className={name}>
        {lootboxMeta?.name ??
          lootboxMeta?.title ??
          truncateHexString(asset?.assetAddress)}
      </GlitchText>

      <Box
        className={detailContainerNoMT}
        style={{ justifyContent: 'space-around' }}
      >
        <Typography color="textSecondary" variant="body2">
          {`Owned ${userBalanceString}${openInProgress ? `/(1)` : ''}${
            totalSupplyString ? ` of ${totalSupplyString}` : ''
          }`}
        </Typography>
      </Box>

      {!lootboxData.openSectionDisabled && (
        <Box
          className={buttonsContainer}
          style={{ justifyContent: 'space-around' }}
        >
          {lootboxStatus === LootboxOpenStatus.NO_BURN_PROOF && (
            <Button
              variant="contained"
              color="warning"
              onClick={async () => {
                if (burnCallback?.callback) {
                  try {
                    setBurnSubmitted(true);
                    await burnCallback?.callback?.();
                  } catch (err) {
                    console.error('Burn transaction failiure', err);
                    setBurnSubmitted(false);
                  }
                }
              }}
              disabled={
                userBalanceString === '0' ||
                burnCallback.state === BurnCallbackState.INVALID ||
                burnCallback.state === BurnCallbackState.LOADING ||
                burnSubmitted
              }
            >
              {lootboxData.burnText}
            </Button>
          )}
          {(lootboxStatus === LootboxOpenStatus.MINT_DISPATCHED ||
            lootboxStatus === LootboxOpenStatus.MINT_BUSY ||
            lootboxStatus === LootboxOpenStatus.NEEDS_USER_CONFIRMATION) && (
            <Button
              variant="contained"
              color="warning"
              onClick={() => {
                setOpenBoxDialogOpen(true);
              }}
            >
              {lootboxData.openText}
            </Button>
          )}
        </Box>
      )}

      <div>
        <GlitchText variant="h1" className={name}>
          {lootboxData.craftTitle}
        </GlitchText>

        <Box className={detailContainer}>
          <Typography
            color="textSecondary"
            variant="subtitle1"
            className={boldText}
          >
            {`Notes:`}
          </Typography>
        </Box>

        <Box
          className={detailContainer}
          style={{ justifyContent: 'space-around' }}
        >
          <Typography color="textSecondary" variant="body2">
            {`${lootboxData.conditionsText}`}
          </Typography>
        </Box>

        <Box className={detailContainer}>
          <Typography
            color="textSecondary"
            variant="subtitle1"
            className={boldText}
          >
            {`Cost:`}
          </Typography>
        </Box>

        {items?.map((item, index) => (
          <Box
            key={index}
            className={detailContainer}
            style={{ justifyContent: 'space-around' }}
          >
            <Typography color="textSecondary" variant="body2" key={index}>
              {`${item?.target ?? '0'}/${
                formattedUserBalances?.[index] ?? '0'
              } ${item?.name}`}
            </Typography>
          </Box>
        ))}
      </div>

      <Dialog
        fullWidth={true}
        open={approveDialogOpen}
        onClose={() => {
          setApproveDialogOpen(false);
        }}
        title={'Approve Resources'}
      >
        <div className={dialogContainer}>
          {items?.map((item, index) => {
            return (
              <MintResourceApproveItem
                key={index}
                {...item.asset}
                assetName={item.name}
                decimals={item.decimals}
                operator={operator}
              />
            );
          })}
        </div>
      </Dialog>

      <Box className={detailContainer}>
        {
          <Typography
            color="textSecondary"
            variant="subtitle1"
            className={boldText}
          >
            {`Still available:`}
          </Typography>
        }
      </Box>

      <Box
        className={detailContainer}
        style={{ justifyContent: 'space-around' }}
      >
        {
          <Typography color="textSecondary" variant="body2">
            {`${availableToMint} ${lootboxData.availableOutputLabel}`}
          </Typography>
        }
      </Box>

      <div>
        {notAvailableToCraft ? (
          <NavLink href={notAvailableLink}>
            <Box
              className={buttonsContainer}
              style={{ justifyContent: 'space-around' }}
            >
              <Button
                startIcon={<DoDisturb />}
                variant="outlined"
                color="primary"
                className={newSellButton}
              >
                {`${notAvailableText}↗`}
              </Button>
            </Box>
          </NavLink>
        ) : approvalNeeded ? (
          <Box
            className={`${buttonsContainer}`}
            style={{ justifyContent: 'space-around' }}
          >
            <Button
              onClick={() => {
                setApproveDialogOpen(true);
              }}
              variant="contained"
              color="primary"
              className={transferButton}
            >
              Approve
            </Button>
          </Box>
        ) : (
          <Box
            className={buttonsContainer}
            style={{ justifyContent: 'space-around' }}
          >
            <Button
              style={{ background: 'green' }}
              variant="contained"
              color="primary"
              onClick={() => setAmountPickerDialogOpen(true)}
              disabled={
                craftCallback.state === CraftCallbackState.INVALID ||
                availableToMint === '0'
              }
            >
              {lootboxData.craftText}
            </Button>
          </Box>
        )}
      </div>

      <DialogUI
        className={dialogContainer}
        fullWidth={true}
        open={amountPickerDialogOpen}
        onClose={onAmountDialogClose}
        maxWidth="xs"
      >
        <Stack spacing={theme.spacing(1)}>
          <Typography
            color="textSecondary"
            variant="body2"
            style={{ marginBottom: '20px', marginTop: '20px' }}
          >
            {`Available to make: `} {maxCraftCount}
          </Typography>
          {/* <TextField
            disabled={!(lootboxData.selectInputAmountPossible ?? false)}
            color="secondary"
            variant="outlined"
            onChange={handleAmountChange}
            style={{ alignSelf: 'center', color: 'white' }}
            value={chosenAmount}
            className={amountTextInput}
            inputProps={{
              inputMode: 'numeric',
              pattern: '[0-9]*',
              style: { color: 'white', paddingTop: theme.spacing(1) },
            }}
          /> */}
          <div
            style={{
              alignItems: 'center',
              justifyContent: 'space-around',
              display: 'flex',
            }}
          >
            <TextField
              disabled={!(lootboxData.selectInputAmountPossible ?? false)}
              color="secondary"
              variant="outlined"
              onChange={handleAmountChange}
              style={{ alignSelf: 'center', color: 'white' }}
              value={chosenAmount}
              className={amountTextInput}
              type="number"
              inputProps={{
                style: { color: 'white', paddingTop: theme.spacing(1) },
              }}
            />
            <Button
              style={{ background: 'red' }}
              variant="contained"
              color="primary"
              onClick={() => setChosenAmount(maxCraftCount)}
            >
              MAX
            </Button>
          </div>
          <Box
            className={buttonsContainer}
            style={{
              justifyContent: 'space-around',
            }}
          >
            <Button
              style={{ background: 'green' }}
              variant="contained"
              color="primary"
              onClick={async () => {
                try {
                  await craftCallback?.callback?.();
                } catch (err) {
                  console.error('Craft transaction failiure', err);
                }
              }}
              disabled={
                craftCallback.state === CraftCallbackState.INVALID ||
                availableToMint === '0' ||
                parseInt(chosenAmount) > parseInt(maxCraftCount)
              }
            >
              {lootboxData.craftText}
            </Button>
          </Box>
        </Stack>
      </DialogUI>

      <DialogUI
        className={dialogContainer}
        fullWidth={true}
        open={openBoxDialogOpen}
        onClose={onDialogClose}
        maxWidth="lg"
      >
        <video
          ref={openVidRef}
          style={{ width: '100%' }}
          playsInline
          src={lootboxData.video}
          poster={lootboxData.imageUnopened}
        />
        {!videoPlay && !openResult ? (
          <div className={lootboxOpenButton}>
            {!openError && (
              <Button
                onClick={async () => {
                  let rewardData;
                  let error: Error | undefined;
                  let res:
                    | [RewardData | undefined, Error | undefined]
                    | undefined = undefined;
                  try {
                    if (openCallback) {
                      res = await openCallback?.();
                      rewardData = res[0];
                      error = res[1];
                    } else {
                      rewardData = undefined;
                      error = new Error('Sama box could not be opened');
                      console.error('Open error: ', { res });
                    }
                  } catch (err) {
                    error = new Error('Sama box could not be opened');
                    console.error('Open error: ', { res });
                  }

                  console.error(error, { openError });
                  if (!error) {
                    setOpenResult(rewardData);
                    openVidRef?.current?.play();
                    setVideoPlay(true);
                    setTimeout(() => {
                      setConfirmButtonShow(true);
                    }, 7000);
                  } else {
                    setOpenError(error?.message);
                  }
                }}
              >
                <GlitchText
                  style={{ width: '100%', color: 'white' }}
                  variant="h1"
                >
                  {lootboxData.openDialogText}
                </GlitchText>
              </Button>
            )}
            {openError && (
              <Box style={{ display: 'flex', padding: theme.spacing(2) }}>
                <Typography variant="body2">{openError}</Typography>
              </Box>
            )}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              textAlign: 'center',
              height: '100%',
              flexDirection: 'column',
            }}
          >
            <div className={lootboxResultContainer} style={{ width: '60%' }}>
              {lootboxData.lootNum === 3 ? (
                <>
                  <Grow
                    style={{ marginLeft: 30, transitionDelay: `5000ms` }}
                    in={true}
                  >
                    <div className={`${lootCardContainer} ${rarityClass0}`}>
                      <Link
                        target={'_blank'}
                        href={`/token/${openResult?.rewards[0].assetType}/${openResult?.rewards[0].assetAddress}/${openResult?.rewards[0].assetId}`}
                      >
                        <img
                          className={imageContainer}
                          src={openResult?.rewards[0].meta?.image}
                          alt="loot in slot 0"
                        />
                      </Link>
                      <span className="name">
                        {openResult?.rewards[0].meta?.name}
                      </span>
                      <span className="asset-id">{`#${openResult?.rewards[0].assetId}`}</span>
                    </div>
                  </Grow>
                  <Grow
                    style={{ marginLeft: 30, transitionDelay: `5200ms` }}
                    in={true}
                  >
                    <div className={`${lootCardContainer} ${rarityClass1}`}>
                      <Link
                        target={'_blank'}
                        href={`/token/${openResult?.rewards[1].assetType}/${openResult?.rewards[1].assetAddress}/${openResult?.rewards[1].assetId}`}
                      >
                        <img
                          className={imageContainer}
                          src={openResult?.rewards[1].meta?.image}
                          alt="loot in slot 1"
                        />
                      </Link>
                      <span className="name">
                        {openResult?.rewards[1].meta?.name}
                      </span>
                      <span className="asset-id">{`#${openResult?.rewards[1].assetId}`}</span>
                    </div>
                  </Grow>
                  <Grow
                    style={{ marginLeft: 30, transitionDelay: `5400ms` }}
                    in={true}
                  >
                    <div className={`${lootCardContainer} ${rarityClass2}`}>
                      <Link
                        target={'_blank'}
                        href={`/token/${openResult?.rewards[2].assetType}/${openResult?.rewards[2].assetAddress}/${openResult?.rewards[2].assetId}`}
                      >
                        <img
                          className={imageContainer}
                          src={openResult?.rewards[2].meta?.image}
                          alt="loot in slot 2"
                        />
                      </Link>
                      <span className="name">
                        {openResult?.rewards[2].meta?.name}
                      </span>
                      <span className="asset-id">{`#${openResult?.rewards[2].assetId}`}</span>
                    </div>
                  </Grow>
                </>
              ) : (
                <>
                  <Grow
                    style={{ marginLeft: 30, transitionDelay: `8500ms` }}
                    in={true}
                  >
                    <div className={`${lootCardContainer}`}></div>
                  </Grow>
                  <Grow
                    style={{ marginLeft: 30, transitionDelay: `8500ms` }}
                    in={true}
                  >
                    <div className={`${lootCardContainer} ${rarityClass0}`}>
                      <Link
                        target={'_blank'}
                        href={
                          !openResult?.rewards[0]?.assetId ||
                          openResult?.rewards[0]?.assetId === '0'
                            ? `/collection/${openResult?.rewards[0].assetType}/${openResult?.rewards[0].assetAddress}/0?page=1&sort=3`
                            : `/token/${openResult?.rewards[0].assetType}/${openResult?.rewards[0].assetAddress}/${openResult?.rewards[0].assetId}`
                        }
                      >
                        <img
                          className={imageContainer}
                          src={
                            openResult?.rewards[0].meta?.image ??
                            sentMeta0?.image
                          }
                          alt="loot in slot 0"
                        />
                      </Link>
                      <span className="name">
                        {openResult?.rewards[0].meta?.name ?? sentMeta0?.name}
                      </span>
                      {/* <span className="asset-id">{`#${openResult?.rewards[0].assetId}`}</span> */}
                    </div>
                  </Grow>
                  <Grow
                    style={{ marginLeft: 30, transitionDelay: `8500ms` }}
                    in={true}
                  >
                    <div className={`${lootCardContainer}`}></div>
                  </Grow>
                </>
              )}
            </div>

            {confirmButtonShow && (
              <>
                <Box style={{ display: 'flex', padding: theme.spacing(2) }}>
                  <Typography variant="body2">
                    Loot landing in your wallet soon. You will not be able to
                    open a new box in the meantime.
                  </Typography>
                </Box>
                <Button
                  onClick={() => {
                    onDialogClose(undefined, 'button');
                  }}
                  variant="contained"
                  color="primary"
                  style={{ padding: theme.spacing(2) }}
                >
                  <Typography variant="body1">Nice!</Typography>
                </Button>
              </>
            )}
          </div>
        )}
      </DialogUI>
    </Paper>
  );
};
