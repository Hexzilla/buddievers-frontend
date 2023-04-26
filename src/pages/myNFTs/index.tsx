import { useEffect, useState } from 'react';
import { useClasses, useActiveWeb3React } from 'hooks';
import useOwnedTokens from '../../hooks/useOwnedTokens';
import { styles } from './styles';
import { OwnedToken } from '../../components/types';
import { useStakeContext } from 'context/StakeContext';
import AttributeDialog from 'components/AttributeDialog';
import TokenSection from 'components/TokenSection';
import OwnedTokenList from './OwnedTokenList';

const MyNFTs = () => {
  const { container } = useClasses(styles);

  const { account } = useActiveWeb3React();
  const { token, stakedTokens, setToken } = useStakeContext();
  const [ownedTokens, setOwnedTokens] = useState<OwnedToken[]>([]);
  const getOwnedTokens = useOwnedTokens();

  useEffect(() => {
    if (account) {
      getOwnedTokens(account).then((tokens) => {
        const ownedTokens = (tokens || []).filter(
          (t: OwnedToken) =>
            !(stakedTokens || []).find((s) => s.tokenId === Number(t.numericId))
        );
        setOwnedTokens(ownedTokens);
      });
    }
  }, [account, getOwnedTokens, stakedTokens]);

  return (
    <div className={container}>
      <TokenSection
        title="My NFTS"
        subTitle={`TOTAL NFTS : ${ownedTokens.length}`}
      >
        <OwnedTokenList ownedTokens={ownedTokens} loading={false} />
      </TokenSection>

      {!!token && (
        <AttributeDialog token={token} onClose={() => setToken(null)} />
      )}
    </div>
  );
};

export default MyNFTs;
