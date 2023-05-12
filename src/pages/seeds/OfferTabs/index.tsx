import { Tabs, Tab } from '@mui/material';
import styled from '@emotion/styled';

const StyledTab = styled(Tab)`
  width: 140px;
  height: 44px;
  background: #00ce4c;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  cursor: pointer;
  border: none;
  margin-left: 20px;
`;

const OfferTabs = ({ value, onChange }: any) => {
  return (
    <Tabs value={value} onChange={onChange}>
      <StyledTab label="BUY OFFERS" />
      <StyledTab label="SELL OFFERS" />
      <StyledTab label="YOUR  OFFERS" />
    </Tabs>
  );
};

export default OfferTabs;
