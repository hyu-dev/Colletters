import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { FaSlackHash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

import '../scss/DetailLetter.scss';
import { useOpenLetterDispatch, useOpenLetterState } from '../data/ModalContext.js';
import { BackgroundBlur, IconContainer } from './components.jsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoArrowRedo } from 'react-icons/io5'
import { useUserState } from '../data/UserContext';
import { withRouter } from 'react-router-dom';
import { useLetterDispatch, useLetterState, useSearchLetterDispatch } from '../data/LetterContext';
import { useLoginUserState } from '../data/LoginUserContext';

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


function DetailLetter({ letter, history }) {
    const users = useUserState();
    const loginUser = useLoginUserState();
    const letterState = useLetterState();
    const letterDispatch = useLetterDispatch();
    const searchLetterDispatch = useSearchLetterDispatch();
    const openLetterState = useOpenLetterState();
    const openLetterDispatch = useOpenLetterDispatch();
    const [toggle, setToggle] = useState(false);
    const [idx, setIdx] = useState(0);

    const [userProfile, setUserProfile] = useState(['', '']);

    useEffect(() => {
        console.log(letter)
        const userInfo = users.find(user => user.id === letter.userId)
        if (userInfo) setUserProfile([userInfo.attRoot, userInfo.attName])
    }, [users, letter.userId])

    const onMoveLetterForm = () => {
        setToggle(false)
        history.push({ pathname: "/form", state: letter })
    }

    const onMoveLoginPage = () => {
        history.push({ pathname: "/" })
    }

    const onDeleteLetter = () => {
        /* eslint-disable-next-line */
        if (confirm('데이터를 정말 삭제하시겠습니까?\n삭제시 복원이 어렵습니다')) {
            letterDispatch({ type: 'REMOVE', id: letter.id })
            searchLetterDispatch({ type: 'COPY', payload: letterState })
            openLetterDispatch({ type: 'OPEN' })
            setToggle(false)
        }
    }

    const onToggle = () => {
        if (loginUser.id === letter.userId) {
            setToggle(!toggle)
        }
    }

    const onBackHistory = () => {
        openLetterDispatch({ type: 'OPEN' })
        setToggle(false)
    }

    const onChangeImages = (type) => {
        if (letter) {
            if (type === 'left') {
                if (idx === 0) setIdx(letter.attName.length - 1) 
                else setIdx(idx - 1)
            } else {
                if (idx === (letter.attName.length - 1)) setIdx(0)
                else setIdx(idx + 1)
            }
        }
    }

    return (
        <BackgroundBlur modal={openLetterState.toString()}>
            <DetailContainer modal={openLetterState.toString()}>
                <IconContainer size="60px" color="black" type="back" style={{ cursor: 'pointer' }}>
                    <FaPlus onClick={onBackHistory}/>
                </IconContainer>
                <h2 
                    className="nickNameTitle"
                    onClick={onToggle}
                >{ letter.nickName } 님이 끼적인 글</h2>
                {
                    toggle &&
                    <div className="toggleContainer">
                        <p onClick={onMoveLetterForm}>바꾸다</p>
                        <p onClick={onDeleteLetter}>지우다</p>
                    </div>
                }
                <img className="userProfileImage" src={`${userProfile[0]}${userProfile[1]}`} alt="유저프로필" />
                <div className="imagesContainer">
                    <IconContainer size="50px" color="black" style={{ cursor: 'pointer' }}>
                        <IoIosArrowBack onClick={() => {onChangeImages('left')}}/>
                    </IconContainer>
                    {   
                        letter && 
                        letter.attName.map((name, i) => {
                            if (i === idx) return <img src={`${letter.attRoot}${name}`} alt="사진"/>
                        }) 
                    }
                    <IconContainer size="50px" color="black" style={{ cursor: 'pointer' }}>
                        <IoIosArrowForward onClick={() => {onChangeImages('right')}}/>
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
                        { letter.reply.map(reply => <CommentList comment={reply} />) }
                    </ul>
                    <div className="sendReplyContainer">
                        { loginUser.id !== ''
                        ? <>
                            <img src={`${loginUser.attRoot}${loginUser.attName}`} alt="작성자"/>
                            <textarea type="text"></textarea>
                            <img src="/images/send.png" alt="보내기"/>
                        </>
                        : <>
                          <textarea
                            type="text"
                            style={{ 
                                textAlign: 'center', 
                                fontSize: '20px', 
                                fontFamily: 'Yoon Minguk', 
                                border: 'none',
                                background: "white",
                                height: '30px'
                            }}
                            disabled
                          >로그인 후 이용해주세요</textarea>
                          <IconContainer size="40px" color="#ffe066" type="trash">
                              <IoArrowRedo onClick={onMoveLoginPage}/>
                          </IconContainer>
                          </>
                        }
                    </div>
                </div>
            </DetailContainer>
        </BackgroundBlur>
    );
}

const CommentList = ({ comment }) => {
    const users = useUserState();
    const [userProfile, setUserProfile] = useState(['', '']);

    useEffect(() => {
        const userInfo = users.find(user => user.id === comment.userId)
        if (userInfo) setUserProfile([userInfo.attRoot, userInfo.attName])
    }, [users, comment.userId])

    return (
        <li>
            <img src={`${userProfile[0]}${userProfile[1]}`} alt="프로필" />
            <p>{ comment.content }</p>
        </li>
    )
}

export default withRouter(React.memo(DetailLetter));