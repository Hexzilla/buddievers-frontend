import { SUPPORTED_CONTRACTS } from '../constants';
import ENS_RESOLVER_ABI from './ens-public-resolver.json';

const ALL_CONTRACT_ABIS: { [key in SUPPORTED_CONTRACTS]: any } = {
  [SUPPORTED_CONTRACTS.ENS_RESOLVER]: ENS_RESOLVER_ABI,
};

export const getContractAbi = (name: SUPPORTED_CONTRACTS) =>
  ALL_CONTRACT_ABIS[name];
