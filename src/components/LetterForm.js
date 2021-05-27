import React from 'react';
import styled from 'styled-components';

import { FaSlackHash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

import { OpenTagProvider } from '../data/ModalContext';
import '../scss/LetterForm.scss';
import UserTag from './UserTag';

const fileInput = styled.input`
    
`;

const ImageContainer = styled.div`

`;

function LetterForm() {
    return (
        <>
        <OpenTagProvider>
            <UserTag />
        </OpenTagProvider>
        <div className="formContainer">
            <div className="formMiddleContainer">
                <div className="contentContainer">
                    <b>여기에 제목이 쓰인다</b>
                    <p>여기는 내용이 들어갑니다. 최대 300자 여기는 내용이 들어갑니다. 최대 300자여기는 내용이 들어갑니다. 최대 300자여기는 내용이 들어갑니다. 최대 300자여기는 내용이 들어갑니다. 최대 300자여기는 내용이 들어갑니다. 최대 300자여기는 내용이 들어갑니다. 최대 300자여기는 내용이 들어갑니다. 최대 300자여기는 내용이 들어갑니다. 최대 300자여기는 내용이 들어갑니다. 최대 300자여기는 내용이 들어갑니다. 최대 300자여기는 내용이 들어갑니다. 최대 300자여기는 내용이 들어갑니다. 최대 300자 여기는 내용이 들어갑니</p>
                    <div className="attachmentContainer">

                    </div>
                </div>
                <div className="tagContainer">

                </div>
                <div className="buttonContainer">

                </div>
            </div>
        </div>
        </>
    );
}

function Attachment() {
    return (
        <div className="">
            <img src="" alt=""/>
            <img src="" alt=""/>
            <img src="" alt=""/>
        </div>
    )
}

export default LetterForm;