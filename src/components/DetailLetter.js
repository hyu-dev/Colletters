import React, { useState } from 'react';
import styled, { css, createGlobalStyle } from 'styled-components';
import { FaPlus } from 'react-icons';
import NestContainer from './NestContainer.js';

const DetailContainer = styled.div`
    width: 1100px;
    height: 800px;
    background: #f6f6f6;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
`;

const CloseButtonContainer = styled.div`
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
`;

function DetailLetter() {
    let [표시, 표시변경] = useState(false)

    return (
        <NestContainer 표시={표시}>
            {/* <DetailContainer>
                <CloseButtonContainer></CloseButtonContainer>
            </DetailContainer> */}
        </NestContainer>
    );
}

export default DetailLetter;