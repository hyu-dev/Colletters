import styled, { css } from "styled-components";

export const StyledBackgroundWhite = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0);
  z-index: 5;
  ${props => 
    props.modal === 'true' &&
    css`
      height: 100%;
      background-color: rgba(255, 255, 255, 0.7);
    `
  }
`;

export const StyledBackgroundBlack = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;