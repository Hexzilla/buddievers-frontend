import styled from '@emotion/styled';

const StyledButton = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border: none;

  width: 100%;
  height: 52px;

  font-size: 18px;
  color: white;
  background: #00ce4c;
  border-radius: 20px;

  cursor: pointer;
  text-transform: uppercase;
`;

const ActionButton = ({ onClick, children }: any) => {
  return <StyledButton onClick={onClick}>{children}</StyledButton>;
};

export default ActionButton;
