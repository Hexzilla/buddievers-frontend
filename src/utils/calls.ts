import { Interface } from '@ethersproject/abi';
import { Asset } from 'hooks/marketplace/types';
import { StaticTokenData } from 'hooks/useTokenStaticDataCallback/useTokenStaticDataCallback';
import { parseTokenUri } from 'utils';
import { StringAssetType } from './subgraph';

export const getTokenStaticCalldata = (asset: Asset) => {
  if (!asset || !asset.assetAddress || !asset.assetId || !asset.assetType) {
    return [];
  }
  if (asset.assetType?.valueOf() === StringAssetType.ERC20) {
    return [
      [
        [
          new Interface([
            'function name() public view returns (string)',
          ]).getFunction('name'),
        ],
        asset.assetAddress,
        'name',
        [],
      ],
      [
        [
          new Interface([
            'function symbol() view returns (string)',
          ]).getFunction('symbol'),
        ],
        asset.assetAddress,
        'symbol',
        [],
      ],
      [
        [
          new Interface([
            'function decimals() view returns (uint8)',
          ]).getFunction('decimals'),
        ],
        asset.assetAddress,
        'decimals',
        [],
      ],
      [
        [
          new Interface([
            'function totalSupply() view returns (uint256)',
          ]).getFunction('totalSupply'),
        ],
        asset.assetAddress,
        'totalSupply',
        [],
      ],
    ];
  }

  if (asset.assetType?.valueOf() === StringAssetType.ERC721) {
    return [
      [
        [
          new Interface(['function name() view returns (string)']).getFunction(
            'name'
          ),
        ],
        asset.assetAddress,
        'name',
        [],
      ],
      [
        [
          new Interface([
            'function symbol() view returns (string)',
          ]).getFunction('symbol'),
        ],
        asset.assetAddress,
        'symbol',
        [],
      ],
      [
        [
          new Interface([
            'function totalSupply() view returns (uint256)',
          ]).getFunction('totalSupply'),
        ],
        asset.assetAddress,
        'totalSupply',
        [],
      ],
      [
        [
          new Interface([
            'function tokenURI(uint256 tokenId) view returns (string memory)',
          ]).getFunction('tokenURI'),
        ],
        asset.assetAddress,
        'tokenURI',
        [asset.assetId],
      ],
      [
        [
          new Interface([
            'function contractURI() view returns (string memory)',
          ]).getFunction('contractURI'),
        ],
        asset.assetAddress,
        'contractURI',
        [],
      ],
    ];
  }

  if (asset.assetType?.valueOf() === StringAssetType.ERC1155) {
    return [
      [
        [
          new Interface([
            'function name() public view returns (string)',
          ]).getFunction('name'),
        ],
        asset.assetAddress,
        'name',
        [],
      ],
      [
        [
          new Interface([
            'function symbol() view returns (string)',
          ]).getFunction('symbol'),
        ],
        asset.assetAddress,
        'symbol',
        [],
      ],
      [
        [
          new Interface([
            'function decimals() view returns (uint8)',
          ]).getFunction('decimals'),
        ],
        asset.assetAddress,
        'decimals',
        [],
      ],
      [
        [
          new Interface([
            'function totalSupply(uint256 id) view returns (uint256)',
          ]).getFunction('totalSupply'),
        ],
        asset.assetAddress,
        'totalSupply',
        [asset.assetId],
      ],
      [
        [
          new Interface([
            'function uri(uint256 tokenId) view returns (string memory)',
          ]).getFunction('uri'),
        ],
        asset.assetAddress,
        'uri',
        [asset.assetId],
      ],
      [
        [
          new Interface([
            'function contractURI() view returns (string memory)',
          ]).getFunction('contractURI'),
        ],
        asset.assetAddress,
        'contractURI',
        [],
      ],
    ];
  }

  return [];
};

export const processTokenStaticCallResults = (
  assets: Asset[],
  results: any[]
) => {
  let res: StaticTokenData[] = [];
  let offset = 0;
  assets.map((x, i) => {
    if (x.assetType.valueOf() === StringAssetType.ERC20) {
      res.push({
        asset: x,
        name: results[i + offset]?.[0],
        symbol: results[i + offset + 1]?.[0],
        decimals: results[i + offset + 2]?.[0],
        totalSupply: results[i + offset + 3]?.[0],
      });
      offset += 3;
      return;
    }

    if (x.assetType.valueOf() === StringAssetType.ERC721) {
      res.push({
        asset: x,
        name: results[i + offset]?.[0],
        symbol: results[i + offset + 1]?.[0],
        totalSupply: results[i + offset + 2]?.[0],
        tokenURI: parseTokenUri(results[i + offset + 3]?.[0], x.assetId),
        contractURI: results[i + offset + 4]?.[0],
      });
      offset += 4;
      return;
    }

    if (x.assetType.valueOf() === StringAssetType.ERC1155) {
      res.push({
        asset: x,
        name: results[i + offset]?.[0],
        symbol: results[i + offset + 1]?.[0],
        decimals: results[i + offset + 2]?.[0],
        totalSupply: results[i + offset + 3]?.[0],
        tokenURI: parseTokenUri(results[i + offset + 4]?.[0], x.assetId),
        contractURI: results[i + offset + 5]?.[0],
      });
      offset += 5;
      return;
    }
  });
  return res;
};