import styled, { css } from "styled-components";

export const IconContainer = styled.div`
  width: auto;
  height: auto;
  font-size: ${props => props.size ? props.size : '20px'};
  color: ${props => props.color ? props.color : 'black'};
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 0.3s;
  ${props => props.type === 'back' && css`
      position: absolute;
      top: 0;
      left: 0;
      transform: translate(-50%, -40%) rotate(45deg);
      z-index: 6;
  `}
  ${props => props.type === 'tag' && css`
      position: absolute;
      top: 63px;
      right: 30px;
      /* transform: translateY(-50%); */
      cursor: pointer;
  `}
  ${props => props.transform === 'true' && css`
      top: 60px;
      transform: rotate(180deg);
  `}
  ${props => props.type === 'bigHash' && css`
      width: 100px;
      height: 100px;
      position: absolute;
      left: 10px;
  `}
  ${props => props.type === 'trash' && css`
      position: absolute;
      right: 5px;
      &:hover {
          color: #ff6b6b;
          cursor: pointer;
      }
  `}
`;