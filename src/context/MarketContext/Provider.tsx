import { ReactElement, useCallback, useMemo, useState } from 'react';
import { utils } from 'ethers';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { useActiveWeb3React } from 'hooks';
import { useMarketplace } from 'hooks/useMarketplace';
import { useSeedToken } from 'hooks/useSeedToken';
import { getBalance } from 'utils/utils';

import MarketContextProvider, { Order } from '.';

interface Props {
  children: ReactElement;
}

export const MarketProvider = ({ children }: Props) => {
  const { account } = useActiveWeb3React();
  const { getOrders } = useMarketplace();
  const { balanceOf } = useSeedToken();

  const [loading, setLoading] = useState(false);
  const [balance, setBalance] = useState(0);
  const [seedBalance, setSeedBalance] = useState(0);
  const [orders, setOrders] = useState<Order[]>([]);

  const _refresh = useCallback(async () => {
    if (!account) {
      toast.warn('Please connect your wallet');
      return;
    }

    const balance = await getBalance(account);
    if (balance) {
      setBalance(Number(utils.formatEther(balance)));
    }

    const seedBalance = await balanceOf(account);
    setSeedBalance(Number(utils.formatEther(seedBalance)));

    const orders = await getOrders();

    setOrders(
      (orders || [])
        .map((order: any) => ({
          id: order.id,
          owner: order.owner,
          price: Number(utils.formatEther(order.price)),
          quantity: Number(utils.formatEther(order.quantity)),
          orderType: order.orderType,
          createdAt: order.createdAt.toNumber(),
          expiration: order.expiration.toNumber(),
        }))
        .filter((order: any) => order.quantity > 0)
    );
  }, [account, getOrders, balanceOf]);

  const ownedOrders = useMemo(() => {
    return (orders || []).filter((order: any) => order.owner === account);
  }, [account, orders]);

  return (
    <MarketContextProvider
      value={{
        loading,
        account,
        balance,
        seedBalance,
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
