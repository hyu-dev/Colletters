import React from 'react';
import styled from 'styled-components';
import { StyledButton } from '../atoms/Button';

const StyledButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

function ButtonContainer({ name, onClick }) {
  return (
    <StyledButtonWrapper>
      <StyledButton
        name="certify"
        size='180px'
        onClick={() => onClick()}
      >
        {name.id}
      </StyledButton>
      <StyledButton
        name="certify"
        size='180px'
      >
        {name.pwd}
      </StyledButton>
    </StyledButtonWrapper>
  );
}

export default ButtonContainer;