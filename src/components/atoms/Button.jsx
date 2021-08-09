import styled, { css } from "styled-components";

export const StyledButton = styled.button`
  width: ${props => props.size && props.size};
  height: 70px;
  background: #fff;
  border: 3px solid black;
  color: black;
  border-radius: 10px;
  box-sizing: border-box;
  font-size: 25px;
  letter-spacing: 1px;
  padding: 0 10px;
  outline: none;
  cursor: pointer;
  position: relative;
  &:hover {
    background: black;
    color: white;
    transition: all 0.3s;
  }
  &:active {
    top: 3px;
  }
  ${props => props.name === 'login' && css`
      border-color: #7165FF;
      color: #7165FF;
      &:hover {
        background: #7165FF;
      }
  `}
  ${props => props.name === 'certify' && css`
      border-color: #87E8D6;
      color: #87E8D6;
      &:hover {
        background: #87E8D6;
      }
  `}
  ${props => props.name === 'join' && css`
      border-color: #FF9BD1;
      color: #FF9BD1;
      &:hover {
        background: #FF9BD1;
      }
  `}
`;