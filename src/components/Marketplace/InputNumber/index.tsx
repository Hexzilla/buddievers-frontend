import { Button } from '@mui/material';
import Paper from '@mui/material/Paper';
import InputBase, { InputBaseProps } from '@mui/material/InputBase';
import styled from '@emotion/styled';

const StyledButton = styled(Button)`
  color: white;
  background: #00ce4c;
`;

interface Props extends InputBaseProps {
  value: number;
  onChange: (e: any) => void;
  onButtonClick?: () => void;
};

const InputNumber = ({ value, onChange, onButtonClick, ...props }: Props) => {
  return (
    <Paper
      component="form"
      sx={{
        p: '0px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 'fit-content',
      }}
    >
      <InputBase
        type="number"
        sx={{ color: 'white', fontSize: 20 }}
        value={value}
        onChange={onChange}
        {...props}
      />
      {!!onButtonClick && (
        <StyledButton aria-label="MAX" onClick={onButtonClick}>
          MAX
        </StyledButton>
      )}
    </Paper>
  );
};

export default InputNumber;
