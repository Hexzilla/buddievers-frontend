import { StringAssetType } from "../../utils/subgraph";
import box1Video from '../../assets/samabox/1.mp4';
import box2Video from '../../assets/samabox/2.mp4';
import box3Video from '../../assets/samabox/3.mp4';
import box1imageUnopened from '../../assets/samabox/1.jpg';
import box2imageUnopened from '../../assets/samabox/2.jpg';
import box3imageUnopened from '../../assets/samabox/3_unopened.jpg';


export type LootboxDataType = {
    blueprintId: string,
    lootboxId: string,
    name: string,
    blueprintOutput: {
        assetAddress: string,
        assetId: string,
        assetType: StringAssetType,
        id: string,
        amount: string
    },
    notEnoughText: string,
    notEnoughLink: string,
    noMoreText: string,
    noMoreLink: string,
    conditionsText: string
    craftText: string,
    burnText: string,
    openText: string,
    openDialogText: string,
    video: string,
    imageUnopened: string,
    openSectionDisabled?: boolean,
    selectInputAmountPossible?: boolean,
    version: string,
    craftTitle: string,
    availableOutputLabel: string
    lootNum: number
}

export const LOOTBOXES: LootboxDataType[] = [
    {
        version: 'V1',
        blueprintId: '2',
        lootboxId: '0xd335417999ff2b9b59737244e554370264b3f877-1-1',
        name: 'S1 Sama Box',
        blueprintOutput: {
            assetAddress: '0xd335417999ff2b9b59737244e554370264b3f877'.toLowerCase(),
            assetId: '1',
            assetType: StringAssetType.ERC1155,
            id: '-',
            amount: '1'
        },
        lootNum: 3,
        notEnoughText: 'Not enough resources',
        notEnoughLink: '/collection/ERC1155/0x1b30a3b5744e733d8d2f19f0812e3f79152a8777/0?page=1&sort=3',
        noMoreText: `No more boxes left to craft`,
        noMoreLink: '/token/ERC1155/0xd335417999ff2b9b59737244e554370264b3f877/1',
        conditionsText: 'The Moonsama Council requires the presentation of a resource sacrifice',
        craftText: 'Craft one',
        burnText: '"Push to open"',
        openText: 'The lid is loose',
        openDialogText: 'Click to open',
        craftTitle: 'Get a box',
        availableOutputLabel: 'boxes',
        video: box1Video,
        imageUnopened: box1imageUnopened
    },
    {
        version: 'V1',
        blueprintId: '3',
        lootboxId: '0xd335417999ff2b9b59737244e554370264b3f877-2-1',
        name: 'S1 Reward Box',
        blueprintOutput: {
            assetAddress: '0xd335417999ff2b9b59737244e554370264b3f877'.toLowerCase(),
            assetId: '2',
            assetType: StringAssetType.ERC1155,
            id: '-',
            amount: '1'
        },
        lootNum: 3,
        notEnoughText: `You need a fitting key`,
        notEnoughLink: '/token/ERC1155/0x1b30a3b5744e733d8d2f19f0812e3f79152a8777/11',
        noMoreText: `No more boxes left to craft`,
        noMoreLink: '/token/ERC1155/0xd335417999ff2b9b59737244e554370264b3f877/2',
        conditionsText: 'Box is granted to whomever presents a fitting key',
        craftText: 'See if your key matches',
        burnText: 'Turn the key',
        openText: 'The lid is loose',
        openDialogText: 'Click to open',
        craftTitle: 'Get a box',
        availableOutputLabel: 'boxes',
        video: box2Video,
        imageUnopened: box2imageUnopened
    },
    {
        blueprintId: '2',
        openSectionDisabled: true,
        version: 'V2',
        lootboxId: '0x19bda58205cea54a4e73579402687145a50dffd7-2-1',
        name: 'Moonrod',
        blueprintOutput: {
            assetAddress: '0x1974eEAF317Ecf792ff307F25A3521C35eECde86'.toLowerCase(),
            assetId: '70',
            assetType: StringAssetType.ERC1155,
            id: '-',
            amount: '1'
        },
        lootNum: 1,
        notEnoughText: `Not enough resources`,
        notEnoughLink: '/collection/ERC1155/0x1b30a3b5744e733d8d2f19f0812e3f79152a8777/0?page=1&sort=3',
        noMoreText: `No more Moonrod is available`,
        noMoreLink: '/token/ERC1155/0x1974eEAF317Ecf792ff307F25A3521C35eECde86/70',
        conditionsText: 'Moonrod of the highest quality. Best available tool for catching a fish.. should you have enough resources to afford it.',
        craftText: 'Craft Moonrod',
        burnText: '',
        openText: '',
        openDialogText: '',
        craftTitle: 'Craft',
        availableOutputLabel: 'Moonrods',
        video: box2Video,
        imageUnopened: box2imageUnopened
    },
    {
        blueprintId: '1',
        openSectionDisabled: true,
        selectInputAmountPossible: true,
        version: 'V2',
        lootboxId: '0x19bda58205cea54a4e73579402687145a50dffd7-1-1',
        name: 'Fish bait',
        blueprintOutput: {
            assetAddress: '0x1b30a3b5744e733d8d2f19f0812e3f79152a8777'.toLowerCase(),
            assetId: '14',
            assetType: StringAssetType.ERC1155,
            id: '-',
            amount: '1000000000000000000'
        },
        lootNum: 1,
        notEnoughText: `Not enough grains`,
        notEnoughLink: '/token/ERC1155/0x1b30a3b5744e733d8d2f19f0812e3f79152a8777/10',
        noMoreText: `No more bait is available`,
        noMoreLink: '/token/ERC1155/0x1b30a3b5744e733d8d2f19f0812e3f79152a8777/14',
        conditionsText: 'Fish love bread. Bread makes good bait. Bread is made from wheat grains.',
        craftText: 'Make bait',
        burnText: '',
        openText: '',
        openDialogText: '',
        craftTitle: 'Make',
        availableOutputLabel: 'baits',
        video: box2Video,
        imageUnopened: box2imageUnopened
    },
    {
        blueprintId: '3',
        openSectionDisabled: false,
        selectInputAmountPossible: true,
        version: 'V2',
        lootboxId: '0xd335417999ff2b9b59737244e554370264b3f877-3-1',
        name: 'Pondsama',
        blueprintOutput: {
            assetAddress: '0xd335417999ff2b9b59737244e554370264b3f877'.toLowerCase(),
            assetId: '3',
            assetType: StringAssetType.ERC1155,
            id: '-',
            amount: '1'
        },
        lootNum: 1,
        notEnoughText: `Insufficient sacrifice`,
        notEnoughLink: '/collection/ERC1155/0x1b30a3b5744e733d8d2f19f0812e3f79152a8777/0?page=1&sort=3',
        noMoreText: `The Sunken One is not in the mood`,
        noMoreLink: '/collection/ERC1155/0xe4edcaaea73684b310fc206405ee80abcec73ee0/0?page=1&sort=3',
        conditionsText: `The grip of the tide will usher you into the shadow of The Sunken One’s mass. Genuflect, eyes down, steady breath. Present your offering - say nothing. You’ll be handed a gift or handed your death.`,
        craftText: 'Create offering bundle',
        burnText: 'Approach the Sunken One',
        openText: 'The Sunken One emerges',
        openDialogText: 'Throw offering',
        craftTitle: 'Create',
        availableOutputLabel: 'offerings',
        video: box3Video,
        imageUnopened: box3imageUnopened
    }
]
