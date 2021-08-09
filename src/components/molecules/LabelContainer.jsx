import React from 'react';
import styled from 'styled-components';
import { useChangeInput } from '../../utils/costomHooks';
import { StyledButton } from '../atoms/Button';
import { StyledInput } from '../atoms/Input';
import ButtonContainer from './ButtonContainer';

const StyledLabelWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 400px;
  margin: 20px 0;
  label {
    font-size: 25px;
  }
`;

function LabelContainer({ type }) {
  const userInput = useChangeInput('');
  const currentState = {
    'input': <StyledInput type={type?.input} size={type?.size} {...userInput} />,
    'button': <StyledButton name={type?.button} size={type?.size}>{type?.value}</StyledButton>,
    'doubleButton': <ButtonContainer name={type?.buttonState} onClick={type?.onClick} />
  }

  return (
    <StyledLabelWrapper>
      <label>{ type?.label }</label>
      { currentState[type.type] }
    </StyledLabelWrapper>
  );
}

export default LabelContainer;