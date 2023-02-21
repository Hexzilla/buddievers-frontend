import { StringAssetType } from 'utils/subgraph';

export interface AllowanceQuery {
  assetAddress?: string;
  assetType?: StringAssetType;
  assetId?: string;
  operator?: string;
}
