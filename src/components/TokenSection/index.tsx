import React, { ReactNode } from 'react';
import { Grid } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled.div`
  margin-top: 60px;
`;

const Title = styled.p`
  font-size: 40px;
  font-weight: 900;
  color: white;
  margin-top: 0;
`;

const AmountText = styled.p`
  font-size: 24px;
  font-weight: 900;
  color: #00ce4c;
`;

type Props = {
  title: string;
  subTitle: string;
  children: ReactNode;
};

const TokenSection = ({ title, subTitle, children }: Props) => {
  return (
    <Container>
      <Grid container>
        <Grid xs={12} sm={6}>
          <Title>{title}</Title>
        </Grid>
        <Grid xs={12} sm={6} style={{ textAlign: 'right' }}>
          <AmountText>{subTitle}</AmountText>
        </Grid>
      </Grid>
      {children}
    </Container>
  );
};

export default TokenSection;
