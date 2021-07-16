import styled, { css } from "styled-components";

export const IconContainer = styled.div`
    width: auto;
    height: auto;
    font-size: ${props => props.size ? props.size : '20px'};
    color: ${props => props.color ? props.color : 'black'};
    ${props => props.type === 'back' && css`
        position: absolute;
        top: 0;
        right: 0;
        transform: translate(40%, -40%) rotate(45deg);
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
