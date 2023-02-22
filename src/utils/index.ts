import { JsonRpcSigner, Web3Provider } from '@ethersproject/providers';
import { AddressZero, HashZero } from '@ethersproject/constants';
import { getAddress } from '@ethersproject/address';
import { Contract } from '@ethersproject/contracts';
import { BigNumber } from '@ethersproject/bignumber';
import { ChainId } from '../constants';
import { hexZeroPad } from '@ethersproject/bytes';

export * as marketplace from './marketplace';
export * as subgraph from './subgraph';

export const truncateAddress = (address: string) =>
  `${address.slice(0, 2)}...${address.slice(address.length - 4)}`;

export const truncateHexString = (str: string | null | undefined, chars = 4) => {
  if (!str) {
    return '';
  }
  if (str.length <= chars * 2 + 5) {
    return str;
  }
  return `${str.slice(
    0,
    str.startsWith('0x') ? chars + 2 : chars
  )}...${str.slice(str.length - chars)}`;
};

export function isAddress(value: string): string | false {
  try {
    return getAddress(value);
  } catch {
    return false;
  }
}

// shorten the checksummed version of the input address to have 0x + 4 characters at start and end
export function shortenAddress(address: string, chars = 4): string {
  const parsed = isAddress(address);
  if (!parsed) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }
  return `${parsed.substring(0, chars + 2)}...${parsed.substring(42 - chars)}`;
}

// add 10%
export function calculateGasMargin(value: BigNumber): BigNumber {
  return value
    .mul(BigNumber.from(10000).add(BigNumber.from(1000)))
    .div(BigNumber.from(10000));
}

export function getSigner(
  library: Web3Provider,
  account: string
): JsonRpcSigner {
  return library.getSigner(account).connectUnchecked();
}

export function getProviderOrSigner(
  library: Web3Provider,
  account?: string
): Web3Provider | JsonRpcSigner {
  return account ? getSigner(library, account) : library;
}

export function getContract(
  address: string,
  ABI: string,
  library: Web3Provider,
  account?: string
): Contract {
  if (!isAddress(address) || address === AddressZero) {
    throw Error(`Invalid 'address' parameter '${address}'.`);
  }

  return new Contract(address, ABI, getProviderOrSigner(library, account));
}

const EXPLORER_PREFIXES: { [chainId in ChainId]: string } = {
  1: 'etherscan.io',
  3: 'ropsten.etherscan.io',
  4: 'rinkeby.etherscan.io',
  5: 'goerli.etherscan.io',
  42: 'kovan.etherscan.io',
  56: 'bscscan.com',
  246: 'explorer.energyweb.org',
  73799: 'volta-explorer.energyweb.org',
  80001: 'moonriver.moonscan.io',
  1284: 'moonbeam-rpc.moonsama.com'
};

export function getExplorerLink(
  chainId: ChainId | undefined,
  data: string,
  type: 'transaction' | 'token' | 'address' | 'block'
): string {
  if (!chainId) {
    return '';
  }

  const prefix = `https://${EXPLORER_PREFIXES[chainId]}`;

  switch (type) {
    case 'transaction': {
      return `${prefix}/tx/${data}`;
    }
    case 'token': {
      return `${prefix}/token/${data}`;
    }
    case 'block': {
      return `${prefix}/blocks/${data}`;
    }
    case 'address':
    default: {
      return `${prefix}/address/${data}`;
    }
  }
}

export function getRandomInt() {
  return Math.floor(Math.random() * Number.MAX_SAFE_INTEGER);
}

// @ts-ignore
export const isFirefox = typeof InstallTrigger !== 'undefined';

export const TEN_POW_18 = BigNumber.from('10').pow('18');

export const numberToBytes32HexString = (num?: string | number) => {
  if (!num) {
    //console.warn('HEXURI', HashZero);
    return HashZero;
  }

  const hv = `0x${
    typeof num === 'string'
      ? Number.parseInt(num as string).toString(16)
      : num.toString(16)
  }`;
  const final = hexZeroPad(hv, 32);

  //console.warn('HEXURI', { hv, final });
  return final;
};

export const parseTokenUri = (uri?: string, tokenID?: string | number) => {
  if (!uri) {
    return undefined;
  }

  if (uri.includes('{id}')) {
    return uri.replace('{id}', numberToBytes32HexString(tokenID).slice(2));
  }

  // carbonjack does not follow the specifications unfortunately
  if (uri.includes('{0}')) {
    return uri.replace('{0}', numberToBytes32HexString(tokenID).slice(2));
  }

  return uri;
};

export const formatAmountFractionString = (value?: string) => {
  if (!value) {
    return undefined
  }
  
  let end = value.length
  for(let i = value.length-1; i >= 0; i--) {
    if (value[i] !== '0') {
      if (value[i] === '.') {
        end = i
      } else {
        end = i+1
      }
      break
    }
  }

  const newVal = value.slice(0, end)

  return newVal === '0.' ? '0': newVal
}
