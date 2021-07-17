import React, { useState } from 'react';
import styled, { css } from 'styled-components';

import { FaSlackHash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

import '../scss/DetailLetter.scss';
import { useOpenLetterDispatch, useOpenLetterState } from '../data/ModalContext.js';
import { BackgroundBlur, IconContainer } from './components.jsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

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
        props.modal === 'true'
        && 
        css`
            display: flex;
        `
    }
`;

function DetailLetter({ letter }) {
    const openLetterState = useOpenLetterState();
    const openLetterDispatch = useOpenLetterDispatch();
    const [toggle, setToggle] = useState(false);

    return (
        <BackgroundBlur modal={openLetterState.toString()}>
            <DetailContainer modal={openLetterState.toString()}>
                <IconContainer size="60px" color="black" type="back" style={{ cursor: 'pointer' }}>
                    <FaPlus onClick={() => { openLetterDispatch({ type: 'OPEN' }) }}/>
                </IconContainer>
                <h2 
                    className="nickNameTitle"
                    onClick={ () => { setToggle(!toggle) } }
                >{ letter.nickName } 님이 끼적인 글</h2>
                {
                    toggle &&
                    <div className="toggleContainer">
                        <p>바꾸다</p>
                        <p>지우다</p>
                    </div>
                }
                <img className="userProfileImage" src="/images/userProfile.png" alt="유저프로필" />
                <div className="imagesContainer">
                    <IconContainer size="50px" color="black" style={{ cursor: 'pointer' }}>
                        <IoIosArrowBack />
                    </IconContainer>
                    <img src="/images/attachment/att1.jpg" alt="사진"/>
                    <IconContainer size="50px" color="black" style={{ cursor: 'pointer' }}>
                        <IoIosArrowForward />
                    </IconContainer>
                </div>
                <div className="letterContent">
                    <b>{ letter.letter.title }</b>
                    <p>{ letter.letter.content }</p>
                </div>
                <ul className="tagsContainer">
                    {
                        letter.letter.tag.map((tag, i) => {
                            return (
                                <li key={i}>
                                    <IconContainer size="25px" color="#87E8D6">
                                        <FaSlackHash />
                                    </IconContainer>
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
        </BackgroundBlur>
    );
}

export default React.memo(DetailLetter);