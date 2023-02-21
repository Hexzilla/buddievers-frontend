import { Interface } from "@ethersproject/abi";
import { BigNumber } from "@ethersproject/bignumber";
import { MaxUint256 } from "@ethersproject/constants";
import { AllowanceQuery } from "hooks/useApproveCallback/useApproveCallback.types";
import { StringAssetType } from "./subgraph";

export const getTokenAllowanceCalls = (assets: AllowanceQuery[], account?: string) => {

    let calls: [any, string, string, any[]][] = [];

    if (!account) {
        return []
    }

    assets.map(asset => {
        if (!asset || !asset.assetAddress || !asset.assetId || !asset.assetType || !asset.operator) {
            return
        }

        if (asset.assetType?.valueOf() === StringAssetType.NATIVE) {
            return
        }

        if (asset.assetType?.valueOf() === StringAssetType.ERC20) {
            calls.push(
                [
                    [
                        new Interface([
                            'function allowance(address,address) public view returns (uint256)',
                        ]).getFunction('allowance'),
                    ],
                    asset.assetAddress,
                    'allowance',
                    [
                        account,
                        asset.operator,
                    ],
                ]
            )
            return
        }

        if (asset.assetType?.valueOf() === StringAssetType.ERC721) {
            calls.push(
                [
                    [
                        new Interface([
                            'function isApprovedForAll(address,address) public view returns (bool)',
                        ]).getFunction('isApprovedForAll'),
                    ],
                    asset.assetAddress,
                    'isApprovedForAll',
                    [
                        account,
                        asset.operator
                    ],
                ]
            )
            return
        }

        if (asset.assetType?.valueOf() === StringAssetType.ERC1155) {
            calls.push(
                [
                    [
                        new Interface([
                            'function isApprovedForAll(address,address) public view returns (bool)',
                        ]).getFunction('isApprovedForAll'),
                    ],
                    asset.assetAddress,
                    'isApprovedForAll',
                    [
                        account,
                        asset.operator
                    ],
                ]
            )
            return
        }

        return [];
    })

    return calls
};

export const processTokenAllowanceCalls = (
    queries: AllowanceQuery[],
    results: any[]
) => {
    let res: ({ allowance: BigNumber } | undefined)[] = [];
    let offset = 0;
    queries.map((query, i) => {
        if (!query || !query.assetType || !query.assetAddress || !query.assetId) {
            offset -= 1
            res.push(undefined)
            return
        }

        console.log('allowance', results)
        if (query.assetType.valueOf() === StringAssetType.ERC20) {
            res.push({
                allowance: results[i + offset]?.[0],
            });
            return;
        }

        if (query.assetType.valueOf() === StringAssetType.ERC721) {
            res.push({
                allowance: results[i + offset]?.[0] === true ? MaxUint256 : BigNumber.from(0)
            });
            return;
        }

        if (query.assetType.valueOf() === StringAssetType.ERC1155) {
            res.push({
                allowance: results[i + offset]?.[0] === true ? MaxUint256 : BigNumber.from(0)
            });
            return;
        }
    });
    return res;
};