import styled from '@emotion/styled';
import MaterialButton from '@mui/material/Button';
import { theme } from 'theme/Theme';

const StyledButton = styled(MaterialButton)`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px 40px;
  width: 344px;
  height: 76px;
  background: #0078BB;
  border-radius: 20px;
  flex: none;
  flex-grow: 0;
`;

const StyledSpan = styled.span`
  font-family: Poppins;
  font-style: normal;
  font-weight: 700;
  font-size: 24px;
  line-height: 36px;
  display: flex;
  align-items: center;
  text-align: center;
  color: white;
  flex: none;
  flex-grow: 0;
  text-transform: uppercase;
`;

type Props = {
  title: string;
  onClick: () => void;
};

export const MintButton = ({ title, onClick }: Props) => (
  <StyledButton onClick={onClick}>
    <StyledSpan>{title}</StyledSpan>
  </StyledButton>
);
