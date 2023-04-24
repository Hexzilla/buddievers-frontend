import { useEffect, useMemo, useState } from 'react';
import { Grid } from '@mui/material';
import { useClasses, useActiveWeb3React } from 'hooks';
import useOwnedTokens from '../../hooks/useOwnedTokens';
import { styles } from './styles';
import { OwnedToken } from '../../components/types';
import { useStakeContext } from 'context/StakeContext';
import Pagination from 'components/Pagination';
import AttributeDialog from 'components/AttributeDialog';
import TokenCard from 'components/TokenCard';

const PageSize = 12;

const MyNFTs = () => {
  const {
    container,
    stakedNFTs,
    stakeTitleLeft,
    stakeTitleRight,
    paginationContainer,
  } = useClasses(styles);

  const [pageNumber, setPageNumber] = useState(0);
  const { account } = useActiveWeb3React();
  const { token, stakedTokens, setToken, stake } = useStakeContext();
  const [ownedTokens, setOwnedTokens] = useState<OwnedToken[]>([]);
  const getOwnedTokens = useOwnedTokens();

  const tokens = useMemo(() => {
    if (ownedTokens) {
      if (ownedTokens.length <= PageSize) {
        return ownedTokens;
      }
      const startIndex = (pageNumber - 1) * PageSize;
      return [...ownedTokens].slice(startIndex, startIndex + PageSize);
    }
    return [];
  }, [ownedTokens, pageNumber]);

  useEffect(() => {
    if (account) {
      getOwnedTokens(account).then((tokens) => setOwnedTokens(tokens));
    }
  }, [account, pageNumber, getOwnedTokens, stakedTokens]);

  if (!account) {
    return (
      <div className={container}>
        <div className={stakedNFTs}>
          <Grid container>
            <Grid item>
              <p className={stakeTitleLeft}>Please Connect Your Wallet</p>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }

  return (
    <div className={container}>
      <div className={stakedNFTs}>
        <Grid container>
          <Grid item sm={6}>
            <p className={stakeTitleLeft}>My NFTS</p>
          </Grid>
          <Grid item sm={6} style={{ textAlign: 'right' }}>
            <p className={stakeTitleRight}>
              TOTAL NFTS : {ownedTokens.length}{' '}
            </p>
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          {tokens.map((token: OwnedToken, index) => (
            <TokenCard
              key={index}
              token={token}
              info={
                <>
                  <p
                    style={{
                      fontWeight: 900,
                      fontSize: 24,
                      color: 'white',
                      marginBottom: 0,
                    }}
                  >
                    BUDDIE #{token.numericId.toString()}
                  </p>
                  <p
                    style={{
                      fontWeight: 400,
                      fontSize: 16,
                      color: '#00CE4C',
                      marginTop: 0,
                    }}
                  >
                    BUDDIES
                  </p>
                </>
              }
              buttonTitle="Stake"
              onClick={() => stake(token.numericId)}
            />
          ))}
        </Grid>
      </div>
      <div className={paginationContainer}>
        <Pagination
          totalCount={ownedTokens.length}
          pageSize={PageSize}
          onChange={(pageNumber) => setPageNumber(pageNumber)}
        />
      </div>

      {!!token && (
        <AttributeDialog token={token} onClose={() => setToken(null)} />
      )}
    </div>
  );
};

export default MyNFTs;
