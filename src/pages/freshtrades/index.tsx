import { useActiveWeb3React, useClasses } from 'hooks';
import { Button, GlitchText } from 'ui';
import { styles } from './styles';
import { useMint1Contract } from 'hooks/useContracts/useContracts'
import { MINT1_ADDRESS, ChainId, GAS_LIMIT, MINT_PRICE } from '../../constants'

const FreshTradesPage = () => {
  const { account, error } = useActiveWeb3React();

  const mintContract = useMint1Contract(MINT1_ADDRESS[ChainId.MOONRIVER], true);
  const { container, button } = useClasses(styles);
  const mintNFT = async () => {
    const res = await mintContract?.whitelistedMints(1,
      "https://drive.google.com/file/d/1A739BEoj7eU1GnuEdqoWt7AOPtypYN1u/view?usp=share_link", {
      gasLimit: GAS_LIMIT,
      from: account,
      value: MINT_PRICE
    }).then((receipt: any) => {
      console.debug('result', receipt)
    })
  }

  return (
    <>
      <div className={container}>
        <GlitchText variant="h1">Mint NFT</GlitchText>
        <Button
          className={button}
          onClick={mintNFT}
        >
          Mint
        </Button>
      </div>
    </>
  );
};

export default FreshTradesPage;
