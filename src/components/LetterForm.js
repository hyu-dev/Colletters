import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { FaSlackHash, FaTrash, FaPlus } from 'react-icons/fa';

import { OpenTagProvider } from '../data/ModalContext';
import '../scss/LetterForm.scss';
import UserTag from './UserTag';
import { withRouter } from 'react-router';
import { IconContext } from 'react-icons';

const fileInput = styled.input`
    display: none;
`;

const ImageContainer = styled.div`
    width: 150px;
    height: 150px;
    background: #F6F6F6;
    ${ props =>
        props.onChange &&
        css``
    }
    ${ props => 
        props.createDiv &&
        css`
            &::before {
                content: '추가 사진';
            }
        `
    }
`;

function LetterForm(props) {
    const [tagColor, setTagColor] = useState('#dee2e6')
    const [trashColor, setTrashColor] = useState('#dee2e6')

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
                <aside className="tagContainer">
                    <div className="inputTagContainer">
                        <div>
                            <IconContext.Provider value={ { size: 35, color: tagColor } }>
                                <FaSlackHash />
                            </IconContext.Provider>
                        </div>
                        <input type="text" placeholder="꼬리표 등록"/>
                    </div>
                    <ul>
                        <li>
                            <IconContext.Provider value={ { size: 25, color: '#87E8D6' } }>
                                <FaSlackHash />
                            </IconContext.Provider>
                            <p>아무거나 막 적어</p>
                            <div>
                                <IconContext.Provider value={ { size: 20, color: trashColor } }>
                                    <FaTrash/>
                                </IconContext.Provider>
                            </div>
                        </li>
                        <li>
                            <IconContext.Provider value={ { size: 25, color: '#87E8D6' } }>
                                <FaSlackHash />
                            </IconContext.Provider>
                            <p>아무거나 막 적어</p>
                            <div>
                                <IconContext.Provider value={ { size: 20, color: trashColor } }>
                                    <FaTrash/>
                                </IconContext.Provider>
                            </div>
                        </li>
                    </ul>
                    <select>
                        <option>모두 보다</option>
                        <option>나만 보다</option>
                    </select>
                </aside>
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