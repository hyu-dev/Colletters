/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';

import '../scss/UserTag.scss';
import NestContainer from './NestContainer.js';
import LogIn, { Input } from './LogIn.js';
import { useOpenTagDispatch, useOpenTagState } from '../data/ModalContext';
import { useLoginUserDispatch, useLoginUserState } from '../data/LoginUserContext';
import { useUserDispatch, useUserState } from '../data/UserContext';
import { useLetterState } from '../data/LetterContext';
import { FaMaxcdn } from 'react-icons/fa';


const InfoContainer = styled.div`
    width: 1100px;
    height: 0;
    border-radius: 0 0 30px 30px;
    box-sizing: border-box;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.25);
    position: fixed;
    top: 0;
    background: white;
    z-index: 5;
    transition: all 0.6s ease-in-out;
    ${props =>
        props.modal &&
        css`
            height: 800px;
        `
    }
    .tagImg {
        ${props =>
            props.modal &&
            css`
                top: 805px;
            `
        }
    }
    .buttonContainer {
        ${props =>
            props.modal &&
            css`
            transform: translateY(100%);
            `
        }
    }
`;
   

const Button = styled.button`
    width: 220px;
    height: 70px;
    background: white;
    border: 3px solid #7165FF;
    border-radius: 10px;
    box-sizing: border-box;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 25px;
    color: #7165FF;
    margin: 0 21px;
    position: relative;
    transition: all 0.2s ease-in;
    &:hover {
        background-color: #7165FF;
        color: white;
    }
    &:active {
        background-color: #7165FF;
        color: white;
        top: 5px;
    }
    ${props => 
        props.children === '글 끼적이러 가다' &&
        css`
            border-color: #FF9BD1;
            width: 300px;
            color: #FF9BD1;
            &:hover {
                background-color: #FF9BD1;
                color: white;
            }
            &:active {
                background-color: #FF9BD1;
                color: white;
                top: 5px;
            }
        `
    }
    ${props =>
        props.children === props.change &&
        css`
            background-color: #7165FF;
            color: white;
        `
    }
`;

const TextButton = styled.button`
    width: auto;
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 35px;
    line-height: 41px;
    display: flex;
    align-items: center;
    text-align: center;
    letter-spacing: 0.1em;
    color: #000000;
    background: none;
    outline: none;
    border: none;
    position: relative;
    text-shadow: 0px 1px 5px rgba(0, 0, 0, 0.40);
    &:hover {
        color: #7165FF;
    }
    &:active {
        top: 5px;
    }
`;

const initialUser = {
    id: '',
    pwd: '',
    nickName: '',
    email: [],
    attRoot: '',
    attName: '',
}

function UserTag(props) {
    const usersState = useUserState();
    const usersDispatch = useUserDispatch();
    const openTagState = useOpenTagState();
    const openTagDispatch = useOpenTagDispatch();
    const [change, setChange] = useState('내 정보 보다')
    const user = useLoginUserState();
    const setUser = useLoginUserDispatch();
    const changeInfo = (change) => {
        switch(change) {
            case '내 정보 보다':
                return <MyInformation history={ props.history } open={ false } />
            case '대표사진 바꾸다':
                return <MyInformation history={ props.history } open={ true } />
            case '접속번호 바꾸다':
                return <ChangePwd setChange={ setChange } />
            case 'EMAIL 바꾸다':
                return <ChangeEmail setChange={ setChange } />
            default:
                throw new Error(`Unhandled change Info: ${ change }`);
        }
    }


    return (
        <NestContainer modal={ openTagState }>
            <InfoContainer modal={ openTagState }>
                {
                    user.id !== ''
                    ?
                        <>
                        <div className="buttonContainer">
                            <Button change={ change } onClick={() => { setChange('내 정보 보다') } }>내 정보 보다</Button>
                            <Button change={ change } onClick={() => { setChange('대표사진 바꾸다') } }>대표사진 바꾸다</Button>
                            <Button change={ change } onClick={() => { setChange('접속번호 바꾸다') } }>접속번호 바꾸다</Button>
                            <Button change={ change } onClick={() => { setChange('EMAIL 바꾸다') } }>EMAIL 바꾸다</Button>
                        </div>
                        { changeInfo(change) }
                        <div className="textBtnContainer">
                            <TextButton onClick={ () => {
                                if (confirm("탈퇴하시겠습니까?")) {
                                    usersDispatch({ type: 'REMOVE', id: user.id})
                                    setUser({ type: 'UPDATE', user: initialUser })
                                }
                            }}>잘 가</TextButton>
                            <TextButton onClick={ () => {
                                if (confirm("로그아웃하시겠습니까?")) {
                                    setUser({ type: 'UPDATE', user: initialUser })
                                }
                            } }>또 봐</TextButton>
                        </div>
                        </>
                    : 
                        <div className="loginModal">
                            <LogIn users={ usersState } isMain={true} />
                        </div>
                }
                <img 
                    className="tagImg"
                    src="/images/tag.gif" 
                    alt="태그" 
                    modal={ openTagState } 
                    onClick={ () => { openTagDispatch({ type: 'TAGOPEN' }) } }
                />
            </InfoContainer>
        </NestContainer>
    );
}

