import { Grid } from '@mui/material';
import React from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  min-height: 100vh;
  padding: 260px 0;
`;

const Message = styled.div`
  font-size: 40px;
  font-weight: 900;
  color: white;
  text-align: center;
`;

const EmptyWallet = () => {
  return (
    <Container>
      <Grid container>
        <Grid item>
          <Message>Please Connect Your Wallet</Message>
        </Grid>
      </Grid>
    </Container>
  );
};

export default EmptyWallet;
