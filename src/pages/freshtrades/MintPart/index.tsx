import styled from '@emotion/styled';
import { Typography } from '@mui/material';
import { MintButton } from '../MintButton';

const MainTitle = styled(Typography)`
  border-radius: 0;
  font-family: Poppins;
  font-size: 80px;
  font-weight: 900;
  line-height: 120px;
  letter-spacing: 0em;
  text-align: center;
  color: #ffffff;
  align-items: center;
  flex: none;
  flex-grow: 0;

  font-family: 'Poppins';
  font-style: normal;
  font-weight: 900;
  font-size: 80px;
  line-height: 120px;
  /* identical to box height */
  
  display: flex;
  align-items: center;
  text-align: center;
  
  /* Neutral/White */
  color: #FFFFFF;
  
  /* Inside auto layout */
  flex: none;
  flex-grow: 0;

  text-transform: uppercase;
`;

const SubTitle = styled(Typography)`
  font-family: Poppins;
  font-style: normal;
  font-weight: 900;
  font-size: 24px;
  line-height: 36px;
  align-items: center;
  text-align: center;
  color: #ffffff;
  text-transform: uppercase;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

export type MintStatus = 'soon' | 'online';

export type MiniProps = {
  state: MintStatus;
  setRegistered: (value: boolean) => void;
};

export const MintPart = ({ state, setRegistered }: MiniProps) => (
  <>
    <MainTitle>{state === 'soon' ? 'Mint Soon' : 'Mint Is Online'}</MainTitle>
    <SubTitle>Check Your Whitelist Status</SubTitle>
    <ButtonContainer>
      <MintButton
        title="Are you registered?"
        onClick={() => setRegistered(true)}
      ></MintButton>
    </ButtonContainer>
  </>
);
