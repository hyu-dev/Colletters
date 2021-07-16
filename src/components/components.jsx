import styled, { css } from "styled-components";

export const BackgroundBlur = styled.div`
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
    z-index: 2;
    ${props => 
        props.modal === 'true'
        && css`
            height: 100%;
            background-color: rgba(255, 255, 255, 0.7);
        `
    }
`;


export const IconContainer = styled.div`
    width: auto;
    height: auto;
    font-size: ${props => props.size ? props.size : '20px'};
    color: ${props => props.color ? props.color : 'black'};
    ${props => props.type === 'back' && css`
        position: absolute;
        top: 0;
        left: 0;
        transform: translate(-50%, -40%) rotate(45deg);
        z-index: 6;
    `}
    ${props => props.type === 'bigHash' && css`
        width: 100px;
        height: 100px;
        position: absolute;
        left: 10px;
    `}
`;

export const Input = styled.input`
    width: 400px;
    height: 70px;
    background: #fff;
    border: 2px solid #000;
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 20px;
    padding: 0 10px;
    outline: none;
    &:focus {
        border: 2px solid #ff6b6b;
    }
`;
