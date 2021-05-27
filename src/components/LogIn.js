/* eslint-disable */
import React, { useState } from 'react';
import styled from 'styled-components';
import '../scss/LogIn.scss'
import { Link, withRouter } from 'react-router-dom';
import Main from './Main.js';

let Input = styled.input`
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
    console.log(props)
    let [아이디, 아이디변경] = useState('')
    let [비밀번호, 비밀번호변경] = useState('')
    let userInfo = props.회원정보.find((info) => {
        if (info.id === 아이디 && info.pwd === 비밀번호) {
            return true
        }
    })
    let [아이디찾기, 아이디찾기변경] = useState(false);
    let [비밀번호찾기, 비밀번호찾기변경] = useState(false);

    return(
        <div className="loginContainer">
            <div className="labelContainer">
                <label>당신의 식별문자</label>
                <Input onChange={(e) => {아이디변경(e.target.value)}}/>
            </div>
            <div className="labelContainer">
                <label>당신의 식별문자 접속번호</label>
                <Input type="password" onChange={(e) => {비밀번호변경(e.target.value)}}/>
            </div>
            <div className="labelContainer">
                <label>그럼 이제</label>
                <button className="loginBtn" onClick={() => {
                    userInfo != null
                    ? props.history.push({
                        pathname: "/main",
                        state: {userInfo}
                    })
                    : alert('식별문자와 접속번호를 정확히 기입하세요')
                }}>접속하다</button>
                
            </div>
            <div className="labelContainer">
                <label>식별문자가 없네</label>
                <Link to="/join">
                    <button className="joinBtn">가입하다</button>
                </Link>
            </div>
            <div className="labelContainer">
                <label>기억이 안나네</label>
                <div className="searchContianer">
                    <button className="searchId" onClick={() => {아이디찾기변경(true)}}>식별문자가</button>
                    <button className="searchPwd" onClick={() => {비밀번호찾기변경(true)}}>접속번호가</button>
                </div>
            </div>
            <div className="labelContainer">
                <label>가입없이</label>
                <Link to="/main">
                    <button className="notLoginView">염탐하다</button>
                </Link>
            </div>
            {
                아이디찾기 && <SearchId 아이디찾기변경={아이디찾기변경}/>
            }
            {
                비밀번호찾기 && <SearchPwd 비밀번호찾기변경={비밀번호찾기변경}/>
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
                    <button className="closeBtn" onClick={() => { props.아이디찾기변경(false)}}>닫다</button>
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
                    <button className="closeBtn" onClick={() => { props.비밀번호찾기변경(false)}}>닫다</button>
                </div>
            </div>
        </div>
    )
}

export default withRouter(LogIn);