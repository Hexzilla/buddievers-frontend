import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { BigNumber, utils } from 'ethers';
import {
  Id as ToastId,
  ToastContainer,
  UpdateOptions,
  toast,
} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useActiveWeb3React } from 'hooks';
import { useMarketplace } from 'hooks/useMarketplace';

import MarketContextProvider, { Order } from '.';

interface Props {
  children: ReactElement;
}

const updateToast = (id: ToastId, message: string, type: string = 'error') => {
  const options = {
    render: message,
    type,
    isLoading: false,
    autoClose: 2000,
  } as UpdateOptions;
  toast.update(id, options);
};

const handleException = (err: any, toastId: ToastId) => {
  console.error(err);
  const message = err?.data?.message || 'Something went wrong!';
  updateToast(toastId, message);
};

export const MarketProvider = ({ children }: Props) => {
  const { account } = useActiveWeb3React();
  const { getOrders, addSellOrder, addBuyOrder } = useMarketplace();

  const [loading, setLoading] = useState(false);
  const [orders, setOrders] = useState<Order[]>([]);

  const _refresh = useCallback(async () => {
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    const orders = await getOrders();

    setOrders(
      (orders || []).map((order: any) => ({
        id: order.id,
        owner: order.owner,
        price: utils.formatEther(order.price),
        quantity: utils.formatEther(order.quantity),
        orderType: order.orderType,
        createdAt: order.createdAt.toNumber(),
        expiration: order.expiration.toNumber(),
      }))
    );
  }, [account, getOrders]);

  const _addSellOrder = useCallback(
    async (quantity: number, price: number, expiration: number) => {
      if (!account) {
        toast.warn('Please connect your wallet!');
        return;
      }

      const toastId = toast.loading('Creating your sell offer...');

      try {
        const result = await addSellOrder(account, quantity, price, expiration);
        console.log('add-sell-offer-result', result);
        if (!result) {
          updateToast(toastId, 'Failed to create sell offer!');
          return;
        }

        _refresh();
        updateToast(
          toastId,
          'You have been created sell offer successfully!',
          'success'
        );
      } catch (err: any) {
        handleException(err, toastId);
      }
    },
    [account, addSellOrder, _refresh]
  );

  const _addBuyOrder = useCallback(
    async (quantity: number, price: number, expiration: number) => {
      if (!account) {
        toast.warn('Please connect your wallet!');
        return;
      }

      const toastId = toast.loading('Creating your buy offer...');

      try {
        const result = await addBuyOrder(quantity, price, expiration);
        console.log('add-buy-offer-result', result);
        if (!result) {
          updateToast(toastId, 'Failed to create buy offer!');
          return;
        }

        _refresh();
        updateToast(
          toastId,
          'You have been created buy order successfully!',
          'success'
        );
      } catch (err: any) {
        handleException(err, toastId);
      }
    },
    [account, addBuyOrder, _refresh]
  );

  const ownedOrders = useMemo(() => {
    return (orders || []).filter((order: any) => order.owner === account);
  }, [account, orders]);

  return (
    <MarketContextProvider
      value={{
        loading,
        account,
        orders,
        ownedOrders,
        refresh: _refresh,
        addSellOrder: _addSellOrder,
        addBuyOrder: _addBuyOrder,
      }}
    >
      {children}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
      />
    </MarketContextProvider>
  );
};
