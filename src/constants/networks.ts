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
        chainId: '0x13881',
        chainName: 'Mumbai',
        rpcUrls: ['https://polygon-mumbai.g.alchemy.com/v2/79Vntdxb1kcd1pZjfkvGC8RDt7rt1dZe'],
        blockExplorerUrls: ['https://mumbai.polygonscan.com/'],
        nativeCurrency: {
            name: 'Mumbai',
            symbol: 'MATIC',
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