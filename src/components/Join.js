/* eslint-disable */
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import '../scss/Join.scss';
import { Input } from './LogIn';
import { useUserDispatch, useUserState } from '../data/UserContext';

const initialUser = {
    id: '',
    pwd: '',
    nickName: '',
    email: [],
    attRoot: '/images/profile/',
    attName: 'basic.png',
}

const initialInspect = {
    id: false,
    pwd: false,
    checkpwd: false,
    nickName: false,
    email: false,
}

function Join(props) {
    const [number, setNumber] = useState(0)
    const users = useUserState();
    const usersDispatch = useUserDispatch();
    const regId = /^(?=.*?[a-z0-9]).{4,8}$/;
    const regPwd = /^(?=.*?[a-z])(?=.*?[0-9]).{4,12}$/;
    
    const checkId = (e) => {
        initialUser.id = e.target.value;
        initialInspect.id = false;
        const duplicateId = users.find((user) => {
            return user.id === initialUser.id
        });
        document.getElementsByClassName("label")[0].style.color = "red";
        if (duplicateId) {
            document.getElementsByClassName("label")[0].innerHTML = "이미 사용중인 식별문자입니다"
        } else {
            if (!initialUser.id) {
                document.getElementsByClassName("label")[0].innerHTML = ""
            } else if (!regId.test(initialUser.id)) {
                document.getElementsByClassName("label")[0].innerHTML = "영문 소문자 또는 숫자 4자 이상, 8자 이하 입력"
            } else {
                document.getElementsByClassName("label")[0].innerHTML = "사용가능한 식별문자입니다"
                document.getElementsByClassName("label")[0].style.color = "green";
                initialInspect.id = true;
            }
        }
    }

    const checkPwd = (e) => {
        initialUser.pwd = e.target.value;
        initialInspect.pwd = false;
        document.getElementsByClassName("label")[1].style.color = "red";
        if (!initialUser.pwd) {
            document.getElementsByClassName("label")[1].innerHTML = ""
        } else if (!regPwd.test(initialUser.pwd)) {
            document.getElementsByClassName("label")[1].innerHTML = "영문 소문자와 숫자 조합하여 4자 이상, 12자 이하 입력"
        } else {
            document.getElementsByClassName("label")[1].innerHTML = "사용가능한 접속번호입니다"
            document.getElementsByClassName("label")[1].style.color = "green";
            initialInspect.pwd = true;
        }
    }

    const crossCheckPwd = (e) => {
        initialInspect.checkpwd = false;
        document.getElementsByClassName("label")[2].style.color = "red";
        if (!e.target.value) {
            document.getElementsByClassName("label")[2].innerHTML = ""
        } else if (initialUser.pwd !== e.target.value) {
            document.getElementsByClassName("label")[2].innerHTML = "접속번호가 일치하지 않습니다"
        } else {
            document.getElementsByClassName("label")[2].innerHTML = "접속번호가 일치합니다"
            document.getElementsByClassName("label")[2].style.color = "green";
            initialInspect.checkpwd = true;
        }
    }

    const checkNickName = (e) => {
        initialUser.nickName = e.target.value
        if (initialUser.nickName) {
            initialInspect.nickName = true
        } else {
            initialInspect.nickName = false
        }
    }

    const onSubmit = (e) => {
        e.preventDefault()
        if (!initialInspect.id) {
            return alert(`식별문자를 확인하세요`);
        } else if (!initialInspect.pwd) {
            return alert(`접속번호를 확인하세요`);
        } else if (!initialInspect.checkpwd) {
            return alert(`접속번호가 일치하지 않습니다`);
        } else if (!initialInspect.nickName) {
            return alert(`활동 별명을 입력하세요`)
        } else if (!initialInspect.email) {
            return alert(`EMAIL 인증하세요`)
        } else {
            usersDispatch({ type: 'CREATE', user: initialUser })
            props.history.push({ pathname: '/welcome' })
        }
    }

    return (
        <form className="joinContainer">
            <div className="labelContainer">
                <label>가입할 식별문자</label>
                <Input onChange={ checkId } />
                <label className="label"></label>
            </div>
            <div className="labelContainer">
                <label>식별문자 접속번호</label>
                <Input type="password" onChange={ checkPwd } />
                <label className="label"></label>
            </div>
            <div className="labelContainer">
                <label>식별문자 접속번호 확인</label>
                <Input type="password" onChange={ crossCheckPwd } />
                <label className="label"></label>
            </div>
            <div className="labelContainer">
                <label>당신이 활동할 별명</label>
                <Input onChange={ checkNickName } />
            </div>
            <div className="labelContainer">
                <label>EMAIL</label>
                <div className="emailContainer">
                    <input className="userEmail" onChange={(e) => { initialUser.email[0] = e.target.value }}/>
                    @
                    <select className="userEmail" onChange={(e) => { initialUser.email[1] = e.target.value }}>
                        <option value="">선택하다</option>
                        <option value="gmail.com">gmail.com</option>
                    </select>
                </div>
                <button className="sendCertifyBtn" type="button" onClick={() => {
                    if (!initialUser.email[0] || !initialUser.email[1]) {
                        alert(`이메일을 입력하세요`)
                    } else {
                        alert(`${ initialUser.email[0] }@${ initialUser.email[1] }로 메일을 보냈다치고,\n인증번호: 123456`)
                    }
                }}>EMAIL 인증정보 보내다</button>
            </div>
            <div className="labelContainer">
                <label>EMAIL 인증</label>
                <div className="emailContainer">
                    <input className="certifyInfo" onChange={(e) => {
                        setNumber(e.target.value)
                    }} />
                    <button className="certifyBtn" type="button" onClick={() => {
                        initialInspect.email = false
                        if (!number) {
                            alert(`인증번호를 입력하세요`)
                        } else if (number == 123456) {
                            alert(`인증되었습니다`)
                            initialInspect.email = true
                        } else {
                            alert(`인증되지 않았습니다. 번호를 다시 확인하세요`)
                        }
                    }}>인증</button>
                </div>
            </div>
            <div className="labelContainer">
                <div className="btnContainer">
                    <button className="joinBtn" onClick={ onSubmit }>가입하다</button>
                    <Link to="/">
                        <button type="button" className="backBtn">돌아가다</button>
                    </Link>
                </div>
            </div>
        </form>
    );
}

export default withRouter(Join);