import React from 'react';
import styled from 'styled-components';

import { FaSlackHash, FaTrash, FaPlus } from 'react-icons/fa';

import { OpenTagProvider } from '../data/ModalContext';
import '../scss/LetterForm.scss';
import UserTag from './UserTag';
import { withRouter } from 'react-router';

const fileInput = styled.input`
    
`;

const ImageContainer = styled.div`

`;

function LetterForm(props) {
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
                    <div>
                        <FaSlackHash />
                        <input type="text" />
                    </div>
                    <ul>
                        <li>
                            <FaSlackHash />
                            <p>아무거나 막 적어</p>
                            <FaTrash />
                        </li>
                    </ul>
                    <select>
                        <option>모두 보다</option>
                        <option>나만 보다</option>
                    </select>
                </div>
                <div className="buttonContainer">
                    <button className="writeBtn">끼적이다</button>
                    <button className="backBtn" onClick={ () => { props.history.push({ pathname: '/main' }) } }>나가다</button>
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

export default withRouter(LetterForm);