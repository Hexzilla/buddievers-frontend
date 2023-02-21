import SwipeableDrawer, {
  SwipeableDrawerProps,
} from '@mui/material/SwipeableDrawer';

export const Drawer = ({ children, ...props }: SwipeableDrawerProps) => {
  return <SwipeableDrawer {...props}>{children}</SwipeableDrawer>;
};
