/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import '../scss/LogIn.scss'
import { Link, withRouter } from 'react-router-dom';
import Main from './Main.js';
import { useLoginUserDispatch } from '../data/LoginUserContext';
import { useUserState } from '../data/UserContext';

export const Input = styled.input`
    width: 400px;
    height: 70px;
    background: #fff;
    border: 2px solid #000;
    border-radius: 10px;
    box-sizing: border-box;
    font-size: 20px;
    padding: 0 10px;
    outline: none;
    &:focus {
        border: 2px solid #7165FF;
    }
`;

function LogIn(props) {
    const [userId, setUserId] = useState('')
    const [userPwd, setUserPwd] = useState('')
    const users = useUserState();
    const loginUserDispatch = useLoginUserDispatch();
    const userInfo = users.find((user) => {
        if (user.id === userId && user.pwd === userPwd) {
            return true
        }
    })
    const onLoginHandler = (props, userInfo) => {
        props.history.push({ pathname: '/main' });
        loginUserDispatch({ type: 'UPDATE', user: userInfo })
    }
    const [findUserId, setFindUserId] = useState(false);
    const [findUserPwd, setFindUserPwd] = useState(false);

    return(
        <div className="loginContainer">
            <div className="labelContainer">
                <label>아이디</label>
                <Input onChange={ (e) => { setUserId(e.target.value)} }/>
            </div>
            <div className="labelContainer">
                <label>비밀번호</label>
                <Input type="password" onChange={ (e) => { setUserPwd(e.target.value)} }/>
            </div>
            <div className="labelContainer">
                <label>바로</label>
                <button className="loginBtn" onClick={() => {
                    userInfo != null
                    ? onLoginHandler(props, userInfo)
                    : alert('아이디, 비밀번호를 정확히 입력하세요');
                }}>접속하다</button>
            </div>
            <div className="labelContainer">
                <label>지금</label>
                <Link to="/join">
                    <button className="joinBtn">가입하다</button>
                </Link>
            </div>
            <div className="labelContainer">
                <label>뭐지</label>
                <div className="searchContianer">
                    <button className="searchId" onClick={ () => { setFindUserId(true) } }>아이디가</button>
                    <button className="searchPwd" onClick={ () => { setFindUserPwd(true) } }>비밀번호가</button>
                </div>
            </div>
            {
                !props.isMain &&
                <div className="labelContainer">
                    <label>그냥</label>
                    <Link to="/main">
                        <button className="notLoginView">염탐하다</button>
                    </Link>
                </div>
            }
            {
                findUserId && <SearchId setFindUserId={setFindUserId}/>
            }
            {
                findUserPwd && <SearchPwd setFindUserPwd={setFindUserPwd}/>
            }
        </div>
    )
}

function SearchId(props) {
    return(
        <div className="searchBackground">
            <div className="search">
                <label>식별번호 찾아보다</label>
                <div className="emailContainer">
                    <input className="userEmail" />
                    @
                    <select className="userEmail">
                        <option value="">선택하다</option>
                        <option value="gmail">gmail.com</option>
                    </select>
                </div>
                <div>
                    <button className="searchBtn">찾다</button>
                    <button className="closeBtn" onClick={() => { props.setFindUserId(false)}}>닫다</button>
                </div>
            </div>
        </div>
    )
}

function SearchPwd(props) {
    return(
        <div className="searchBackground">
            <div className="search">
                <label>접속번호 찾아보다</label>
                <div>
                    <label>식별번호</label>
                    <input type="text" />
                </div>
                <div className="emailContainer">
                    <input className="userEmail" />
                    @
                    <select className="userEmail">
                        <option value="">선택하다</option>
                        <option value="gmail">gmail.com</option>
                    </select>
                </div>
                <div>
                    <button className="searchBtn">찾다</button>
                    <button className="closeBtn" onClick={() => { props.setFindUserPwd(false)}}>닫다</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LogIn);