import styled from 'styled-components';

export const StyledInput = styled.input`
  width: ${props => props.size && props.size};
  height: 70px;
  background: white;
  border: 3px solid black;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 20px;
  padding: 0 10px;
  outline: none;
  &:focus {
      border: 3px solid #ff6b6b;
  }
`;