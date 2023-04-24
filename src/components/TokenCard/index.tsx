import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';

import { OwnedToken } from 'components/types';
import { useStakeContext } from 'context/StakeContext';

const TokenImage = styled.img`
  width: 100%;
  height: 400px;
  border-radius: 20px;
`;

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  height: 50px;
  color: white;
  font-size: 20px;
  font-weight: 400;
  border: none;
  background: rgba(0, 206, 76, 0.6);
  border-radius: 20px;
  width: 100%;
  cursor: pointer;
`;

const CardInformation = styled.div`
  padding: 20px;
  margin-top: -6px;
`;

type Props = {
  token: OwnedToken;
  info: ReactNode;
  buttonTitle: string;
  onClick: (token: OwnedToken) => void;
};

const StakedToken = ({ token, info, buttonTitle, onClick }: Props) => {
  const navigate = useNavigate();
  const { setToken } = useStakeContext();

  const handleViewToken = (tokenId: string) => {
    navigate(`/builder/${tokenId}`);
  }

  if (!token) {
    return <></>;
  }

  return (
    <Grid item xs={12} sm={12} md={12} lg={3} style={{ marginBottom: '40px' }}>
      <TokenImage src={token.metadata?.image} alt="nft" />
      <CardInformation>
        <Grid container spacing={1}>
          <Grid item xs={6}>
            {info}
          </Grid>
          <Grid item xs={6}>
            <StyledButton
              style={{ marginTop: '30px', letterSpacing: '1px' }}
              onClick={() => setToken(token)}
            >
              Attributes
            </StyledButton>
          </Grid>
        </Grid>
      </CardInformation>
      <Grid container spacing={1}>
        <Grid item xs={24} sm={12} md={6}>
          <StyledButton onClick={() => handleViewToken(token.numericId)}>
            VIEW
          </StyledButton>
        </Grid>
        <Grid item xs={24} sm={12} md={6}>
          <StyledButton onClick={() => onClick(token)}>
            {buttonTitle}
          </StyledButton>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default StakedToken;
