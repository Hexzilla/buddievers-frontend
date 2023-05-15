import React, { useState } from 'react';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';

import AddSellOffer from '../AddSellOffer';
import AddBuyOffer from '../AddBuyOffer';
import Transfer from '../Transfer';

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
  const [showDialog, setShowDialog] = useState(0);

  return (
    <div style={{ marginTop: '6vh' }}>
      <Grid container spacing={2}>
        <Grid item md={4} sm={12}>
          <StyledButton onClick={() => setShowDialog(1)}>
            BUY $SEEDS
          </StyledButton>
        </Grid>
        <Grid item md={4} sm={12}>
          <StyledButton onClick={() => setShowDialog(2)}>
            SELL $SEEDS
          </StyledButton>
        </Grid>
        <Grid item md={4} sm={12}>
          <StyledButton onClick={() => setShowDialog(3)}>TRANSFER</StyledButton>
        </Grid>
      </Grid>
      {showDialog === 1 && <AddBuyOffer onClose={() => setShowDialog(0)} />}
      {showDialog === 2 && <AddSellOffer onClose={() => setShowDialog(0)} />}
      {showDialog === 3 && <Transfer onClose={() => setShowDialog(0)} />}
    </div>
  );
};

export default Toolbar;
