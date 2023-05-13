import { ReactElement, useCallback, useEffect, useMemo, useState } from 'react';
import { BigNumber, utils } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useActiveWeb3React } from 'hooks';
import { useMarketplace } from 'hooks/useMarketplace';

import MarketContextProvider, { Order } from '.';

interface Props {
  children: ReactElement;
}

export const MarketProvider = ({ children }: Props) => {
  const { account } = useActiveWeb3React();
  const { getOrders } = useMarketplace();

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
      }}
    >
      {children}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
      />
    </MarketContextProvider>
  );
};
