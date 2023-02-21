import TextField, { TextFieldProps } from '@mui/material/TextField';

export const Input = (props: TextFieldProps) => {
  return <TextField variant="outlined" placeholder="Search token" {...props} />;
};
