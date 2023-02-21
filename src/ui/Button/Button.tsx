import MaterialButton, { ButtonProps } from '@mui/material/Button';

export const Button = ({ children, ...props }: ButtonProps) => {
  return <MaterialButton {...props}>{children}</MaterialButton>;
};
