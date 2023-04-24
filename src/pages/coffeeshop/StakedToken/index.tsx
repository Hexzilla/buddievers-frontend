import { useMemo } from 'react';
import styled from '@emotion/styled';
import moment from 'moment';

import { useToken } from 'hooks/useToken';
import { StakedTokenItem, useStakeContext } from 'context/StakeContext';
import TokenCard from 'components/TokenCard';

const StyledTokenName = styled.p`
  font-weight: 900;
  font-size: 24px;
  color: white;
  margin-bottom: 0;
  text-transform: uppercase;
`;

const StyledStakedAt = styled.div`
  font-weight: 400;
  font-size: 16;
  color: #00ce4c;
  margin-top: 8px;
  margin-bottom: 0;
  text-transform: uppercase;
`;

const StyledStakedTime = styled.div`
  font-weight: 400;
  font-size: 14;
  color: white;
  margin-bottom: 0;
  text-transform: uppercase;
`;

/*const StyledBuddies = styled.p`
  font-weight: 400;
  font-size: 16;
  color: #00ce4c;
  margin-top: 0;
  text-transform: uppercase;
`;*/

type Props = {
  stakedToken: StakedTokenItem;
};

const StakedToken = ({ stakedToken }: Props) => {
  const { unstake } = useStakeContext();
  const { token } = useToken(stakedToken?.tokenId.toString());

  const stakedTime = useMemo(() => {
    return moment(new Date(stakedToken.timestamp * 1000)).format('L hh:mm:ss');
  }, [stakedToken]);

  if (!token) {
    return <></>;
  }

  return (
    <TokenCard
      token={token}
      info={
        <>
          <StyledTokenName>
            Buddie #{token.numericId?.toString()}
          </StyledTokenName>
          <StyledStakedAt>Staked at</StyledStakedAt>
          <StyledStakedTime>{stakedTime}</StyledStakedTime>
        </>
      }
      buttonTitle="Unstake"
      onClick={() => unstake(stakedToken.tokenId.toString())}
    />
  );
};

export default StakedToken;
