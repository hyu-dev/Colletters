import styled, { css } from 'styled-components';

const NestContainer = styled.div`
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
    transition: all 0.7s ease-in;
    z-index: 5;
    ${props => 
        props.modal &&
        css`
            height: 100%;
            background-color: rgba(255, 255, 255, 0.7);
        `
    }
`;


export default NestContainer;