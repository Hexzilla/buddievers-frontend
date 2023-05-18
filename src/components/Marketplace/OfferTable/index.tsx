import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import styled from '@emotion/styled';
import { shortAddress } from 'utils/utils';

const StyledTable = styled(Table)`
  background: transparent;
  color: white;
  width: 100%;

  td,
  th {
    color: white;
    font-size: 18px;
  }
  tr {
    border: none;
  }
`;

const FillButton = styled.button`
  width: 66px;
  height: 44px;
  color: white;
  background: rgba(0, 206, 76, 0.6);
  border-radius: 20px;
  border: none;
  cursor: pointer;
`;

const Message = styled.div`
  color: white;
  padding: 40px;
`;

const OfferTable = ({ orders, onTakeOffer, editable }: any) => {
  return (
    <TableContainer style={{ marginTop: '30px', textAlign: 'center' }}>
      <StyledTable aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Expiration</TableCell>
            <TableCell>Maker</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders.map((row: any, index: number) => (
            <TableRow
              key={index}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {shortAddress(row.id)}
              </TableCell>
              <TableCell>{row.type === 0 ? 'Buy' : 'Sell'}</TableCell>
              <TableCell>{row.price}</TableCell>
              <TableCell>{row.quantity}</TableCell>
              <TableCell>{row.expiration ? row.expiration : '-'}</TableCell>
              <TableCell>{shortAddress(row.owner)}</TableCell>
              <TableCell align="right">
                {editable ? (
                  <FillButton onClick={() => onTakeOffer(row)}>EDIT</FillButton>
                ) : (
                  <FillButton onClick={() => onTakeOffer(row)}>FILL</FillButton>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </StyledTable>
      {!orders.length && <Message>No records available...</Message>}
    </TableContainer>
  );
};

export default OfferTable;