function MyInformation(props) {
    const user = useLoginUserState();
    const letters = useLetterState();
    const lastLetterTitle = letters.find((letter, index) => {
        let i = 0;
        if (letter.userId == user.id) {
            if (index > i) {
                i = index;
                return letter
            }
        }
    })
    const openFile = () => {
        document.getElementById("fileInput").click()
    }
    if (props.open) {
        openFile();
    }


    return (
        <>
        <input type='file' style={{ display: "none" }} id="fileInput"/>
        <div className="userProfile">
            <table>
                <colgroup>
                    <col width="40%"/>
                    <col width="30%"/>
                    <col width="30%"/>
                </colgroup>
                <tr>
                    <td rowSpan='3'>
                        <img className="profile" src={ `${ user.attRoot }${ user.attName }` } alt="프로필사진" />
                        <input className="profileInput" type="file" />
                    </td>
                    <td colSpan='2'>#{ user.id }</td>
                </tr>
                <tr>
                    <td colSpan='2'>{ user.nickName }</td>
                </tr>
                <tr>
                    <td colSpan='2'>{ `${ user.email[0] }@${ user.email[1] }` }</td>
                </tr>
                <tr>
                    <td colSpan='3'>
                        <b>최근 끼적인 글 제목</b>
                        <p>{ lastLetterTitle.letter.title != null ? lastLetterTitle.letter.title : "" }</p>
                    </td>
                </tr>
            </table>
        </div>
        <div className="writeBtnContainer"><Button onClick={() => {
            props.history.push({
                pathname: "/form",
            })
        }}>글 끼적이러 가다</Button></div>
        </>
    )
}

function ChangePwd(props) {
    const user = useLoginUserState();

    return (
        <div className="changePwdContainer">
            <div className="labelContainer">
                <label>현재 접속번호 적다</label>
                <Input />
                <label>비밀번호가 올바르지 않습니다</label>
            </div>
            <div className="labelContainer">
                <label>변경할 접속번호 적다</label>
                <Input />
                <label>비밀번호가 올바르지 않습니다</label>
            </div>
            <div className="labelContainer">
                <label>변경할 접속번호 한 번 더 적다</label>
                <Input />
                <label>비밀번호가 올바르지 않습니다</label>
            </div>
            <div className="changeButtonContainer">
                <button>바꾸다</button>
                <button onClick={ () => { props.setChange('내 정보 보다') } }>나가다</button>
            </div>
        </div>
    )
}

function ChangeEmail(props) {
    return (
        <div className="changePwdContainer">
            <div className="labelContainer">
                <label>변경할 EMAIL 적다</label>
                <div className="emailContainer">
                    <input className="userEmail" />
                    @
                    <select className="userEmail">
                        <option value="">선택하다</option>
                        <option value="gmail">gmail.com</option>
                    </select>
                </div>
                <button className="sendCertifyBtn">EMAIL 인증정보 보내다</button>
            </div>
            <div className="labelContainer">
                <label>EMAIL 인증하다</label>
                <div className="emailContainer">
                    <input className="certifyInfo" />
                    <button className="certifyBtn">인증</button>
                </div>
                <label>인증되었습니다</label>
            </div>
            <div className="changeButtonContainer">
                <button>바꾸다</button>
                <button onClick={ () => { props.setChange('내 정보 보다') } }>나가다</button>
            </div>
        </div>
    )
}


export default withRouter(UserTag);