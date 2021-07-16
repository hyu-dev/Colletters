/* eslint-disable */
import React, { useState } from 'react';
import '../scss/LogIn.scss'
import { Link, withRouter } from 'react-router-dom';
import { useLoginUserDispatch } from '../data/LoginUserContext';
import { useUserState } from '../data/UserContext';
import { Input } from './components';
import SearchAccount from './SearchAccount';

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
    const [findAccount, setFindAccount] = useState(false);
    const [type, setType] = useState('');

    const openSearchAccountModule = (type) => {
        setFindAccount(true)
        setType(type);
    }

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
                    <button onClick={ () => {openSearchAccountModule('id')} }>아이디가</button>
                    <button onClick={ () => {openSearchAccountModule('pwd')} }>비밀번호가</button>
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
                findAccount && <SearchAccount setFindAccount={setFindAccount} type={type}/>
            }
        </div>
    )
}

export default withRouter(LogIn);