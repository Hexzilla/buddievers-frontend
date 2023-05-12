import React, { useState } from 'react';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';

import AddSellOffer from '../AddSellOffer';
import AddBuyOffer from '../AddBuyOffer';

const StyledButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  border: none;
  width: 100%;
  height: 76px;
  color: white;
  font-size: 24px;
  background: rgba(0, 206, 76, 0.6);
  border-radius: 20px;
  cursor: pointer;
`;

const Toolbar = () => {
  const [showBuyOffer, setShowBuyOffer] = useState(false);
  const [showSellOffer, setShowSellOffer] = useState(false);

  return (
    <div style={{ marginTop: '6vh' }}>
      <Grid container spacing={2}>
        <Grid item md={4} sm={12}>
          <StyledButton onClick={() => setShowBuyOffer(true)}>
            BUY $SEEDS
          </StyledButton>
        </Grid>
        <Grid item md={4} sm={12}>
          <StyledButton onClick={() => setShowSellOffer(true)}>
            SELL $SEEDS
          </StyledButton>
        </Grid>
        <Grid item md={4} sm={12}>
          <StyledButton>TRANSFER</StyledButton>
        </Grid>
      </Grid>
      {showBuyOffer && <AddBuyOffer onClose={() => setShowBuyOffer(false)} />}
      {showSellOffer && (
        <AddSellOffer onClose={() => setShowSellOffer(false)} />
      )}
    </div>
  );
};

export default Toolbar;
