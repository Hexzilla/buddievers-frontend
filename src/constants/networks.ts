import { ChainId } from "./index";

export interface AddEthereumChainParameter {
    chainId: string; // A 0x-prefixed hexadecimal string
    chainName: string;
    nativeCurrency: {
        name: string;
        symbol: string; // 2-6 characters long
        decimals: 18;
    };
    rpcUrls: string[];
    blockExplorerUrls?: string[];
    iconUrls?: string[]; // Currently ignored.
}

export const SUPPORTED_METAMASK_NETWORKS: {[key: number]: AddEthereumChainParameter} = {
    [ChainId.MOONRIVER]: {
        chainId: '0x505',
        chainName: 'Moonriver',
        rpcUrls: ['https://rpc.api.moonriver.moonbeam.network'],
        blockExplorerUrls: ['https://moonriver.moonscan.io'],
        nativeCurrency: {
            name: 'Moonriver',
            symbol: 'MOVR',
            decimals: 18
        }
    },
    [ChainId.MOONBEAM]: {
        chainId: '0x504',
        chainName: 'Moonbeam',
        rpcUrls: ['https://rpc.api.moonbeam.network'],
        blockExplorerUrls: ['https://moonscan.io'],
        nativeCurrency: {
            name: 'Moonbeam',
            symbol: 'GLMR',
            decimals: 18
        }
    }
}