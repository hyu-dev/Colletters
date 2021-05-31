import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { IconContext } from 'react-icons';
import { connect } from 'react-redux';

import { FaSlackHash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

import NestContainer from './NestContainer.js';
import '../scss/DetailLetter.scss';
import { useOpenLetterDispatch, useOpenLetterState } from '../data/ModalContext.js';

const DetailContainer = styled.div`
    width: 1100px;
    height: 800px;
    background: #f6f6f6;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: none;
    justify-content: center;
    align-items: center;
    z-index: 5;
    ${ props =>
        props.modal &&
        css`
            display: flex;
        `
    }
`;

const CloseButtonContainer = styled.div`
    width: 60px;
    height: 60px;
    position: absolute;
    top: 0;
    left: 0;
    transform: translate(-40%, -40%) rotate(45deg);
    cursor: pointer;
    z-index: 6;
`;

const NickNameTitle = styled.h2`
    margin: 0;
    padding: 5px 85px;
    width: 100%;
    height: 35px;
    position: absolute;
    top: 0;
    box-sizing: border-box;
    font-family: Rockwell;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    line-height: 29px;
    text-align: right;
    color: blue;
    text-decoration: underline;
    cursor: pointer;
`;

const ToggleContainer = styled.div`
    width: 85px;
    height: 67px;
    background: #FFFFFF;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 10px 0px 10px 10px;
    position: absolute;
    top: 18px;
    right: 390px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    z-index: 8;
    p {
        margin: 0;
        padding: 0;
        font-family: Roboto;
        font-style: normal;
        font-weight: normal;
        font-size: 15px;
        line-height: 18px;
        cursor: pointer;
        &:hover {
            color: #FF9BD1;
        }
    }
`;


function DetailLetter({ letter }) {
    const openLetterState = useOpenLetterState();
    const openLetterDispatch = useOpenLetterDispatch();
    const [toggle, setToggle] = useState(false);

    return (
        <NestContainer modal={ openLetterState }>
            <DetailContainer modal={ openLetterState }>
                <CloseButtonContainer onClick={ () => { openLetterDispatch({ type: 'OPEN' }) } }>
                    <IconContext.Provider value={{size:60}}>
                        <FaPlus />
                    </IconContext.Provider>
                </CloseButtonContainer>
                <NickNameTitle onClick={ () => { setToggle(!toggle) } }>{ letter.nickName } 님이 끼적인 글</NickNameTitle>
                {
                    toggle &&
                    <ToggleContainer>
                        <p>바꾸다</p>
                        <p>지우다</p>
                    </ToggleContainer>
                }
                <img className="userProfileImage" src="/images/userProfile.png" alt="유저프로필" />
                <div className="imagesContainer">
                    <img src="/images/left-arrow.png" alt="왼쪽화살표"/>
                    <img src="/images/attachment/att1.jpg" alt="사진"/>
                    <img src="/images/right-arrow.png" alt="오른쪽화살표"/>
                </div>
                <div className="letterContent">
                    <b>{ letter.letter.title }</b>
                    <p>{ letter.letter.content }</p>
                </div>
                <ul className="tagsContainer">
                    {
                        letter.letter.tag.map((tag) => {
                            return (
                                <li>
                                    <IconContext.Provider value={{size:25, color:"#87E8D6"}}>
                                    <FaSlackHash />
                                    </IconContext.Provider>
                                    <p>{ tag }</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <div className="replyContainer">
                    <b>댓글 { letter.reply.length }</b>
                    <ul>
                        <li>
                            <img src="/images/userProfile.png" alt="프로필" />
                            <p>댓글남김</p>
                        </li>
                    </ul>
                    <div className="sendReplyContainer">
                        <img src="/images/userProfile.png" alt="작성자"/>
                        <textarea type="text"></textarea>
                        <img src="/images/send.png" alt="보내기"/>
                    </div>
                </div>
            </DetailContainer>
        </NestContainer>
    );
}

export default DetailLetter;