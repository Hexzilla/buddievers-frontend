import { Grid } from '@mui/material';
import styled from '@emotion/styled';

const Label = styled(Grid)`
  font-size: 20px;
  color: rgb(0, 206, 76);
`;

const Value = styled(Grid)`
  font-size: 20px;
  color: white;
`;

const ItemRow = ({ heading, children }) => {
  return (
    <>
      <Label item xs={6}>
        {heading}
      </Label>
      <Value item xs={6}>
        {children}
      </Value>
    </>
  );
};

export default ItemRow;
