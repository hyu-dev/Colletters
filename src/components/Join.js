/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { Link, withRouter } from 'react-router-dom';
import '../scss/Join.scss';
import { Input } from './LogIn';
import { useUserDispatch, useUserState } from '../data/UserContext';
import emailjs from 'emailjs-com';
import { USER_ID } from '../config';

const initialUser = {
    id: '',
    pwd: '',
    nickName: '',
    email: [],
    attRoot: '/images/profile/',
    attName: 'basic.png',
}

function Join(props) {
    const users = useUserState();
    const usersDispatch = useUserDispatch();

    const [Id, setId] = useState('');
    const [Password, setPassword] = useState('');
    const [checkPassword, setCheckPassword] = useState('');
    const [NickName, setNickName] = useState('');
    const [Email, setEmail] = useState('');
    const [CertifyNum, setCertifyNum] = useState('');
    const [random, setRandom] = useState('');
    const [label, setLabel] = useState(new Array(6).fill().map(() => [false, '']))
    
    const regId = /^(?=.*?[a-z0-9]).{4,8}$/;
    const regPwd = /^(?=.*?[a-z])(?=.*?[0-9]).{4,12}$/;
    const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    
    const guide_func = (value, setValue, index) => {
        onChangeInputHandler(value, setValue)
        guideHandler(value, index)
    }
    const onChangeInputHandler = (value, setValue) => {
        setValue(value)
    }
    const guideHandler = (value, index) => {
        const array = [...label];
        switch (index) {
            case 0:
                if (value === '') {
                    array[index] = [false, '']
                } else if (regId.test(value) && checkId(value)) {
                    array[index] = [true, '사용 가능한 아이디입니다']
                } else {
                    array[index] = [false, '영문 소문자 및 숫자 조합 4~8자 또는 아이디 중복']
                }
                break;
            case 1:
                if (value === '') {
                    array[index] = [false, '']
                } else if (regPwd.test(value)) {
                    array[index] = [true, '사용 가능한 비밀번호 입니다']
                } else {
                    array[index] = [false, '영문 소문자, 숫자 포함 4~8자']
                }
                break;
            case 2:
                if (value === '') {
                    array[index] = [false, '']
                } else if (value === Password) {
                    array[index] = [true, '비밀번호 확인 완료']
                } else {
                    array[index] = [false, '입력하신 비밀번호와 일치하지 않습니다']
                }
                break;
            case 3:
                array[index] = [true, ''];
                break;
            case 4:
                if (value === '') {
                    array[index] = [false, ''];
                } else if (regEmail.test(value)) {
                    array[index] = [true, ''];
                } else {
                    array[index] = [false, '이메일 유효성에 맞지 않습니다'];
                }
                break;
            default:
                break;
        }
        setLabel(array)
    }

    const checkId = (value) => {
        const user = users.find(user => user.id === value)
        console.log(user)
        if (user) {
            return false
        } else {
            return true
        }
    }

    const makeRandomNumber = () => {
        const test = new Array(6).fill().map(() => {
            return String.fromCharCode(Math.floor((Math.random() * 58) + 65))
        }).join("")
        setRandom(test)
        return test
    }

    const sendEmail = () => {
        const data = {
            user_email: Email,
            name: NickName,
            message: makeRandomNumber()
        }
        emailjs.send('service_youjeong', 'template_youjeong', data, USER_ID)
        .then((result) => {
            const array = [...label];
            array[4] = [true, '발송완료'];
            setLabel(array)
        }, (error) => {
            const array = [...label];
            array[4] = [false, '발송실패'];
            setLabel(array)
        });
    }

    const onCheckCertify = (value, index) => {
        const array = [...label];
        if (value === '') {
            array[index] = [false, '']
        } else if (value !== random) {
            array[index] = [false, '인증번호가 올바르지 않습니다']
        } else {
            array[index] = [true, '인증확인']
        }
        setLabel(array)
    }

    const onSubmit = (e) => {
        e.preventDefault()
        for (let i = 0; i < label.length; i++) {
            if (label[i][0] === false) {
                switch (i) {
                    case 0: return alert('아이디를 확인하세요')
                    case 1: return alert('비밀번호 유효성을 확인하세요')
                    case 2: return alert('비밀번호가 일치하지 않습니다')
                    case 4: return alert('이메일 유효성을 확인하세요')
                    case 5: return alert('이메일이 인증되지 않았습니다.')
                }
            }
        }
        const userInfo = {
            ...initialUser,
            id: Id,
            pwd: Password,
            nickName: NickName,
            email: Email
        }
        usersDispatch({ type: 'CREATE', user: userInfo })
        props.history.push({ pathname: '/welcome' })
    }

    return (
        <form className="joinContainer" onSubmit={onSubmit}>
            <div className="labelContainer">
                <label>아이디</label>
                <Input 
                    type="text"
                    value={Id}
                    onChange={(e) => guide_func(e.currentTarget.value, setId, 0)}
                />
                <label className="guide" style={label[0][0] ? {color: '#69db7c'} : {color: '#ff8787'}}>{label[0][1]}</label>
            </div>
            <div className="labelContainer">
                <label>비밀번호</label>
                <Input
                    type="password"
                    value={Password}
                    onChange={(e) => guide_func(e.currentTarget.value, setPassword, 1)}
                />
                 <label className="guide" style={label[1][0] ? {color: '#69db7c'} : {color: '#ff8787'}}>{label[1][1]}</label>
            </div>
            <div className="labelContainer">
                <label>비밀번호 확인</label>
                <Input
                    type="password"
                    value={checkPassword}
                    onChange={(e) => guide_func(e.currentTarget.value, setCheckPassword, 2)}
                />
                <label className="guide" style={label[2][0] ? {color: '#69db7c'} : {color: '#ff8787'}}>{label[2][1]}</label>
            </div>
            <div className="labelContainer">
                <label>사용할 별명</label>
                <Input 
                    type="text"
                    maxLength="10"
                    value={NickName}
                    onChange={(e) => guide_func(e.currentTarget.value, setNickName, 3)}
                />
            </div>
            <div className="labelContainer">
                <label>이메일 인증</label>
                <div className="emailContainer">
                    <input
                        className="certifyInfo"
                        value={Email}
                        onChange={(e) => guide_func(e.currentTarget.value, setEmail, 4)}
                    />
                    <button
                        type="button"
                        className="certifyBtn"
                        onClick={sendEmail}
                    >발송</button>
                </div>
                <label className="guide" style={label[4][0] ? {color: '#69db7c'} : {color: '#ff8787'}}>{label[4][1]}</label>
            </div>
            <div className="labelContainer">
                <label>이메일 인증 확인</label>
                <div className="emailContainer">
                    <input
                        className="certifyInfo"
                        value={CertifyNum}
                        onChange={(e) => guide_func(e.currentTarget.value, setCertifyNum, 5)}
                    />
                    <button
                        type="button"
                        className="certifyBtn"
                        onClick={() => {onCheckCertify(CertifyNum, 5)}}
                    >인증</button>
                </div>
                <label className="guide" style={label[5][0] ? {color: '#69db7c'} : {color: '#ff8787'}}>{label[5][1]}</label>
            </div>
            <div className="labelContainer">
                <div className="btnContainer">
                    <button type="submit" className="joinBtn">가입하다</button>
                    <Link to="/">
                        <button type="button" className="backBtn">돌아가다</button>
                    </Link>
                </div>
            </div>
        </form>
    );
}

export default withRouter(Join);