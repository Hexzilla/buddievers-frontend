import DialogUI, { DialogProps } from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useClasses } from 'hooks';
import { styles } from './Dialog.styles';

export const Dialog = ({ title, children, onClose, ...props }: DialogProps) => {
  const { dialogContainer, dialogTitle, paperStyles, closeButton } =
    useClasses(styles);
  const handleClose = () => {
    onClose && onClose({}, 'escapeKeyDown');
  };
  return (
    <DialogUI
      className={dialogContainer}
      PaperProps={{
        className: paperStyles,
      }}
      onClose={onClose}
      {...props}
    >
      <div>
        <DialogTitle className={dialogTitle}>
          <Typography>{title}</Typography>
          {onClose ? (
            <div>
              <IconButton
                className={closeButton}
                aria-label="close"
                onClick={handleClose}
              >
                &times;
              </IconButton>
            </div>
          ) : null}
        </DialogTitle>

        {children}
      </div>
    </DialogUI>
  );
};
