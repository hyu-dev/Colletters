/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled, { css } from 'styled-components';
import { withRouter } from 'react-router-dom';

import '../scss/UserTag.scss';
import NestContainer from './NestContainer.js';
import LogIn, { Input } from './LogIn.js';
import { useOpenTagDispatch, useOpenTagState } from '../data/ModalContext';
import { useLoginUserDispatch, useLoginUserState } from '../data/LoginUserContext';
import { useUserDispatch, useUserState } from '../data/UserContext';
import { useLetterState } from '../data/LetterContext';
import { FaMaxcdn } from 'react-icons/fa';
import { useRef } from 'react';
import axios from 'axios';


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
                return <MyInformation history={ props.history } open={ true } setChange={setChange}/>
            case '비밀번호 바꾸다':
                return <ChangePwd history={ props.history } setChange={ setChange } />
            case 'EMAIL 바꾸다':
                return <ChangeEmail history={ props.history } setChange={ setChange } />
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
                            <Button change={ change } onClick={() => { setChange('비밀번호 바꾸다') } }>비밀번호 바꾸다</Button>
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
    const loginUser = useLoginUserState();
    const loginUserDispatch = useLoginUserDispatch();
    const userDispatch = useUserDispatch();
    const letters = useLetterState();
    const fileRef = useRef();
    const fileReader = useRef();
    const lastLetterTitle = letters.find((letter, index) => {
        let i = 0;
        if (letter.userId == loginUser.id) {
            if (index > i) {
                i = index;
                return letter
            }
        }
    })
    const openFile = () => {
        fileRef.current.click()
    }
    const onChangeFile = async (e) => {
        const file = e.target.files[0];
        let formData = new FormData();
        formData.append('userfile', file);
        await axios.post('/api/upload', formData)
        .then(res => {
            if (res.data.state) {
                const userInfo = {
                    id: loginUser.id,
                    pwd: loginUser.pwd,
                    nickName: loginUser.nickName,
                    email: [loginUser.email[0], loginUser.email[1]],
                    attRoot: '/uploads/',
                    attName: res.data.filename,
                }
                loginUserDispatch({ type: 'UPDATE_FILE', payload: userInfo})
                userDispatch({ type: 'UPDATE_FILE', payload: userInfo})
            }
        })
        .catch(err => {
            return alert('사진을 업로드하지 못했습니다:\n', err)
        })
        props.setChange('내 정보 보다');
    }


    useEffect(() => {
        if (props.open) {
            openFile();
        }
    }, [props.open])

    return (
        <>
        <input type='file' style={{ display: "none" }} ref={fileRef} onChange={onChangeFile} />
        <div className="userProfile">
            <table>
                <colgroup>
                    <col width="40%"/>
                    <col width="30%"/>
                    <col width="30%"/>
                </colgroup>
                <tbody>
                <tr>
                    <td rowSpan='3'>
                        <img className="profile" src={ `${ loginUser.attRoot }${ loginUser.attName }` } alt="프로필사진" ref={fileReader} />
                    </td>
                    <td colSpan='2'>#{ loginUser.id }</td>
                </tr>
                <tr>
                    <td colSpan='2'>{ loginUser.nickName }</td>
                </tr>
                <tr>
                    <td colSpan='2'>{ `${ loginUser.email[0] }@${ loginUser.email[1] }` }</td>
                </tr>
                <tr>
                    <td colSpan='3'>
                        <b>최근 끼적인 글 제목</b>
                        <p>{ lastLetterTitle != null ? lastLetterTitle.letter.title : "" }</p>
                    </td>
                </tr>
                </tbody>
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
    const loginUser = useLoginUserState();
    const userDispatch = useUserDispatch();
    const loginUserDispatch = useLoginUserDispatch();
    const [CurrentPwd, setCurrentPwd] = useState('');
    const [ChangePwd, setChangePwd] = useState('');
    const [CheckChangePwd, setCheckChangePwd] = useState('');
    const [label, setLabel] = useState(['', '', '']);

    function guide_func(value, setValue, index) {
        onChangeInputHandler(value, setValue)
        guideHandler(value, index)
    }
    const onChangeInputHandler = (value, setValue) => {
        setValue(value)
    }

    const guideHandler = (value, index) => {
        const array = [...label];
        if (index === 0) {
            if (value === '') {
                array[index] = [false, ''];
            } else if (value !== loginUser.pwd) {
                array[index] = [false, '현재 비밀번호와 일치하지 않습니다'];
            } else {
                array[index] = [true, '비밀번호 확인'];
            }
        } else if (index === 1) {
            if (value === '') {
                array[index] = [false, '']
            } else if (onValidatePwd(value)) {
                array[index] = [true, '사용 가능한 비밀번호 입니다']
            } else {
                array[index] = [false, '영문 소문자, 대문자, 숫자 포함 4~12자']
            }
        } else {
            if (value === '') {
                array[index] = [false, '']
            } else if (value === ChangePwd) {
                array[index] = [true, '비밀번호 확인 완료']
            } else {
                array[index] = [false, '입력하신 비밀번호와 다릅니다']
            }
        }
        setLabel(array)
    }

    const onValidatePwd = (value) => {
        const regPwd = /^(?=.*[a-zA-Z])(?=.*[0-9]).{4,16}$/;
        return regPwd.test(value)
    }

    const onChangePwdHandler = () => {
        for (let i = 0; i < label.length; i++) {
            if (label[i][0] === false) {
                return alert('비밀번호가 일치하지 않습니다\n다시 입력하세요')
            }
        }
        const userInfo = {
            id: loginUser.id,
            pwd: ChangePwd,
        }

        const initialState = {
            id: '',
            pwd: '',
            nickName: '',
            email: [],
            attRoot: '',
            attName: '',
        }
        userDispatch({ type: 'UPDATE_PWD', payload: userInfo })
        loginUserDispatch({ type: 'UPDATE_PWD', payload: initialState })
        alert('비밀번호가 성공적으로 변경되었습니다\n변경된 비밀번호로 로그인해주세요')
        props.history.push("/")
    }
    

    return (
        <div className="changePwdContainer">
            <div className="labelContainer">
                <label>현재 비밀번호</label>
                <Input type="password" value={CurrentPwd} onChange={(e) => {guide_func(e.currentTarget.value, setCurrentPwd, 0)}} />
                <label className="guide" style={label[0][0] ? {color: '#69db7c'} : {color: '#ff8787'}}>{label[0][1]}</label>
            </div>
            <div className="labelContainer">
                <label>비밀번호 변경</label>
                <Input type="password" value={ChangePwd} onChange={(e) => {guide_func(e.currentTarget.value, setChangePwd, 1)}} />
                <label className="guide" style={label[1][0] ? {color: '#69db7c'} : {color: '#ff8787'}}>{label[1][1]}</label>
            </div>
            <div className="labelContainer">
                <label>비밀번호 변경 확인</label>
                <Input type="password" value={CheckChangePwd} onChange={(e) => {guide_func(e.currentTarget.value, setCheckChangePwd, 2)}} />
                <label className="guide" style={label[2][0] ? {color: '#69db7c'} : {color: '#ff8787'}}>{label[2][1]}</label>
            </div>
            <div className="changeButtonContainer">
                <button onClick={onChangePwdHandler}>바꾸다</button>
                <button onClick={ () => { props.setChange('내 정보 보다') } }>나가다</button>
            </div>
        </div>
    )
}

function ChangeEmail(props) {
    return (
        <div className="changePwdContainer">
            <div className="labelContainer">
                <label>변경할 이메일</label>
                <div className="emailContainer">
                    <input className="userEmail" />
                    @
                    <select className="userEmail">
                        <option value="">선택하다</option>
                        <option value="gmail">gmail.com</option>
                    </select>
                </div>
                <button className="sendCertifyBtn">이메일 인증 발송</button>
            </div>
            <div className="labelContainer">
                <label>이메일 인증</label>
                <div className="emailContainer">
                    <input className="certifyInfo" />
                    <button className="certifyBtn">인증</button>
                </div>
                <label className="guide">인증되었습니다</label>
            </div>
            <div className="changeButtonContainer">
                <button>바꾸다</button>
                <button onClick={ () => { props.setChange('내 정보 보다') } }>나가다</button>
            </div>
        </div>
    )
}


export default withRouter(UserTag);