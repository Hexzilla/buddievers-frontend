import React, { useMemo } from 'react';
import {
  Grid,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import styled from '@emotion/styled';

import { Button } from 'ui';
import { OwnedToken } from 'components/types';

const AttributeCard = styled.div`
  padding: 10px;
  text-align: center;
  box-shadow: 1px 1px 1px 1px rgba(0,0,0,0.1);
  border: 1px solid rgba(0,0,0,0.5);
  border-radius: 20px;
  & > p {
    color: black;
  }
  & > h4 {
    color: green;
  }
`;

type Props = {
  token: OwnedToken;
  onClose: () => void;
};

const AttributeDialog = ({ token, onClose }: Props) => {
  const attributes = useMemo(() => {
    return token?.metadata?.attributes ? token.metadata.attributes : []
  }, [token]);

  return (
    <Dialog
      open={true}
      onClose={onClose}
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      maxWidth="lg"
    >
      <DialogTitle id="dialog-title">{'Attributes'}</DialogTitle>
      <DialogContent>
        <Grid container spacing={2}>
          {attributes.map((attribute: any) => (
            <Grid item xs={12} lg={4}>
              <AttributeCard>
                <p>{attribute.traitType}</p>
                <h4>{attribute.value}</h4>
              </AttributeCard>
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button disableRipple onClick={onClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AttributeDialog;
