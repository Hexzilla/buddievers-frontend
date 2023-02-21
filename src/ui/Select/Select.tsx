import Sel, { SelectProps } from '@mui/material/Select';

export const Select = ({ children, ...props }: SelectProps) => {
  return (
    <>
      <Sel {...props}>{children}</Sel>
    </>
  );
};
