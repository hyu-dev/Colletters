/* eslint-disable */
import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import '../scss/Join.scss';

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

function Join() {
    return (
        <div className="joinContainer">
            <div className="labelContainer">
                <label>가입할 식별문자</label>
                <Input />
                <label></label>
            </div>
            <div className="labelContainer">
                <label>식별문자 접속번호</label>
                <Input />
                <label></label>
            </div>
            <div className="labelContainer">
                <label>식별문자 접속번호 확인</label>
                <Input />
                <label></label>
            </div>
            <div className="labelContainer">
                <label>당신이 활동할 별명</label>
                <Input />
                <label></label>
            </div>
            <div className="labelContainer">
                <label>EMAIL</label>
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
                <label>EMAIL 인증</label>
                <div className="emailContainer">
                    <input className="certifyInfo" />
                    <button className="certifyBtn">인증</button>
                </div>
            </div>
            <div className="labelContainer">
                <div className="btnContainer">
                    <button className="joinBtn">가입하다</button>
                    <Link to="/">
                        <button className="backBtn">돌아가다</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Join;