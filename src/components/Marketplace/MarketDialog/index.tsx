import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import styled from '@emotion/styled';

const StyledTitle = styled(DialogTitle)`
  background: #01472a;
  color: #ffffff;
  
  text-align: center;
  text-transform: uppercase;
  
  font-size: 24px;
  padding: 24px 60px;
`;

const StyledContent = styled(DialogContent)`
  display: flex;
  flex-direction: column;
  gap: 18px;
  padding: 42px 40px 42px 60px;

  background: #01472a;
  color: #ffffff;
`;

const StyledActions = styled(DialogActions)`
  display: flex;
  justify-content: space-between;

  background: #01472a;
  color: #ffffff;

  padding-bottom: 24px;
`;

const MarketDialog = ({ title, actions, onClose, children }: any) => {
  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth="md"
      onClose={() => onClose()}
      title={title}
    >
      <StyledTitle>{title}</StyledTitle>
      <StyledContent>{children}</StyledContent>
      <StyledActions>
        {actions}
      </StyledActions>
    </Dialog>
  );
};

export default MarketDialog;
