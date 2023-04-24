import styled from '@emotion/styled';

import { useStakeContext } from 'context/StakeContext';
import TokenCard from 'components/TokenCard';
import { OwnedToken } from 'components/types';

const StyledTokenName = styled.p`
  font-weight: 900;
  font-size: 24px;
  color: white;
  margin-bottom: 0;
  text-transform: uppercase;
`;

const StyledBuddies = styled.p`
  font-weight: 400;
  font-size: 16;
  color: #00ce4c;
  margin-top: 0;
  text-transform: uppercase;
`;

type Props = {
  token: OwnedToken;
};

const OwnedTokenCard = ({ token }: Props) => {
  const { stake } = useStakeContext();

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
          <StyledBuddies>BUDDIES</StyledBuddies>
        </>
      }
      buttonTitle="Stake"
      onClick={() => stake(token.numericId.toString())}
    />
  );
};

export default OwnedTokenCard;
