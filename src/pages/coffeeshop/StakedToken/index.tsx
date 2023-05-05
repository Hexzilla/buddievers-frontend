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
  const { startTime, unstake } = useStakeContext();
  const { token } = useToken(stakedToken?.tokenId.toString());

  const stakedTime = useMemo(() => {
    return moment(new Date(stakedToken.timestamp * 1000)).format('L hh:mm:ss');
  }, [stakedToken]);

  const rewardTime = useMemo(() => {
    if (stakedToken) {
      let stakedTime = moment(new Date(stakedToken.timestamp * 1000));

      let _startTime = moment(new Date(startTime * 1000));
      let elapsed = moment().diff(_startTime, 'd');
      let rewardTime = _startTime.add(Math.floor(elapsed) + 1, 'd');

      const diff = rewardTime.diff(stakedTime, 'd');
      if (diff < 1) {
        rewardTime = rewardTime.add(1, 'd');
      }
      return rewardTime.format('L HH:mm:ss');
    }
    return '';
  }, [startTime, stakedToken]);

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
          <StyledStakedAt>Reward at</StyledStakedAt>
          <StyledStakedTime>{rewardTime}</StyledStakedTime>
        </>
      }
      buttonTitle="Unstake"
      onClick={() => unstake(stakedToken.tokenId.toString())}
    />
  );
};

export default StakedToken;
