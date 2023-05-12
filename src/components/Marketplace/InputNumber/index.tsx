import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';

const InputNumber = ({ value, onChange }: any) => {
  return (
    <Paper
      component="form"
      sx={{
        p: '0px 4px',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      <InputBase
        type="number"
        sx={{ color: 'white' }}
        value={value}
        onChange={onChange}
      />
      <Button sx={{ p: '10px' }} aria-label="search">
        MAX
      </Button>
    </Paper>
  );
};

export default InputNumber;
