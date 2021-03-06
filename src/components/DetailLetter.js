import React, { useEffect, useRef, useState } from 'react';
import styled, { css } from 'styled-components';

import { FaSlackHash } from 'react-icons/fa';
import { FaPlus } from 'react-icons/fa';

import '../scss/DetailLetter.scss';
import { useOpenLetterDispatch, useOpenLetterState } from '../data/ModalContext.js';
import { BackgroundBlur, IconContainer } from './components.jsx';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';
import { IoArrowRedo } from 'react-icons/io5'
import { useUserDispatch, useUserState } from '../data/UserContext';
import { withRouter } from 'react-router-dom';
import { useLetterDispatch, useLetterState, useSearchLetterDispatch } from '../data/LetterContext';
import { useLoginUserDispatch, useLoginUserState } from '../data/LoginUserContext';
import { useDetailLetterDispatch } from '../data/DetailLetterContext';
import { getCookie, getCookieValue, setCookie } from '../cookie';

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
    const usersDispatch = useUserDispatch();
    const loginUser = useLoginUserState();
    const loginUserDispatch = useLoginUserDispatch();
    const letterState = useLetterState();
    const letterDispatch = useLetterDispatch();
    const searchLetterDispatch = useSearchLetterDispatch();
    const detailLetterDispatch = useDetailLetterDispatch();
    const openLetterState = useOpenLetterState();
    const openLetterDispatch = useOpenLetterDispatch();
    const [toggle, setToggle] = useState(false);
    const [idx, setIdx] = useState(0);
    const InputComment = useRef();
    const replyRef = useRef();
    const nextId = useRef(letter.reply.length + 1);
    const [userProfile, setUserProfile] = useState(['', '']);
    const height = useRef(500)

    useEffect(() => {
        if (letter.id !== '') {
            if (getCookie("view") === 'view') {
                const arr = getCookieValue("view").split(",")
                const lett = arr.find(a => {
                    return a.substring(0, a.indexOf("_")) === loginUser.id && parseInt(a.substring(a.indexOf("_") + 1)) === letter.id
                })
                if (!lett) {
                    setCookie("view", `${loginUser.id}_${letter.id}`)
                    letterDispatch({ type: 'VIEWCOUNT', letterId: letter.id })
                    detailLetterDispatch({ type: 'VIEWCOUNT' })
                }
            } else {
                setCookie("view", `${loginUser.id}_${letter.id}`)
                letterDispatch({ type: 'VIEWCOUNT', letterId: letter.id })
                detailLetterDispatch({ type: 'VIEWCOUNT' })
            }
        }
    }, [letter])

    useEffect(() => {
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
        if (confirm('???????????? ?????? ?????????????????????????\n????????? ????????? ???????????????')) {
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
        setIdx(0)
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

    const onSubmitComment = () => {
        if (InputComment.current.value === '') {
            return alert('????????? ???????????????')
        }
        const comment = {
            id: nextId.current,
            userId: loginUser.id,
            content: InputComment.current.value
        }
        nextId.current += 1
        const Info = {
            ...letter,
            reply: [...letter.reply, comment]
        }
        letterDispatch({ type: 'UPDATE_REPLY', letter: Info })
        detailLetterDispatch({ type: 'UPDATE', letter: Info })
        InputComment.current.value = ''
        replyRef.current.scrollTo({
            top: height.current,
            left: 0,
            behavior: 'smooth'
        })
        height.current += 500
    }

    const onClickLikeButton = () => {
        if (loginUser.id === '') {
            /* eslint-disable-next-line */
            if (confirm('????????? ????????? ???????????????\n????????????????????? ?????????????????????????')) {
                onMoveLoginPage()
            }
        } else {
            if (loginUser.id !== letter.userId) {
                const letterId = loginUser.like.find(like => like === letter.id)
                if (letterId) {
                    usersDispatch({ type: 'LIKED', userId: loginUser.id, letterId: letter.id })
                    loginUserDispatch({ type: 'LIKED', letterId: letter.id })
                    detailLetterDispatch({ type: 'LIKED' })
                    letterDispatch({ type: 'LIKED', letterId: letter.id })
                } else {
                    usersDispatch({ type: 'LIKE', userId: loginUser.id, letterId: letter.id })
                    loginUserDispatch({ type: 'LIKE', letterId: letter.id })
                    detailLetterDispatch({ type: 'LIKE' })
                    letterDispatch({ type: 'LIKE', letterId: letter.id })
                }
            } else {
                alert('????????????')
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
                >{ letter.nickName } ?????? ????????? ???</h2>
                {
                    toggle &&
                    <div className="toggleContainer">
                        <p onClick={onMoveLetterForm}>?????????</p>
                        <p onClick={onDeleteLetter}>?????????</p>
                    </div>
                }
                <img className="userProfileImage" src={`${userProfile[0]}${userProfile[1]}`} alt="???????????????" />
                <div className="imagesContainer">
                    <IconContainer size="50px" color="black" style={{ cursor: 'pointer' }}>
                        <IoIosArrowBack onClick={() => {onChangeImages('left')}}/>
                    </IconContainer>
                    {   
                        letter && 
                        /* eslint-disable-next-line */
                        letter.attName.map((name, i) => {
                            if (i === idx) return <img key={i} src={`${letter.attRoot}${name}`} alt="??????"/>
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
                    <b>?????? { letter.reply.length }</b>
                    <ul ref={replyRef}>
                        { letter.reply.map(reply => <CommentList key={reply.id} comment={reply} letter={letter}/>) }
                    </ul>
                    <div className="sendReplyContainer">
                        { loginUser.id !== ''
                        ? <>
                            <img src={`${loginUser.attRoot}${loginUser.attName}`} alt="?????????"/>
                            <textarea type="text" ref={InputComment}></textarea>
                            <img src="/images/send.png" alt="?????????" onClick={onSubmitComment} style={{ cursor: 'pointer' }} />
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
                            defaultValue="????????? ??? ??????????????????"
                          ></textarea>
                          <IconContainer size="40px" color="#ffe066" type="trash">
                              <IoArrowRedo onClick={onMoveLoginPage}/>
                          </IconContainer>
                          </>
                        }
                    </div>
                </div>
                <div className="likeImageContainer">
                    <img className="likeImage" src={
                        loginUser.id === ''
                        ? "/images/like_none.png"
                        : loginUser.id === letter.userId 
                        ? "/images/like.png"
                        : loginUser.like.length < 1
                        ? "/images/like_none.png"
                        : loginUser.like.find(like => like === letter.id) 
                        ? "/images/like.png"
                        : "/images/like_none.png"
                    } alt="?????????" onClick={onClickLikeButton}/>
                    <p>{ letter.letter.likeCount }</p>
                </div>
            </DetailContainer>
        </BackgroundBlur>
    );
}

const CommentList = React.memo(({ comment, letter }) => {
    const users = useUserState();
    const loginUser = useLoginUserState();
    const letterDispatch = useLetterDispatch();
    const detailLetterDispatch = useDetailLetterDispatch();
    const [userProfile, setUserProfile] = useState(['', '']);

    useEffect(() => {
        const userInfo = users.find(user => user.id === comment.userId)
        if (userInfo) setUserProfile([userInfo.attRoot, userInfo.attName])
    }, [users, comment.userId])

    const onDeleteComment = () => {
        if (loginUser.id === comment.userId) {
            /* eslint-disable-next-line */
            if (confirm('???????????? ????????? ?????????????????????????')) {
                detailLetterDispatch({ type: 'REMOVE_REPLY', id: comment.id })
                letterDispatch({ type: 'REMOVE_REPLY', letterId: letter.id, commentId: comment.id })
            }
        }
    }

    return (
        <li style={ loginUser.id === comment.userId ? { flexDirection: 'row-reverse', cursor: 'help' } : null }>
            <img src={`${userProfile[0]}${userProfile[1]}`} alt="?????????" />
            <p onClick={onDeleteComment}>{ comment.content }</p>
        </li>
    )
})

export default withRouter(React.memo(DetailLetter));