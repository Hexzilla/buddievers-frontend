import { Grid } from '@mui/material';

const ItemRow = ({ heading, children }) => {
  return (
    <>
      <Grid item xs={6}>
        {heading}
      </Grid>
      <Grid item xs={6}>
        {children}
      </Grid>
    </>
  );
};

export default ItemRow;
