import styled from '@emotion/styled';

const StyledButton = styled.button`
  border: none;

  width: 100%;
  height: 52px;

  font-size: 18px;
  color: white;
  background: ${props => props.disabled ? '#023a17' : '#00ce4c'};
  border-radius: 20px;

  cursor: pointer;
  text-transform: uppercase;
`;

const ActionButton = ({ onClick, children, ...props }: any) => {
  return (
    <StyledButton onClick={onClick} {...props}>
      {children}
    </StyledButton>
  );
};

export default ActionButton;
